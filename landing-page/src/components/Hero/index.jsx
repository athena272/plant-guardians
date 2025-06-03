import s from './hero.module.scss'
import logo from '../../assets/logo.png'

export function Hero() {
  return (
    <header className={s.container}>
      <section className={s.logo}>
        <img src={logo} alt="Plant Guardians Logo" />
      </section>

      <section className={s.content}>
        <h1>Proteção Inteligente para sua Plantação</h1>
        <p>O Plant Guardians utiliza inteligência artificial e IoT para proteger suas plantações contra animais invasores de forma eficiente e não-letal.</p>
      </section>

      <section className={s.links}>
        <button className='button'>
          <a href="#features">Conhecer Recursos</a>
        </button>
        <button className='button'>
          <a href="#form-contact">Solicitar Demonstração</a>
        </button>
      </section>
    </header>
  )
}