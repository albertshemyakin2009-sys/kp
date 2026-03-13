import Link from 'next/link'

export function Nav() {
  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <Link href="/" className="brand">КПлинк</Link>
        <nav className="navlinks">
          <Link href="/packages">Пакеты</Link>
          <Link href="/create">Создать КП</Link>
          <Link href="/pricing">Тарифы</Link>
          <Link href="/dashboard">Демо</Link>
        </nav>
        <Link href="/dashboard" className="btn btn-primary btn-small">Открыть демо</Link>
      </div>
    </header>
  )
}
