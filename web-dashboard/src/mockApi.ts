import { format, subDays } from 'date-fns';

// Tipos
export interface Event {
  timestamp: string;
  image_url: string;
  animal_detected: string;
  action_taken: string;
  confidence: number;
}

export interface DailyStats {
  date: string;
  total_detections: number;
  animals_detected: Record<string, number>;
}

export interface TargetSpecies {
  name: string;
  enabled: boolean;
  deterrent_intensity: number;
  deterrent_duration: number;
}

// Dados mockados
const mockEvents: Event[] = [
  {
    timestamp: new Date().toISOString(),
    image_url: 'https://via.placeholder.com/640x480.png?text=Javali+Detectado',
    animal_detected: 'Javali',
    action_taken: 'Som ultrassônico ativado',
    confidence: 0.92
  },
  {
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    image_url: 'https://via.placeholder.com/640x480.png?text=Coelho+Detectado',
    animal_detected: 'Coelho',
    action_taken: 'Luz estroboscópica ativada',
    confidence: 0.85
  },
  {
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    image_url: 'https://via.placeholder.com/640x480.png?text=Cervo+Detectado',
    animal_detected: 'Cervo',
    action_taken: 'Sprinkler ativado',
    confidence: 0.78
  }
];

const mockSpecies: TargetSpecies[] = [
  {
    name: 'Javali',
    enabled: true,
    deterrent_intensity: 70,
    deterrent_duration: 5
  },
  {
    name: 'Coelho',
    enabled: true,
    deterrent_intensity: 50,
    deterrent_duration: 3
  },
  {
    name: 'Cervo',
    enabled: false,
    deterrent_intensity: 60,
    deterrent_duration: 4
  }
];

// Gera estatísticas diárias para os últimos 7 dias
const generateMockStats = (): DailyStats[] => {
  const stats: DailyStats[] = [];

  for (let i = 0; i < 7; i++) {
    const date = subDays(new Date(), i);
    const dateStr = format(date, 'yyyy-MM-dd');

    // Gera números aleatórios para simulação
    const javaliCount = Math.floor(Math.random() * 5);
    const coelhoCount = Math.floor(Math.random() * 3);
    const cervoCount = Math.floor(Math.random() * 2);

    stats.push({
      date: dateStr,
      total_detections: javaliCount + coelhoCount + cervoCount,
      animals_detected: {
        'Javali': javaliCount,
        'Coelho': coelhoCount,
        'Cervo': cervoCount
      }
    });
  }

  return stats.sort((a, b) => a.date.localeCompare(b.date));
};

const mockStats = generateMockStats();

// Funções de API mockadas
export const mockApi = {
  getEvents: async (): Promise<Event[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockEvents), 500);
    });
  },

  getSpecies: async (): Promise<TargetSpecies[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockSpecies), 500);
    });
  },

  updateSpecies: async (species: TargetSpecies): Promise<void> => {
    return new Promise((resolve) => {
      const index = mockSpecies.findIndex(s => s.name === species.name);
      if (index !== -1) {
        mockSpecies[index] = species;
      }
      setTimeout(resolve, 300);
    });
  },

  addSpecies: async (name: string): Promise<void> => {
    return new Promise((resolve) => {
      mockSpecies.push({
        name,
        enabled: true,
        deterrent_intensity: 50,
        deterrent_duration: 3
      });
      setTimeout(resolve, 300);
    });
  },

  getDailyStats: async (): Promise<DailyStats[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockStats), 500);
    });
  }
};