import { PackagesManager } from '@/components/PackagesManager'

export default function PackagesPage() {
  return (
    <main className="container page-space">
      <section className="hero compact-hero">
        <span className="badge">Библиотека пакетов</span>
        <h1>Здесь MVP начинает выглядеть как продукт, а не как макет.</h1>
        <p className="lead">Пользователь может сам подготовить пакеты, которые потом переиспользуются в каждом новом КП.</p>
      </section>

      <PackagesManager />
    </main>
  )
}
