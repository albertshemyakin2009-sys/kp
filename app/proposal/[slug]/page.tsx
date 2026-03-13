import Link from 'next/link'
import { proposals } from '@/lib/demo'

export default function ProposalPage({ params }: { params: { slug: string } }) {
  const proposal = proposals.find((item) => item.slug === params.slug) ?? proposals[0]

  return (
    <main className="container page-space">
      <section className="hero compact-hero">
        <span className="badge">Публичное КП</span>
        <h1>{proposal.title}</h1>
        <p className="lead">{proposal.subtitle}</p>
        <div className="actions">
          <a className="btn btn-primary" href="#packages">Выбрать пакет</a>
          <a className="btn btn-secondary" href="#faq">Есть вопросы</a>
        </div>
      </section>

      <section className="card">
        <div className="mini-label">Зачем эта страница работает лучше обычного PDF</div>
        <p>{proposal.audience}</p>
      </section>

      <section id="packages">
        <h2 className="section-title">Пакеты</h2>
        <div className="grid">
          {proposal.packages.map((pkg) => (
            <div className={`card ${pkg.featured ? 'featured-card' : ''}`} key={pkg.name}>
              <div className="mini-label">{pkg.price}</div>
              <h3>{pkg.name}</h3>
              <p>{pkg.note}</p>
              <ul className="feature-list">
                {pkg.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
              </ul>
              <a className="btn btn-primary btn-full" href="https://t.me/example">Написать в Telegram</a>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="section-title">Кейсы</h2>
        <div className="grid grid-2">
          {proposal.cases.map((item) => (
            <div className="card" key={item.title}>
              <div className="mini-label">{item.result}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="split-section">
        <div className="card">
          <div className="mini-label">Процесс</div>
          <h3>Как идёт работа после согласования</h3>
          <p>Созвон → доступы → запуск → еженедельная оптимизация → короткие отчёты с выводами и следующими шагами.</p>
        </div>
        <div className="card">
          <div className="mini-label">Следующий шаг</div>
          <h3>Предлагаем созвон на 20 минут</h3>
          <p>На созвоне можно быстро выбрать пакет и адаптировать состав работ под задачу клиента.</p>
          <Link className="btn btn-primary btn-full" href="/dashboard">Вернуться в демо</Link>
        </div>
      </section>

      <section id="faq">
        <h2 className="section-title">FAQ</h2>
        <div className="stack-md">
          {proposal.faq.map((item) => (
            <div className="card" key={item.q}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
