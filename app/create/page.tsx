import Link from 'next/link'

const steps = [
  {
    title: '1. Клиент и задача',
    text: 'Кого отправляем, что продаём и какой следующий шаг хотим получить: ответ, созвон или оплату.'
  },
  {
    title: '2. Пакеты',
    text: 'Выбираем 2–3 подходящих тарифа из библиотеки. Не нужно собирать состав услуг руками каждый раз.'
  },
  {
    title: '3. Условия и CTA',
    text: 'Добавляем сроки запуска, FAQ и кнопку связи: Telegram, WhatsApp или созвон.'
  },
  {
    title: '4. Предпросмотр',
    text: 'Сразу видим страницу, копируем ссылку и при необходимости готовим PDF.'
  }
]

export default function CreatePage() {
  return (
    <main className="container page-space">
      <section className="hero compact-hero">
        <span className="badge">Wizard</span>
        <h1>Именно так пользователь будет собирать КП внутри продукта.</h1>
        <p className="lead">Сейчас это статичный сценарий, но он уже показывает, как должна выглядеть рыночная логика продукта.</p>
      </section>

      <section className="stack-md">
        {steps.map((step) => (
          <div className="card" key={step.title}>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>
        ))}
      </section>

      <section className="cta-band slim-band">
        <div>
          <h2>Этого уже достаточно, чтобы показывать flow инвестору, клиенту или разработчику.</h2>
          <p>Следующий логичный шаг — перевести сценарий на реальные формы и сохранение данных.</p>
        </div>
        <div className="actions actions-vertical">
          <Link className="btn btn-primary" href="/dashboard">Перейти в дашборд</Link>
        </div>
      </section>
    </main>
  )
}
