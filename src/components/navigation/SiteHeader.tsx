import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: '梦忆' },
  { to: '/timeline', label: '年谱' },
  { to: '/map', label: '行迹' },
  { to: '/read', label: '原文' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <Link className="site-brand" to="/" onClick={() => setOpen(false)}>
        <strong>陶庵一梦</strong>
        <span>Zhang Dai and the World of Tao'an Mengyi</span>
      </Link>
      <button className="menu-toggle" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="打开导航">
        <span />
        <span />
      </button>
      <nav className={open ? 'is-open' : ''} aria-label="主导航">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === '/'} onClick={() => setOpen(false)}>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
