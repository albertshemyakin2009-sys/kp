import Link from 'next/link'
import { dashboardProposals, dashboardStats } from '@/lib/demo'

export default function DashboardPage() {
  return (
    <main className="container page-space">
      <section className="hero compact-hero">
        <span className="badge">Дашборд</span>
        <h1>Отсюда видно, какие КП реально живут после отправки.</h1>
        <p className="lead">Смотрим активность, понимаем, кому писать follow-up, и держим под рукой шаблоны пакетов.</p>
        <div className="actions">
          <Link className="btn btn-primary" href="/create">Создать КП</Link>
          <Link className="btn btn-secondary" href="/proposal/demo-client">Открыть пример КП</Link>
        </div>
      </section>

      <section className="kpi">
        {dashboardStats.map((item) => (
          <div className="card" key={item.label}>
            <strong>{item.value}</strong>
            <h3>{item.label}</h3>
            <p>{item.hint}</p>
          </div>
        ))}
      </section>

      <section className="split-section">
        <div>
          <h2 className="section-title">Текущие КП</h2>
          <div className="stack-md">
            {dashboardProposals.map((p) => (
              <div className="card proposal-row" key={p.name}>
                <div>
                  <h3>{p.name}</h3>
                  <p>Статус: {p.status}</p>
                  <p>Просмотры: {p.views}</p>
                  <p>Последняя активность: {p.updated}</p>
                </div>
                <div className="proposal-side">
                  <span className="pill">{p.action}</span>
                  <Link className="btn btn-secondary btn-small" href="/proposal/demo-client">Открыть</Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card feature-panel">
          <div className="mini-label">Follow-up</div>
          <h3>Готовые сообщения</h3>
          <p>После просмотра КП менеджеру не нужно долго думать, что писать клиенту. Внутри продукта это можно превратить в копируемые шаблоны.</p>
          <div className="note-box">
            «Вижу, что вы посмотрели предложение. Могу коротко созвониться сегодня и подсказать, какой пакет лучше под вашу задачу?»
          </div>
        </div>
      </section>
    </main>
  )
}
