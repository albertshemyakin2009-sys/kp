const packs = [
  { title: 'Базовый', price: '39 000 ₽', items: ['Стратегия', '2 креатива', 'Еженедельный отчёт'] },
  { title: 'Рост', price: '69 000 ₽', items: ['Стратегия', '6 креативов', '2 созвона в месяц', 'Дашборд'] },
  { title: 'Премиум', price: '109 000 ₽', items: ['Полное ведение', 'Тесты гипотез', 'Созвоны', 'Приоритетная связь'] }
]

export default function ProposalPage({ params }: { params: { slug: string } }) {
  return (
    <main className="container">
      <section className="hero" style={{ paddingTop: 40 }}>
        <span className="badge">КП для {decodeURIComponent(params.slug)}</span>
        <h1 style={{ fontSize: 44 }}>Коммерческое предложение по продвижению</h1>
        <p className="lead">Собрали для вас 3 варианта сотрудничества. Можно выбрать подходящий пакет и сразу написать в Telegram.</p>
        <div className="actions">
          <a className="btn btn-primary" href="https://t.me/username">Написать в Telegram</a>
          <a className="btn btn-secondary" href="#">Скачать PDF</a>
        </div>
      </section>
      <section>
        <h2 className="section-title">Пакеты</h2>
        <div className="grid">
          {packs.map((pack) => (
            <div className="card" key={pack.title}>
              <h3>{pack.title}</h3>
              <p style={{ marginBottom: 12, color: 'var(--text)', fontWeight: 700 }}>{pack.price}</p>
              <p>{pack.items.join(' • ')}</p>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="section-title">Почему сработает</h2>
        <div className="grid">
          <div className="card"><h3>Кейсы</h3><p>Покажем примеры роста заявок и снижения стоимости лида на похожих проектах.</p></div>
          <div className="card"><h3>Процесс</h3><p>Аудит → гипотезы → запуск → еженедельные отчёты → масштабирование.</p></div>
          <div className="card"><h3>Условия</h3><p>Старт за 3 рабочих дня, еженедельная отчётность, работа по договору.</p></div>
        </div>
      </section>
    </main>
  )
}
