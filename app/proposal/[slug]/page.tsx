'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { proposals as demoProposals } from '@/lib/demo'
import { getPackagesForProposal, getProposalBySlug, trackEvent, getProposalStats } from '@/lib/storage'
import type { PackageItem, ProposalRecord } from '@/lib/types'

export default function ProposalPage({ params }: { params: { slug: string } }) {
  const [record, setRecord] = useState<ProposalRecord | null>(null)
  const [packages, setPackages] = useState<PackageItem[]>([])
  const [stats, setStats] = useState({ views: 0, ctaClicks: 0, pdfDownloads: 0, lastActivity: null as string | null })
  const demoCases = demoProposals[0].cases
  const demoFaq = demoProposals[0].faq

  useEffect(() => {
    const result = getProposalBySlug(params.slug)
    if (!result) return
    setRecord(result.data)
    if (result.source === 'demo') {
      const demo = demoProposals[0]
      setPackages(demo.packages.map((item, index) => ({
        id: `demo-${index}`,
        name: item.name,
        price: item.price,
        summary: item.note,
        bullets: item.bullets
      })))
    } else {
      setPackages(getPackagesForProposal(result.data))
    }
    trackEvent(params.slug, 'view')
    setStats(getProposalStats(params.slug))
  }, [params.slug])

  const shareText = useMemo(() => record?.intro || 'Готовое коммерческое предложение по ссылке.', [record])

  function onCtaClick() {
    trackEvent(params.slug, 'cta_click')
    setStats(getProposalStats(params.slug))
  }

  function onPdfClick() {
    trackEvent(params.slug, 'pdf_download')
    setStats(getProposalStats(params.slug))
    if (typeof window !== 'undefined') window.print()
  }

  if (!record) {
    return (
      <main className="container page-space">
        <div className="card"><h1>КП не найдено</h1><p>Вернитесь в дашборд и создайте новое предложение.</p></div>
      </main>
    )
  }

  return (
    <main className="container page-space">
      <section className="hero compact-hero">
        <span className="badge">Публичная страница КП</span>
        <h1>{record.project}</h1>
        <p className="lead">{shareText}</p>
        <div className="actions">
          <a className="btn btn-primary" href={record.ctaUrl} onClick={onCtaClick} target="_blank" rel="noreferrer">{record.ctaLabel}</a>
          <button className="btn btn-secondary" onClick={onPdfClick}>Скачать PDF</button>
        </div>
        <p className="microcopy">Клиент: {record.client} · Просмотры: {stats.views} · CTA: {stats.ctaClicks}</p>
      </section>

      <section className="grid">
        {packages.map((item, index) => (
          <div className={`card ${index === 1 ? 'featured-card' : ''}`} key={item.id}>
            <div className="mini-label">{item.price}</div>
            <h3>{item.name}</h3>
            <p>{item.summary}</p>
            <ul className="feature-list">
              {item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
            </ul>
          </div>
        ))}
      </section>

      <section className="split-section" style={{ marginTop: 22 }}>
        <div className="card">
          <div className="mini-label">Как будем работать</div>
          <h3>Понятный процесс без лишнего шума</h3>
          <ul className="feature-list">
            <li>Короткий созвон или переписка по вводным</li>
            <li>Фиксируем KPI и следующий шаг</li>
            <li>Стартуем быстро, без долгой бюрократии</li>
          </ul>
        </div>
        <div className="card">
          <div className="mini-label">Условия</div>
          <h3>Что важно знать до старта</h3>
          <p>{record.terms}</p>
          <div className="note-box">В реальном MVP здесь можно показать реквизиты, формат отчётности, НДС и другие детали сделки.</div>
        </div>
      </section>

      <section style={{ marginTop: 22 }}>
        <h2 className="section-title">Кейсы</h2>
        <div className="grid grid-2">
          {demoCases.map((item) => (
            <div className="card" key={item.title}>
              <div className="mini-label">{item.result}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 22 }}>
        <h2 className="section-title">FAQ</h2>
        <div className="stack-md">
          {demoFaq.map((item) => (
            <div className="card" key={item.q}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-band">
        <div>
          <div className="mini-label">Следующий шаг</div>
          <h2>Если формат подходит, можно быстро перейти к созвону и запуску.</h2>
          <p>Такой CTA на публичной странице должен двигать клиента дальше, а не просто красиво завершать документ.</p>
        </div>
        <div className="actions actions-vertical">
          <a className="btn btn-primary" href={record.ctaUrl} onClick={onCtaClick} target="_blank" rel="noreferrer">{record.ctaLabel}</a>
          <Link className="btn btn-secondary" href="/dashboard">Вернуться в дашборд</Link>
        </div>
      </section>
    </main>
  )
}
