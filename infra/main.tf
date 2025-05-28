terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

# Variáveis
variable "project_id" {
  description = "ID do projeto Google Cloud"
  type        = string
}

variable "region" {
  description = "Região do Google Cloud"
  type        = string
  default     = "us-central1"
}

# Pub/Sub Topics
resource "google_pubsub_topic" "detections" {
  name = "detections"
}

resource "google_pubsub_topic" "commands" {
  name = "commands"
}

resource "google_pubsub_topic" "notifications" {
  name = "notifications"
}

# Cloud Function para processamento de imagens
resource "google_cloudfunctions2_function" "image_processor" {
  name        = "image-processor"
  location    = var.region
  description = "Processa imagens e detecta animais"

  build_config {
    runtime     = "python312"
    entry_point = "process_image"
    source {
      storage_source {
        bucket = google_storage_bucket.source.name
        object = google_storage_bucket_object.source.name
      }
    }
  }

  service_config {
    max_instance_count = 10
    available_memory   = "256M"
    timeout_seconds    = 60
    environment_variables = {
      PROJECT_ID = var.project_id
    }
  }

  event_trigger {
    trigger_region = var.region
    event_type     = "google.cloud.pubsub.topic.v1.messagePublished"
    pubsub_topic   = google_pubsub_topic.detections.id
  }
}

# Cloud Run para API
resource "google_cloud_run_service" "api" {
  name     = "plant-guardians-api"
  location = var.region

  template {
    spec {
      containers {
        image = "gcr.io/${var.project_id}/plant-guardians-api"
        env {
          name  = "PROJECT_ID"
          value = var.project_id
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

# Firestore
resource "google_firestore_database" "database" {
  name        = "(default)"
  location_id = "nam5"
  type        = "FIRESTORE_NATIVE"
}

# Artifact Registry
resource "google_artifact_registry_repository" "docker" {
  location      = var.region
  repository_id = "plant-guardians"
  description   = "Docker repository for Plant Guardians"
  format        = "DOCKER"
}

# Storage para código fonte
resource "google_storage_bucket" "source" {
  name     = "${var.project_id}-source"
  location = var.region
  uniform_bucket_level_access = true
}

resource "google_storage_bucket_object" "source" {
  name   = "function-source.zip"
  bucket = google_storage_bucket.source.name
  source = "../cloud-function/source.zip"
}

# IAM
resource "google_service_account" "function_sa" {
  account_id   = "function-sa"
  display_name = "Service Account for Cloud Functions"
}

resource "google_project_iam_member" "function_sa_roles" {
  for_each = toset([
    "roles/pubsub.publisher",
    "roles/vision.user",
    "roles/firestore.user"
  ])
  
  project = var.project_id
  role    = each.key
  member  = "serviceAccount:${google_service_account.function_sa.email}"
}

# Outputs
output "api_url" {
  value = google_cloud_run_service.api.status[0].url
}

output "function_name" {
  value = google_cloudfunctions2_function.image_processor.name
}

output "artifact_registry" {
  value = google_artifact_registry_repository.docker.name
} 