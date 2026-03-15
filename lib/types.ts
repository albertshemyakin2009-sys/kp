export type PackageItem = {
  id: string
  name: string
  price: string
  summary: string
  bullets: string[]
}

export type ProposalRecord = {
  slug: string
  client: string
  project: string
  intro: string
  packageIds: string[]
  terms: string
  ctaLabel: string
  ctaUrl: string
  createdAt: string
}

export type ProposalEvent = {
  type: 'view' | 'cta_click' | 'pdf_download'
  ts: string
}
