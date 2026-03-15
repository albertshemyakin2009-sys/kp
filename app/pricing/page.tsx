const plans = [
  {
    name: 'Solo',
    price: '990 ₽ / мес',
    bullets: ['До 20 активных КП', 'Пакеты и кейсы', 'Ссылка + PDF', 'Базовая аналитика']
  },
  {
    name: 'Studio',
    price: '1 990 ₽ / мес',
    featured: true,
    bullets: ['Всё из Solo', 'Больше активных КП', 'Приоритетный onboarding', 'Больше бренд-настроек']
  }
]

export default function PricingPage() {
  return (
    <main className="container page-space">
      <section className="hero compact-hero">
        <span className="badge">Тарифы</span>
        <h1>Простая тарифная логика для выхода на рынок.</h1>
        <p className="lead">Сначала достаточно двух планов: solo для специалистов и studio для небольших команд.</p>
      </section>
      <section className="grid grid-2">
        {plans.map((plan) => (
          <div className={`card ${plan.featured ? 'featured-card' : ''}`} key={plan.name}>
            <div className="mini-label">{plan.price}</div>
            <h3>{plan.name}</h3>
            <ul className="feature-list">
              {plan.bullets.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        ))}
      </section>
    </main>
  )
}
