import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

interface Event {
  timestamp: string;
  image_url: string;
  animal_detected: string;
  action_taken: string;
  confidence: number;
}

const Events = () => {
  const { data: events, isLoading } = useQuery<Event[]>(
    'events',
    async () => {
      const response = await axios.get('/api/events/latest');
      return response.data;
    }
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Eventos Recentes</h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Carregando eventos...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {events?.map((event, index) => (
            <div
              key={index}
              className="bg-white shadow rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {event.animal_detected}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {new Date(event.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {Math.round(event.confidence * 100)}% confiança
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <img
                    src={event.image_url}
                    alt={`Detecção de ${event.animal_detected}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900">Ação Tomada</h4>
                  <p className="mt-1 text-sm text-gray-500">
                    {event.action_taken}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events; 