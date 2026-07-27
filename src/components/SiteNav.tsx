import { Link, NavLink } from 'react-router-dom'
export function SiteNav(){return <header className="site-nav"><Link to="/" className="site-mark">陶庵一梦<span>The Life of Zhang Dai</span></Link><nav><NavLink end to="/">梦忆</NavLink><NavLink to="/timeline">年谱</NavLink><NavLink to="/map">行迹</NavLink><NavLink to="/read">原文</NavLink></nav></header>}
