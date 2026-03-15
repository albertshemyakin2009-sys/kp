'use client'

import { FormEvent, useEffect, useState } from 'react'
import { getPackages, savePackages } from '@/lib/storage'
import type { PackageItem } from '@/lib/types'

const blank = { name: '', price: '', summary: '', bullets: '' }

export default function PackagesPage() {
  const [items, setItems] = useState<PackageItem[]>([])
  const [form, setForm] = useState(blank)

  useEffect(() => {
    setItems(getPackages())
  }, [])

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!form.name.trim() || !form.price.trim()) return
    const next: PackageItem = {
      id: `${Date.now()}`,
      name: form.name.trim(),
      price: form.price.trim(),
      summary: form.summary.trim() || 'Краткое описание пакета.',
      bullets: form.bullets.split('\n').map((x) => x.trim()).filter(Boolean)
    }
    const updated = [next, ...items]
    setItems(updated)
    savePackages(updated)
    setForm(blank)
  }

  function removeItem(id: string) {
    const updated = items.filter((item) => item.id !== id)
    setItems(updated)
    savePackages(updated)
  }

  return (
    <main className="container page-space">
      <section className="hero compact-hero">
        <span className="badge">Пакеты услуг</span>
        <h1>Заведите пакеты один раз, чтобы потом собирать КП за минуты.</h1>
        <p className="lead">Именно библиотека пакетов убирает ручную сборку КП с нуля.</p>
      </section>

      <section className="split-section">
        <form className="card stack-md" onSubmit={onSubmit}>
          <h3>Добавить пакет</h3>
          <label className="field"><span>Название</span><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Например: Таргет / Growth" /></label>
          <label className="field"><span>Цена</span><input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="89 000 ₽ / мес" /></label>
          <label className="field"><span>Кратко о пакете</span><textarea value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} placeholder="Для компаний, которым нужен стабильный поток заявок" /></label>
          <label className="field"><span>Состав работ — по строкам</span><textarea value={form.bullets} onChange={(e) => setForm({ ...form, bullets: e.target.value })} placeholder={'Аудит\nКреативы\nЕженедельный отчёт'} /></label>
          <button className="btn btn-primary" type="submit">Сохранить пакет</button>
        </form>

        <div className="stack-md">
          {items.map((item) => (
            <div className="card" key={item.id}>
              <div className="row-between gap-md">
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.price}</p>
                </div>
                <button className="btn btn-secondary btn-small" onClick={() => removeItem(item.id)} type="button">Удалить</button>
              </div>
              <p>{item.summary}</p>
              {item.bullets.length > 0 ? (
                <ul className="feature-list">
                  {item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
