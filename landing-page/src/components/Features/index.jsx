import { Cards } from "../Cards";

import Deteccao from '../../assets/lucide/webcam.png'
import Disuasao from '../../assets/lucide/zap.png'
import Dashboard from '../../assets/lucide/gauge.png'
import Alertas from '../../assets/lucide/bell.png'
import ConsumoEnergetico from '../../assets/lucide/leaf.png'
import Sustentabilidade from '../../assets/lucide/sprout.png'

import s from './features.module.scss'


export function Features() {
  return (
    <main className={s.container} id="features">
      <section className={s.content}>
        <h2>Recursos Princípais</h2>
        <p>
          O Plant Guardians combina hardware e software para oferecer uma solução completa de proteção
        </p>
      </section>

      <section className={s.cards}>
        <Cards
          icon={Deteccao}
          alt="Detecção Inteligente"
          title="Detecção Inteligente"
          description="Câmeras e sensores PIR capturam movimento, enquanto nossa IA identifica animais com precisão superior a 95%"
        />

        <Cards
          icon={Disuasao}
          alt="Dissuasão Adaptativa"
          title="Dissuasão Adaptativa"
          description="Mecanismos específicos para cada espécie, incluindo sons ultrassônicos, luzes e sprinklers, ativados automaticamente"
        />

        <Cards
          icon={Dashboard}
          alt="Dashboard Completo"
          title="Dashboard Completo"
          description="Monitore eventos, visualize estatísticas e ajuste configurações através de uma interface intuitiva"
        />

        <Cards
          icon={Alertas}
          alt="Alertas em Tempo Real"
          title="Alertas em Tempo Real"
          description="Receba notificações instantâneas quando animais forem detectados, com imagens e detalhes da ocorrência"
        />

        <Cards
          icon={ConsumoEnergetico}
          alt="Eficiência Energética"
          title="Eficiência Energética"
          description="Sistema otimizado para baixo consumo, com opções de energia solar e baterias recarregáveis"
        />

        <Cards
          icon={Sustentabilidade}
          alt="Sustentabilidade"
          title="Sustentabilidade"
          description="Protege plantações sem usar venenos ou métodos letais, preservando a biodiversidade local"
        />
      </section>
    </main>
  )
}