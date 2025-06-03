import s from './demo.module.scss'

export function Demo() {
  return (
    <main className={s.demoContainer}>
      <section className={s.texts}>
        <h2>Proteja sua Plantação agora</h2>
        <p>Implemente Plant Guardians e reduza perdas, aumente produtividade e preserve o meio ambiente</p>
      </section>

      <section className={s.buttons}>
        <button className='button'>
          <a href="#form-contact">Solicitar Demonstração</a>
        </button>

        <button className='button'>
          <a href="#">Ver Planos e Preços</a>
        </button>
      </section>
    </main>
  )
}