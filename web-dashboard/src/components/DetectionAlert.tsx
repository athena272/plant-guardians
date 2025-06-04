import React, { useEffect } from 'react'
import { Event } from '../mockApi'

interface DetectionAlertProps {
  event: Event | null
  type?: 'danger' | 'success' | 'info'
  onClose: () => void
}

const colorMap = {
  danger: 'bg-red-600',
  success: 'bg-green-600',
  info: 'bg-blue-600'
}

const DetectionAlert: React.FC<DetectionAlertProps> = ({ event, type = 'danger', onClose }) => {
  useEffect(() => {
    if (event) {
      const timer = setTimeout(onClose, 5000)
      return () => clearTimeout(timer)
    }
  }, [event, onClose])

  if (!event) return null

  return (
    <div className={`fixed top-6 right-6 z-50 text-white rounded-lg shadow-lg flex items-center p-4 animate-bounce ${colorMap[type]}`}>
      <img
        src={event.image_url}
        alt={`Detecção de ${event.animal_detected}`}
        className="w-16 h-16 object-cover rounded-md mr-4 border-4 border-white"
      />
      <div>
        <strong className="block text-lg">
          {type === 'danger' && `Alerta: ${event.animal_detected} detectado!`}
          {type === 'success' && `Ação tomada: ${event.action_taken}`}
          {type === 'info' && `Ignorado: Nenhuma ação tomada`}
        </strong>
        <span className="block text-sm">
          {type === 'danger' ? '' : event.action_taken}
        </span>
        <span className="block text-xs opacity-80">{new Date(event.timestamp).toLocaleString()}</span>
      </div>
      <button
        className="ml-4 text-white font-bold text-xl"
        onClick={onClose}
        aria-label="Fechar alerta"
      >
        ×
      </button>
    </div>
  )
}

export default DetectionAlert