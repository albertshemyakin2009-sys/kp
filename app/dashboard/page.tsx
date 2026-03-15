'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { dashboardStats } from '@/lib/demo'
import { getProposals, getProposalStats } from '@/lib/storage'
import type { ProposalRecord } from '@/lib/types'

function formatDate(input: string | null) {
  if (!input) return 'пока нет активности'
  return new Date(input).toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
}

export default function DashboardPage() {
  const [items, setItems] = useState<ProposalRecord[]>([])

  useEffect(() => {
    setItems(getProposals())
  }, [])

  const localStats = useMemo(() => {
    let views = 0
    let clicks = 0
    items.forEach((item) => {
      const stats = getProposalStats(item.slug)
      views += stats.views
      clicks += stats.ctaClicks
    })
    return { views, clicks }
  }, [items])

  return (
    <main className="container page-space">
      <section className="hero compact-hero">
        <span className="badge">Дашборд</span>
        <h1>Отсюда видно, какие КП живут после отправки.</h1>
        <p className="lead">Смотрите активность, открывайте ссылки и решайте, кому делать follow-up.</p>
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

      <section className="kpi">
        <div className="card"><strong>{items.length}</strong><h3>Ваши demo-КП</h3><p>Сохранены локально в этом браузере.</p></div>
        <div className="card"><strong>{localStats.views}</strong><h3>Просмотры</h3><p>Сколько раз открывали ваши локальные КП.</p></div>
        <div className="card"><strong>{localStats.clicks}</strong><h3>CTA-клики</h3><p>Сигнал, что клиент дошёл до следующего шага.</p></div>
      </section>

      <section className="split-section">
        <div>
          <h2 className="section-title">Последние созданные КП</h2>
          <div className="stack-md">
            {items.length === 0 ? (
              <div className="card"><h3>Пока пусто</h3><p>Создайте первое demo-КП, чтобы увидеть его здесь.</p></div>
            ) : items.map((item) => {
              const stats = getProposalStats(item.slug)
              return (
                <div className="card proposal-row" key={item.slug}>
                  <div>
                    <h3>{item.client}</h3>
                    <p>{item.project}</p>
                    <p>Просмотры: {stats.views} · CTA: {stats.ctaClicks} · PDF: {stats.pdfDownloads}</p>
                    <p>Последняя активность: {formatDate(stats.lastActivity)}</p>
                  </div>
                  <div className="proposal-side">
                    <span className="pill">{stats.views > 0 ? 'Пора делать follow-up' : 'Ещё не открывали'}</span>
                    <Link className="btn btn-secondary btn-small" href={`/proposal/${item.slug}`}>Открыть</Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="card feature-panel">
          <div className="mini-label">Follow-up</div>
          <h3>Шаблон после просмотра</h3>
          <div className="note-box">
            Вижу, что вы посмотрели предложение. Могу коротко созвониться сегодня и подсказать, какой пакет лучше под вашу задачу?
          </div>
          <h3 style={{ marginTop: 18 }}>Шаблон, если не открывали</h3>
          <div className="note-box">
            Отправляю короткое напоминание по КП. Там 2–3 понятных пакета и следующий шаг, чтобы быстро принять решение без лишних созвонов.
          </div>
        </div>
      </section>
    </main>
  )
}
