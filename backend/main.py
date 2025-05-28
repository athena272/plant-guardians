from fastapi import FastAPI, Depends, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from google.cloud import firestore
from google.cloud import pubsub_v1
from datetime import datetime, timedelta
import os
from typing import List, Optional
from pydantic import BaseModel
import json

app = FastAPI(title="Plant Guardians API")

# Configuração CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, especificar domínios permitidos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuração do Firestore
db = firestore.Client()

# Configuração do Pub/Sub
publisher = pubsub_v1.PublisherClient()
subscriber = pubsub_v1.SubscriberClient()

# Modelos Pydantic
class Event(BaseModel):
    timestamp: datetime
    image_url: str
    animal_detected: str
    action_taken: str
    confidence: float

class Stats(BaseModel):
    date: str
    total_detections: int
    animals_detected: dict

# Autenticação simples via API Key
async def verify_api_key(x_api_key: str = Header(...)):
    if x_api_key != os.getenv("API_KEY"):
        raise HTTPException(status_code=401, detail="API Key inválida")
    return x_api_key

@app.get("/")
async def root():
    return {"message": "Plant Guardians API"}

@app.get("/events/latest")
async def get_latest_events(
    limit: int = 20,
    api_key: str = Depends(verify_api_key)
) -> List[Event]:
    """Retorna os eventos mais recentes do Firestore."""
    events_ref = db.collection("events")
    query = events_ref.order_by("timestamp", direction=firestore.Query.DESCENDING).limit(limit)
    docs = query.stream()
    
    events = []
    for doc in docs:
        data = doc.to_dict()
        events.append(Event(**data))
    
    return events

@app.get("/stats/daily")
async def get_daily_stats(
    days: int = 7,
    api_key: str = Depends(verify_api_key)
) -> List[Stats]:
    """Retorna estatísticas diárias dos últimos N dias."""
    stats = []
    today = datetime.now().date()
    
    for i in range(days):
        date = today - timedelta(days=i)
        date_str = date.isoformat()
        
        # Consulta eventos do dia
        events_ref = db.collection("events")
        query = events_ref.where("date", "==", date_str)
        docs = query.stream()
        
        daily_stats = {
            "date": date_str,
            "total_detections": 0,
            "animals_detected": {}
        }
        
        for doc in docs:
            data = doc.to_dict()
            daily_stats["total_detections"] += 1
            animal = data.get("animal_detected")
            if animal:
                daily_stats["animals_detected"][animal] = daily_stats["animals_detected"].get(animal, 0) + 1
        
        stats.append(Stats(**daily_stats))
    
    return stats

@app.post("/events")
async def create_event(
    event: Event,
    api_key: str = Depends(verify_api_key)
):
    """Registra um novo evento de detecção."""
    event_dict = event.dict()
    event_dict["date"] = event.timestamp.date().isoformat()
    
    # Salva no Firestore
    db.collection("events").add(event_dict)
    
    # Publica no tópico de notificações
    topic_path = publisher.topic_path(
        os.getenv("PROJECT_ID"),
        "notifications"
    )
    
    message = {
        "type": "detection",
        "data": event_dict
    }
    
    publisher.publish(
        topic_path,
        json.dumps(message).encode("utf-8")
    )
    
    return {"status": "success"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080) 