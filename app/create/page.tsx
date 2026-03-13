import { ProposalBuilder } from '@/components/ProposalBuilder'

export default function CreatePage() {
  return (
    <main className="container page-space">
      <section className="hero compact-hero">
        <span className="badge">Создать КП</span>
        <h1>Сделайте первый сценарий по-настоящему рабочим.</h1>
        <p className="lead">Вместо пустой схемы здесь уже есть форма, которая создаёт demo-КП и сохраняет его локально.</p>
      </section>

      <ProposalBuilder />
    </main>
  )
}
