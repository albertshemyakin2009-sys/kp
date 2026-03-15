'use client'

import type { PackageItem, ProposalEvent, ProposalRecord } from '@/lib/types'
import { packageTemplates, proposals as demoProposals } from '@/lib/demo'

const PACKAGES_KEY = 'kplink_packages_v1'
const PROPOSALS_KEY = 'kplink_proposals_v1'
const EVENTS_KEY = 'kplink_events_v1'

function hasWindow() {
  return typeof window !== 'undefined'
}

export function seedPackages(): PackageItem[] {
  return packageTemplates.map((item, index) => ({
    id: `seed-${index + 1}`,
    name: item.name,
    price: item.price,
    summary: item.text,
    bullets: ['Кейсы и примеры работ', 'Понятные сроки запуска', 'Follow-up и next step']
  }))
}

export function getPackages(): PackageItem[] {
  if (!hasWindow()) return seedPackages()
  const raw = window.localStorage.getItem(PACKAGES_KEY)
  if (!raw) {
    const seeded = seedPackages()
    window.localStorage.setItem(PACKAGES_KEY, JSON.stringify(seeded))
    return seeded
  }
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : seedPackages()
  } catch {
    return seedPackages()
  }
}

export function savePackages(items: PackageItem[]) {
  if (!hasWindow()) return
  window.localStorage.setItem(PACKAGES_KEY, JSON.stringify(items))
}

export function getProposals(): ProposalRecord[] {
  if (!hasWindow()) return []
  const raw = window.localStorage.getItem(PROPOSALS_KEY)
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveProposal(item: ProposalRecord) {
  if (!hasWindow()) return
  const proposals = getProposals()
  const next = [item, ...proposals.filter((p) => p.slug !== item.slug)]
  window.localStorage.setItem(PROPOSALS_KEY, JSON.stringify(next))
}

export function getProposalBySlug(slug: string) {
  if (slug === 'demo-client') {
    const demo = demoProposals[0]
    return {
      source: 'demo' as const,
      data: {
        slug: demo.slug,
        client: demo.client,
        project: demo.title,
        intro: demo.subtitle,
        packageIds: demo.packages.map((_, i) => `demo-${i}`),
        terms: 'Старт 3–5 рабочих дней после созвона и доступа. Оплата помесячно.',
        ctaLabel: 'Написать в Telegram',
        ctaUrl: 'https://t.me/example',
        createdAt: new Date().toISOString()
      }
    }
  }
  const item = getProposals().find((p) => p.slug === slug)
  return item ? { source: 'custom' as const, data: item } : null
}

export function getPackagesForProposal(record: ProposalRecord): PackageItem[] {
  const packages = getPackages()
  return packages.filter((item) => record.packageIds.includes(item.id))
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-zа-я0-9]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40) || `proposal-${Date.now()}`
}

export function getEventsMap(): Record<string, ProposalEvent[]> {
  if (!hasWindow()) return {}
  const raw = window.localStorage.getItem(EVENTS_KEY)
  if (!raw) return {}
  try {
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

export function trackEvent(slug: string, type: ProposalEvent['type']) {
  if (!hasWindow()) return
  const map = getEventsMap()
  const list = map[slug] || []
  map[slug] = [{ type, ts: new Date().toISOString() }, ...list]
  window.localStorage.setItem(EVENTS_KEY, JSON.stringify(map))
}

export function getProposalStats(slug: string) {
  const list = getEventsMap()[slug] || []
  return {
    views: list.filter((x) => x.type === 'view').length,
    ctaClicks: list.filter((x) => x.type === 'cta_click').length,
    pdfDownloads: list.filter((x) => x.type === 'pdf_download').length,
    lastActivity: list[0]?.ts || null
  }
}
