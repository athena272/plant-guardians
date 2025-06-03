import s from './investment.module.scss'

export const Investment = () => {
  const stats = [
    { value: "30%", description: "Redução de perdas na colheita" },
    { value: "80%", description: "Redução de custos com vigilância" },
    { value: "6-12", description: "Meses para retorno do investimento" },
    { value: "95%", description: "Precisão da detecção de animais" }
  ];

  return (
    <section className={s.container}>
      <div className={s.content}>
        <h2>Retorno do Investimento</h2>
        <p>Nossos clientes relatam redução média de 80% nos danos causados por animais invasores</p>

      </div>
      <div className={s.stats}>
        {stats.map((stat, index) => (
          <div className={s.statCard} key={index}>
            <h3>{stat.value}</h3>
            <p>{stat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};