import { packageTemplates } from '@/lib/demo'

export default function PackagesPage() {
  return (
    <main className="container page-space">
      <section className="hero compact-hero">
        <span className="badge">Библиотека пакетов</span>
        <h1>Шаблоны, с которых удобно начинать рыночный MVP.</h1>
        <p className="lead">Главная сила продукта — не в бесконечном редакторе, а в том, что типовые предложения уже упакованы в понятные пакеты.</p>
      </section>

      <section className="grid">
        {packageTemplates.map((item) => (
          <div className="card" key={item.name}>
            <div className="mini-label">{item.price}</div>
            <h3>{item.name}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </section>
    </main>
  )
}
