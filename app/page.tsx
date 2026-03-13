import Link from 'next/link'

const reasons = [
  {
    title: 'Собирается быстро',
    text: 'Не нужно заново верстать каждое КП. Берёте готовые пакеты, кейсы и условия — и отправляете ссылку.'
  },
  {
    title: 'Понятно, был ли интерес',
    text: 'В дашборде видно, открыли ли КП, скачали ли PDF и кому пора писать follow-up.'
  },
  {
    title: 'Заточено под digital-услуги',
    text: 'Таргет, SMM, студии, продакшн и агентства. Не универсальный редактор документов, а инструмент продаж.'
  }
]

const steps = [
  'Заполняете свои пакеты и кейсы один раз.',
  'Выбираете клиента и нужные блоки.',
  'Отправляете ссылку или PDF и видите реакцию.'
]

const faqs = [
  {
    q: 'Это замена PDF?',
    a: 'Скорее улучшение. Клиент получает удобную страницу по ссылке, а при необходимости всё равно может скачать PDF.'
  },
  {
    q: 'Для кого платформа подходит лучше всего?',
    a: 'Для digital-услуг: SMM, таргета, контекста, веб-студий, продакшна и небольших агентств.'
  },
  {
    q: 'Что делает продукт отличающимся?',
    a: 'Скорость сборки, готовые пакеты и фокус на том, чтобы не просто отправить КП, а вовремя дожать клиента.'
  }
]

export default function HomePage() {
  return (
    <main className="container page-space">
      <section className="hero hero-grid">
        <div>
          <span className="badge">КПлинк — MVP для агентств и digital-специалистов</span>
          <h1>Соберите КП за 2 минуты и сразу узнайте, открыл ли его клиент.</h1>
          <p className="lead">
            Пакеты, кейсы, ссылка, PDF и готовые follow-up сообщения — в одном месте.
            Вместо ручной сборки в Google Docs и бесконечных «скиньте КП ещё раз».
          </p>
          <div className="actions">
            <Link className="btn btn-primary" href="/proposal/demo-client">Посмотреть пример КП</Link>
            <Link className="btn btn-secondary" href="/create">Собрать demo-КП</Link>
          </div>
          <p className="microcopy">Подходит для SMM, таргета, продакшна, веб-студий и небольших агентств.</p>
        </div>

        <div className="card feature-panel">
          <div className="mini-label">Что получает пользователь</div>
          <div className="stack-sm">
            <div className="inline-stat"><strong>7 мин</strong><span>до первого отправленного КП</span></div>
            <div className="inline-stat"><strong>3 сигнала</strong><span>view, pdf_download, cta_click</span></div>
            <div className="inline-stat"><strong>1 ссылка</strong><span>красивое КП вместо скучного файла</span></div>
          </div>
          <div className="note-box">
            Польза продукта не в «редакторе документов», а в том, что вы быстрее отправляете КП и лучше понимаете, когда пора дожимать клиента.
          </div>
        </div>
      </section>

      <section>
        <h2 className="section-title">Почему это можно выставлять на рынок</h2>
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
          <h2 className="section-title">Как это работает</h2>
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
          <div className="mini-label">Рыночный угол</div>
          <h3>Не «ещё один конструктор КП»</h3>
          <p>
            Подача строится вокруг скорости, digital-специализации и follow-up. Это помогает отличаться от больших универсальных proposal-сервисов.
          </p>
          <Link className="btn btn-primary" href="/packages">Открыть пакеты</Link>
        </div>
      </section>

      <section>
        <h2 className="section-title">Что будет на продающей странице КП</h2>
        <div className="grid grid-2">
          <div className="card"><h3>Тарифы и состав работ</h3><p>Клиент сразу видит пакеты, цену, сроки и разницу между ними.</p></div>
          <div className="card"><h3>Кейсы и доверие</h3><p>Показываете результат прошлых проектов и отвечаете на главные вопросы ещё до созвона.</p></div>
          <div className="card"><h3>CTA под мессенджеры</h3><p>Вместо «напишите, если что» — конкретный следующий шаг: Telegram, WhatsApp или звонок.</p></div>
          <div className="card"><h3>PDF на случай «скинь файлом»</h3><p>Публичная ссылка остаётся основной, но PDF можно дать по клику, не собирая его вручную.</p></div>
        </div>
      </section>

      <section>
        <h2 className="section-title">Частые вопросы</h2>
        <div className="stack-md">
          {faqs.map((faq) => (
            <div className="card" key={faq.q}>
              <h3>{faq.q}</h3>
              <p>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-band">
        <div>
          <div className="mini-label">Следующий шаг</div>
          <h2>Уже можно показывать потенциальным клиентам и собирать обратную связь.</h2>
          <p>Теперь это не только витрина: пакеты редактируются, а demo-КП создаётся внутри проекта и открывается по отдельной ссылке.</p>
        </div>
        <div className="actions actions-vertical">
          <Link className="btn btn-primary" href="/create">Собрать demo-КП</Link>
          <Link className="btn btn-secondary" href="/dashboard">Открыть дашборд</Link>
        </div>
      </section>
    </main>
  )
}
