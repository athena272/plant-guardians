import s from './steps.module.scss'

export function Steps() {
  return (
    <section className={s.container}>
      <div className={s.title}>
        <h2>Como Funciona</h2>
        <p>Um sistema integrado que protege automaticamente sua plantação em 3 etapas simples</p>
      </div>

      <div className={s.stepsList}>
        <div className={s.step}>
          <h1>1</h1>
          <div className={s.text}>
            <h3>Detecção</h3>
            <p>
              Sensores detectam movimento e as câmeras capturam imagens que são enviadas para nuvem para análise.
            </p>
          </div>
        </div>

        <div className={s.step}>
          <h1>2</h1>
          <div className={s.text}>
            <h3>Análise</h3>
            <p>
              Nossa IA identifica o animal específico e sua ameaça potencial com base no modelo treinado.
            </p>
          </div>
        </div>

        <div className={s.step}>
          <h1>3</h1>
          <div className={s.text}>
            <h3>Ação</h3>
            <p>
              Mecanismos de dissuasão específicos são ativados automaticamente e você recebe uma notificação.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
