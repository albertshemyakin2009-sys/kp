'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { packageTemplates } from '@/lib/demo'

type StoredProposal = {
  slug: string
  client: string
  title: string
  subtitle: string
  packages: { name: string; price: string; note: string; bullets: string[]; featured?: boolean }[]
  cases: { title: string; result: string; text: string }[]
  faq: { q: string; a: string }[]
  audience: string
}

const PACKAGES_KEY = 'kplink-packages'
const PROPOSALS_KEY = 'kplink-proposals'

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-zа-я0-9]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40) || `client-${Date.now()}`
}

export function ProposalBuilder() {
  const router = useRouter()
  const [client, setClient] = useState('')
  const [goal, setGoal] = useState('Созвониться и выбрать оптимальный пакет под задачу клиента.')
  const [telegram, setTelegram] = useState('https://t.me/example')
  const [packages, setPackages] = useState(packageTemplates)
  const [selected, setSelected] = useState<number[]>([0, 1])
  const [createdSlug, setCreatedSlug] = useState('')

  useEffect(() => {
    const raw = window.localStorage.getItem(PACKAGES_KEY)
    if (!raw) return
    try {
      const parsed = JSON.parse(raw) as { name: string; price: string; text: string }[]
      if (Array.isArray(parsed) && parsed.length > 0) {
        setPackages(parsed)
      }
    } catch {}
  }, [])

  const selectedPackages = useMemo(
    () => packages.filter((_, index) => selected.includes(index)).map((item, idx) => ({
      name: item.name,
      price: item.price,
      note: idx === 1 ? 'Рекомендуемый пакет для большинства клиентов' : 'Подойдёт как стартовый вариант',
      bullets: item.text.split(',').map((part) => part.trim()).filter(Boolean),
      featured: idx === 1
    })),
    [packages, selected]
  )

  function toggle(index: number) {
    setSelected((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index])
  }

  function createProposal() {
    const clientName = client.trim() || 'Новый клиент'
    const slug = slugify(clientName)
    const proposal: StoredProposal = {
      slug,
      client: clientName,
      title: `Коммерческое предложение для ${clientName}`,
      subtitle: goal,
      audience: 'Страница с пакетами, кейсами и понятным следующим шагом вместо сухого PDF.',
      packages: selectedPackages.length > 0 ? selectedPackages : [{
        name: packages[0]?.name || 'Базовый пакет',
        price: packages[0]?.price || 'по запросу',
        note: 'Стартовый пакет',
        bullets: (packages[0]?.text || 'Состав работ обсуждается на созвоне').split(',').map((item) => item.trim()),
      }],
      cases: [
        {
          title: 'Похожий проект из этой ниши',
          result: '+37% к заявкам за 5 недель',
          text: 'В рабочей версии тут будут реальные кейсы пользователя из его библиотеки блоков.'
        }
      ],
      faq: [
        {
          q: 'Как быстро можно стартовать?',
          a: 'Обычно запуск идёт в течение 3–5 рабочих дней после короткого созвона и получения доступов.'
        },
        {
          q: 'Как связаться быстрее всего?',
          a: telegram
        }
      ]
    }

    const existingRaw = window.localStorage.getItem(PROPOSALS_KEY)
    const existing = existingRaw ? (JSON.parse(existingRaw) as StoredProposal[]) : []
    const next = [proposal, ...existing.filter((item) => item.slug !== slug)]
    window.localStorage.setItem(PROPOSALS_KEY, JSON.stringify(next))
    setCreatedSlug(slug)
  }

  return (
    <div className="stack-md">
      <div className="card">
        <div className="mini-label">Рабочий сценарий</div>
        <h3>Соберите demo-КП прямо здесь</h3>
        <p>Эта форма уже даёт понятный flow: клиент, пакеты и публичная ссылка. Данные сохраняются в localStorage, чтобы проект ощущался как продукт.</p>
        <div className="form-grid stack-md">
          <label className="field field-full">
            <span>Название клиента</span>
            <input value={client} onChange={(e) => setClient(e.target.value)} placeholder="Например, Studio N" />
          </label>
          <label className="field field-full">
            <span>Следующий шаг / оффер</span>
            <textarea value={goal} onChange={(e) => setGoal(e.target.value)} rows={4} />
          </label>
          <label className="field field-full">
            <span>Ссылка для CTA</span>
            <input value={telegram} onChange={(e) => setTelegram(e.target.value)} placeholder="https://t.me/username" />
          </label>
        </div>
      </div>

      <div className="card">
        <div className="mini-label">Пакеты</div>
        <h3>Выберите, что попадёт в КП</h3>
        <div className="stack-sm">
          {packages.map((item, index) => {
            const active = selected.includes(index)
            return (
              <button className={`select-row ${active ? 'select-row-active' : ''}`} key={`${item.name}-${index}`} type="button" onClick={() => toggle(index)}>
                <div>
                  <strong>{item.name}</strong>
                  <p>{item.price}</p>
                </div>
                <span>{active ? 'Добавлено' : 'Выбрать'}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="cta-band slim-band">
        <div>
          <h2>После клика создаётся рабочая demo-ссылка</h2>
          <p>Эта ссылка откроется на публичной странице КП внутри проекта.</p>
        </div>
        <div className="actions actions-vertical">
          <button className="btn btn-primary" type="button" onClick={createProposal}>Создать demo-КП</button>
          {createdSlug ? (
            <>
              <Link className="btn btn-secondary" href={`/proposal/${createdSlug}`}>Открыть созданное КП</Link>
              <button className="btn btn-secondary" type="button" onClick={() => router.push('/dashboard')}>Перейти в дашборд</button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}
