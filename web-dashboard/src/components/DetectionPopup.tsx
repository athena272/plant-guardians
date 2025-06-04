import React from 'react'
import { Event } from '../mockApi'

interface DetectionPopupProps {
  event: Event | null
  onDismiss: () => void
  onRepel: () => void
}

const DetectionPopup: React.FC<DetectionPopupProps> = ({ event, onDismiss, onRepel }) => {
  if (!event) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-xl font-bold text-red-600 mb-2">Alerta: {event.animal_detected} detectado!</h2>
        <img src={event.image_url} alt={event.animal_detected} className="w-full h-48 object-cover rounded mb-4" />
        <p className="mb-2">Confiança: {Math.round(event.confidence * 100)}%</p>
        <p className="mb-4">Ação sugerida: Espantar animal?</p>
        <div className="flex gap-4 justify-end">
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={onDismiss}
          >
            Ignorar
          </button>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={onRepel}
          >
            Espantar
          </button>
        </div>
      </div>
    </div>
  )
}

export default DetectionPopup