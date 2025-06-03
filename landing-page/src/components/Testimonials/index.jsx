import user1 from '../../assets/Ellipse 10.png'
import user2 from '../../assets/Ellipse 11.png'
import user3 from '../../assets/Ellipse 12.png'
import stars from '../../assets/stars.png'

import s from './testimonials.module.scss'

export function Testimonials() {
  return (
    <main className={s.testimonials}>
      <section className={s.texts}>
        <h2>O que dizem nossos Clientes</h2>
        <p>Produtores reais que já implementaram o Plant Guardians em propriedades</p>
      </section>

      <section className={s.cards}>
        <div className={s.card}>
          <div className={s.user}>
            <img src={user1} alt="Testimonial 1" />
            <span>
              <h3>Carlos Oliveira</h3>
              <h6>Produtor de Milho, PR</h6>
              <img src={stars} alt="Rating Stars" />
            </span>
          </div>
          <p>“Os javalis estavam destruindo minha plantação de milho. Depois que instalei o Plant Guardians, as perdas caíram mais de 90%. O sistema se pagou no primeiro ciclo de plantio.”</p>
        </div>

        <div className={s.card}>
          <div className={s.user}>
            <img src={user2} alt="Testimonial 2" />
            <span>
              <h3>Ana Ferreira</h3>
              <h6>Fruticultura, SP</h6>
              <img src={stars} alt="Rating Stars" />
            </span>
          </div>
          <p>"Finalmente posso cultivar frutas sem me preocupar com os pássaros. O sistema é ecológico e não machuca os animais, apenas os afasta. Minha produção aumentou 25%."</p>
        </div>

        <div className={s.card}>
          <div className={s.user}>
            <img src={user3} alt="Testimonial 3" />
            <span>
              <h3>Marcos Silva</h3>
              <h6>Produtor Orgânico, MG</h6>
              <img src={stars} alt="Rating Stars" />
            </span>
          </div>
          <p>"Investir em Plant Guardians foi a melhor decisão que tomei para minha fazenda orgânica. Protegemos nossas hortas sem usar métodos químicos e os animais aprendem a evitar a área."</p>
        </div>
      </section>
    </main>
  )
}