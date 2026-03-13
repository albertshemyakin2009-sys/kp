const proposals = [
  { name: 'ООО Альфа', status: 'Открыто', views: 3, updated: 'сегодня, 11:42' },
  { name: 'Studio N', status: 'Отправлено', views: 0, updated: 'вчера, 18:10' },
  { name: 'ИП Романов', status: 'Скачали PDF', views: 2, updated: 'вчера, 12:27' }
]

export default function DashboardPage() {
  return (
    <main className="container">
      <section className="hero" style={{ paddingTop: 40 }}>
        <span className="badge">Дашборд</span>
        <h1 style={{ fontSize: 42 }}>Ваши коммерческие предложения</h1>
        <p className="lead">Отсюда видно, какие КП открывали, где был интерес и кому пора писать follow-up.</p>
        <div className="actions">
          <a className="btn btn-primary" href="/">На главную</a>
          <a className="btn btn-secondary" href="/proposal/demo-client">Открыть пример КП</a>
        </div>
      </section>
      <section className="grid" style={{ gridTemplateColumns: '1fr' }}>
        {proposals.map((p) => (
          <div className="card" key={p.name}>
            <h3>{p.name}</h3>
            <p>Статус: {p.status}</p>
            <p>Просмотры: {p.views}</p>
            <p>Обновлено: {p.updated}</p>
          </div>
        ))}
      </section>
    </main>
  )
}
