import Link from 'next/link'

const reasons = [
  {
    title: 'Собирается быстро',
    text: 'Пакеты и вводные уже под рукой. Не нужно каждый раз собирать КП в Word или Google Docs.'
  },
  {
    title: 'Ссылка вместо хаоса',
    text: 'Клиент открывает красивую страницу с телефона, а не бесконечный PDF со сбитой вёрсткой.'
  },
  {
    title: 'Понятно, когда дожимать',
    text: 'Видно просмотры, клики по CTA и скачивания PDF — есть повод написать вовремя, а не гадать.'
  }
]

const steps = [
  'Добавьте 2–3 пакета услуг один раз.',
  'Соберите КП под клиента за пару минут.',
  'Отправьте ссылку и при необходимости PDF.',
  'Смотрите активность и делайте follow-up по делу.'
]

export default function HomePage() {
  return (
    <main className="container page-space">
      <section className="hero hero-grid">
        <div>
          <span className="badge">MVP для digital-услуг</span>
          <h1>Соберите КП за 2 минуты и сразу узнайте, открыл ли его клиент.</h1>
          <p className="lead">
            Для агентств, таргета, SMM и студий: пакеты, кейсы, ссылка, PDF и готовый следующий шаг — в одном продукте.
          </p>
          <div className="actions">
            <Link className="btn btn-primary" href="/create">Собрать demo-КП</Link>
            <Link className="btn btn-secondary" href="/proposal/demo-client">Посмотреть пример КП</Link>
          </div>
          <p className="microcopy">Текущая версия уже позволяет пройти ключевой сценарий продукта прямо в браузере.</p>
        </div>
        <div className="card feature-panel">
          <div className="mini-label">Что уже внутри</div>
          <div className="stack-md">
            <div className="inline-stat"><strong>Пакеты</strong><span>создайте свои шаблоны услуг и цен</span></div>
            <div className="inline-stat"><strong>КП по ссылке</strong><span>публичная страница вместо скучного файла</span></div>
            <div className="inline-stat"><strong>Базовый трекинг</strong><span>просмотры, CTA и скачивание PDF</span></div>
          </div>
          <div className="note-box">
            Сила продукта не в редакторе документов, а в том, что вы быстрее отправляете КП и лучше понимаете интерес клиента.
          </div>
        </div>
      </section>

      <section>
        <h2 className="section-title">Почему это можно показывать первым клиентам</h2>
        <div className="grid">
          {reasons.map((item) => (
            <div className="card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="split-section">
        <div>
          <h2 className="section-title">Как работает MVP</h2>
          <div className="stack-md">
            {steps.map((step, index) => (
              <div className="step-row" key={step}>
                <span className="step-index">0{index + 1}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="card highlight-card">
          <div className="mini-label">Отстройка</div>
          <h3>Не «ещё один конструктор КП»</h3>
          <p>
            Позиционирование строится вокруг скорости, digital-специализации и follow-up. Это сильнее, чем просто обещать красивые документы.
          </p>
          <div className="actions">
            <Link className="btn btn-primary" href="/packages">Настроить пакеты</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
