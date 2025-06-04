import { useQuery } from 'react-query';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { mockApi, DailyStats, Event } from '../mockApi';
import DetectionAlert from './DetectionAlert'
import DetectionPopup from './DetectionPopup'
import { useState, useEffect } from 'react';

// Registra componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type AlertType = 'danger' | 'success' | 'info' | undefined;

const Dashboard = () => {
  // Busca estatísticas diárias
  const { data: stats, isLoading } = useQuery<DailyStats[]>(
    'dailyStats',
    async () => mockApi.getDailyStats()
  );

  const [alertEvent, setAlertEvent] = useState<Event | null>(null)
  const [alertType, setAlertType] = useState<AlertType>(undefined)
  const [popupEvent, setPopupEvent] = useState<Event | null>(null)

  // Simula chegada de novo evento
  useEffect(() => {
    mockApi.getEvents().then(events => {
      const randomEvent = events[Math.floor(Math.random() * events.length)]
      setAlertEvent({ ...randomEvent, action_taken: '' })
      setAlertType('danger')
      setTimeout(() => {
        setAlertEvent(null)
        setAlertType(undefined)
        setPopupEvent({ ...randomEvent, action_taken: '' })
      }, 3000)
    })
  }, [])

  const handleRepel = () => {
    if (popupEvent) {
      const updatedEvent = {
        ...popupEvent,
        action_taken: 'Espanto bem-sucedido'
      }
      setPopupEvent(null)
      setAlertEvent(updatedEvent)
      setAlertType('success')
      setTimeout(() => {
        setAlertEvent(null)
        setAlertType(undefined)
      }, 4000)
    }
  }

  const handleDismiss = () => {
    if (popupEvent) {
      const updatedEvent = {
        ...popupEvent,
        action_taken: 'Nenhuma ação tomada'
      }
      setPopupEvent(null)
      setAlertEvent(updatedEvent)
      setAlertType('info')
      setTimeout(() => {
        setAlertEvent(null)
        setAlertType(undefined)
      }, 4000)
    }
  }

  // Prepara dados para o gráfico
  const chartData = {
    labels: stats?.map(s => s.date) || [],
    datasets: [
      {
        label: 'Total de Detecções',
        data: stats?.map(s => s.total_detections) || [],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Detecções por Dia'
      }
    }
  };

  // Calcula totais
  const totalDetections = stats?.reduce((sum, day) => sum + day.total_detections, 0) || 0;
  const uniqueAnimals = new Set(
    stats?.flatMap(day => Object.keys(day.animals_detected)) || []
  ).size;

  // Agregação para animais mais frequentes
  const animalDetections: Record<string, number> = {};
  stats?.forEach(day => {
    Object.entries(day.animals_detected).forEach(([animal, count]) => {
      animalDetections[animal] = (animalDetections[animal] || 0) + count;
    });
  });

  const sortedAnimals = Object.entries(animalDetections)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <DetectionAlert event={alertEvent} type={alertType} onClose={() => setAlertEvent(null)} />
      <DetectionPopup event={popupEvent} onDismiss={handleDismiss} onRepel={handleRepel} />
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Total de Detecções</h3>
          <p className="mt-2 text-3xl font-bold text-indigo-600">
            {isLoading ? '...' : totalDetections}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Espécies Detectadas</h3>
          <p className="mt-2 text-3xl font-bold text-indigo-600">
            {isLoading ? '...' : uniqueAnimals}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Taxa de Sucesso</h3>
          <p className="mt-2 text-3xl font-bold text-indigo-600">
            {isLoading ? '...' : '95%'}
          </p>
        </div>
      </div>

      {/* Gráfico */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Tendência de Detecções</h3>
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <p className="text-gray-500">Carregando...</p>
          </div>
        ) : (
          <Line data={chartData} options={chartOptions} />
        )}
      </div>

      {/* Tabela de animais mais detectados */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Espécies Mais Frequentes</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Espécie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total de Detecções
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedAnimals.map(([animal, count]) => (
                <tr key={animal}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {animal}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {count}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;