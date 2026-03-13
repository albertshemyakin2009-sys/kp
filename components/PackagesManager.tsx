'use client'

import { type FormEvent, useEffect, useMemo, useState } from 'react'
import { packageTemplates } from '@/lib/demo'

type Item = {
  name: string
  price: string
  text: string
}

const STORAGE_KEY = 'kplink-packages'

export function PackagesManager() {
  const [items, setItems] = useState<Item[]>(packageTemplates)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [text, setText] = useState('')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Item[]
        if (Array.isArray(parsed) && parsed.length > 0) {
          setItems(parsed)
        }
      } catch {}
    }
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items, ready])

  const canSubmit = useMemo(() => name.trim() && price.trim() && text.trim(), [name, price, text])

  function addPackage(e: FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    setItems((current) => [
      {
        name: name.trim(),
        price: price.trim(),
        text: text.trim()
      },
      ...current
    ])
    setName('')
    setPrice('')
    setText('')
  }

  function removePackage(index: number) {
    setItems((current) => current.filter((_, i) => i !== index))
  }

  function resetDefaults() {
    setItems(packageTemplates)
  }

  return (
    <div className="stack-md">
      <div className="card">
        <div className="mini-label">Рабочий demo-экран</div>
        <h3>Добавьте свои пакеты один раз</h3>
        <p>Здесь пользователь готовит тарифы, которые потом подставляются в КП без ручной сборки в каждом новом документе.</p>
        <form className="stack-md form-grid" onSubmit={addPackage}>
          <label className="field">
            <span>Название пакета</span>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Например, Таргет — Рост" />
          </label>
          <label className="field">
            <span>Цена</span>
            <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="89 000 ₽ / мес" />
          </label>
          <label className="field field-full">
            <span>Что входит</span>
            <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="3 связки, креативы, weekly-отчёт, Telegram-чат" rows={4} />
          </label>
          <div className="actions">
            <button className="btn btn-primary" type="submit" disabled={!canSubmit}>Добавить пакет</button>
            <button className="btn btn-secondary" type="button" onClick={resetDefaults}>Вернуть demo-пакеты</button>
          </div>
        </form>
      </div>

      <div className="grid">
        {items.map((item, index) => (
          <div className="card" key={`${item.name}-${index}`}>
            <div className="mini-label">{item.price}</div>
            <h3>{item.name}</h3>
            <p>{item.text}</p>
            <div className="actions">
              <button className="btn btn-secondary btn-small" type="button" onClick={() => removePackage(index)}>Удалить</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
