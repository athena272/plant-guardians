import { IoIosCheckmark, IoIosClose } from 'react-icons/io'
import s from './problemSolution.module.scss'
import { List } from '../List'

export function ProblemSolution() {
  return (
    <main className={s.container}>
      <section className={s.intro}>
        <h2>Proteja sua produção contra perdas</h2>
        <p>Animais invasores podem causar até 30% de perdas em plantações. Nossa solução reduz esses danos sem ferir os animais ou prejudicar o meio ambiente.</p>
      </section>

      <section className={s.problemSolution}>
        <div className={s.problem}>
          <h4>O Problema</h4>
          <ul className={s.list}>
            <List
              icon={<IoIosClose />}
              text="Perdas significativas na produção devido a animais invasores"
            />

            <List
              icon={<IoIosClose />}
              text="Métodos tradicionais de proteção são ineficientes ou prejudiciais"
            />

            <List
              icon={<IoIosClose />}
              text="Vigilância constante é cara e impraticável"
            />
            <List
              icon={<IoIosClose />}
              text="Conflito entre produção agrícola e preservação da fauna e flora"
            />
          </ul>
        </div>

        <div className={s.solution}>
          <h4>Nossa Solução</h4>
          <ul className={s.list}>
            <List
              icon={<IoIosCheckmark />}
              text="Detecção automática com IA e sensores de movimento"
            />
            <List
              icon={<IoIosCheckmark />}
              text="Métodos de dissuasão não-letais e específicos para cada espécie"
            />

            <List
              icon={<IoIosCheckmark />}
              text="Vigilância 24/7 automatizada com notificações em tempo real"
            />

            <List
              icon={<IoIosCheckmark />}
              text="Equilibra proteção da lavoura com conservação da natureza"
            />
          </ul>
        </div>
      </section>
    </main>
  )
}