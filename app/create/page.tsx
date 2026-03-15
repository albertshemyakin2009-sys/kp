'use client'

import Link from 'next/link'
import { FormEvent, useEffect, useMemo, useState } from 'react'
import { getPackages, saveProposal, slugify } from '@/lib/storage'
import type { PackageItem } from '@/lib/types'

export default function CreatePage() {
  const [packages, setPackages] = useState<PackageItem[]>([])
  const [client, setClient] = useState('')
  const [project, setProject] = useState('')
  const [intro, setIntro] = useState('')
  const [terms, setTerms] = useState('Старт 3–5 рабочих дней после согласования. Оплата помесячно, без долгих правок и созвонов.')
  const [ctaLabel, setCtaLabel] = useState('Написать в Telegram')
  const [ctaUrl, setCtaUrl] = useState('https://t.me/example')
  const [selected, setSelected] = useState<string[]>([])
  const [createdSlug, setCreatedSlug] = useState<string | null>(null)

  useEffect(() => {
    const items = getPackages()
    setPackages(items)
    setSelected(items.slice(0, 2).map((item) => item.id))
  }, [])

  const canSubmit = client.trim() && project.trim() && selected.length > 0
  const previewCount = useMemo(() => packages.filter((item) => selected.includes(item.id)).length, [packages, selected])

  function togglePackage(id: string) {
    setSelected((current) => current.includes(id) ? current.filter((x) => x !== id) : [...current, id])
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    const slug = `${slugify(client)}-${Date.now().toString().slice(-5)}`
    saveProposal({
      slug,
      client: client.trim(),
      project: project.trim(),
      intro: intro.trim() || 'Собрали короткое и понятное КП, чтобы быстро согласовать формат работы и следующий шаг.',
      packageIds: selected,
      terms: terms.trim(),
      ctaLabel: ctaLabel.trim() || 'Связаться',
      ctaUrl: ctaUrl.trim() || '#',
      createdAt: new Date().toISOString()
    })
    setCreatedSlug(slug)
  }

  return (
    <main className="container page-space">
      <section className="hero compact-hero">
        <span className="badge">Создать КП</span>
        <h1>Соберите предложение так, как это будет происходить в настоящем MVP.</h1>
        <p className="lead">Шаги простые: клиент, задача, пакеты, условия и ссылка на готовое КП.</p>
      </section>

      <section className="split-section">
        <form className="card stack-md" onSubmit={onSubmit}>
          <div className="mini-label">1. Клиент и задача</div>
          <label className="field"><span>Клиент</span><input value={client} onChange={(e) => setClient(e.target.value)} placeholder="Studio N" /></label>
          <label className="field"><span>Что продаём</span><input value={project} onChange={(e) => setProject(e.target.value)} placeholder="Таргет + креативы + weekly отчётность" /></label>
          <label className="field"><span>Короткое вступление</span><textarea value={intro} onChange={(e) => setIntro(e.target.value)} placeholder="Что получит клиент и почему формат удобный" /></label>

          <div className="mini-label">2. Пакеты</div>
          <div className="stack-sm">
            {packages.map((item) => (
              <label key={item.id} className="pick-card">
                <input type="checkbox" checked={selected.includes(item.id)} onChange={() => togglePackage(item.id)} />
                <div>
                  <strong>{item.name}</strong>
                  <p>{item.price}</p>
                  <p>{item.summary}</p>
                </div>
              </label>
            ))}
          </div>

          <div className="mini-label">3. Условия и CTA</div>
          <label className="field"><span>Условия</span><textarea value={terms} onChange={(e) => setTerms(e.target.value)} /></label>
          <label className="field"><span>Текст кнопки</span><input value={ctaLabel} onChange={(e) => setCtaLabel(e.target.value)} /></label>
          <label className="field"><span>Ссылка кнопки</span><input value={ctaUrl} onChange={(e) => setCtaUrl(e.target.value)} /></label>
          <button className="btn btn-primary" type="submit" disabled={!canSubmit}>Создать КП</button>
        </form>

        <div className="stack-md">
          <div className="card">
            <div className="mini-label">Предпросмотр логики</div>
            <h3>{client || 'Новый клиент'}</h3>
            <p>{project || 'Здесь появится формулировка вашей услуги и задачи клиента.'}</p>
            <div className="note-box">Выбрано пакетов: {previewCount}</div>
            <p className="microcopy">После создания откроется публичная ссылка, которую можно отправить клиенту.</p>
          </div>

          {createdSlug ? (
            <div className="card">
              <div className="mini-label">Готово</div>
              <h3>КП создано</h3>
              <p>Ссылка уже сохранена в браузере и откроется как публичная страница продукта.</p>
              <div className="actions">
                <Link className="btn btn-primary" href={`/proposal/${createdSlug}`}>Открыть созданное КП</Link>
                <Link className="btn btn-secondary" href="/dashboard">Перейти в дашборд</Link>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  )
}
