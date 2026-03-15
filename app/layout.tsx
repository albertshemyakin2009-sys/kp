import './globals.css'
import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'

export const metadata: Metadata = {
  title: 'КПлинк',
  description: 'КП для digital-услуг за 2 минуты: ссылка, PDF и сигнал интереса клиента.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  )
}
