import s from './cards.module.scss'

export const Cards = ({ icon, alt, title, description }) => {
  return (
    <section className={s.card}>
      <img src={icon} alt={alt} />
      <div className={s.text}>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </section>
  )
}