export default function HomePage() {
  return (
    <main className="container">
      <section className="hero">
        <span className="badge">КПлинк — MVP для digital-услуг</span>
        <h1>Соберите КП за 2 минуты и сразу узнайте, открыл ли его клиент.</h1>
        <p className="lead">
          Для агентств, SMM, таргета и студий: пакеты, кейсы, ссылка, PDF и готовые
          сообщения для дожима — в одном месте.
        </p>
        <div className="actions">
          <a className="btn btn-primary" href="/dashboard">Открыть демо</a>
          <a className="btn btn-secondary" href="/proposal/demo-client">Посмотреть КП</a>
        </div>
      </section>

      <section>
        <h2 className="section-title">Что уже показывает MVP</h2>
        <div className="kpi">
          <div className="card"><strong>2 мин</strong><p>Сборка КП из готовых блоков и пакетов.</p></div>
          <div className="card"><strong>3 сигнала</strong><p>Просмотр, скачивание PDF и клик по CTA.</p></div>
          <div className="card"><strong>1 ссылка</strong><p>Клиент получает аккуратную страницу вместо скучного файла.</p></div>
        </div>
      </section>

      <section className="grid">
        <div className="card"><h3>Пакеты услуг</h3><p>Быстро покажите клиенту 2–3 тарифа и что входит в каждый.</p></div>
        <div className="card"><h3>Кейсы и доверие</h3><p>Добавьте результаты, процесс работы и ответы на частые вопросы.</p></div>
        <div className="card"><h3>Follow-up</h3><p>После просмотра КП можно сразу отправить готовое сообщение клиенту.</p></div>
      </section>

      <footer>Минимальная демо-версия без базы данных. Подходит для первого деплоя на GitHub + Vercel.</footer>
    </main>
  )
}
