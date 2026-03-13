import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'КПлинк',
  description: 'Соберите КП за 2 минуты и сразу узнайте, открыл ли его клиент.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
