import './globals.css'
import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'

export const metadata: Metadata = {
  title: 'КПлинк',
  description: 'Соберите КП за 2 минуты и сразу узнайте, открыл ли его клиент.'
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
