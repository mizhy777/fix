'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, MessageCircle, Search, ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { store, waLink } from '@/lib/store';

const navLinks = [
  { href: '/catalogo', label: 'Todo el catálogo' },
  { href: '/catalogo?categoria=iPhone', label: 'iPhone' },
  { href: '/catalogo?categoria=Samsung', label: 'Samsung' },
  { href: '/catalogo?categoria=iPad', label: 'iPad' },
  { href: '/catalogo?categoria=Apple+Watch', label: 'Watch' },
  { href: '/catalogo?categoria=Audio', label: 'Audio' },
  { href: '/catalogo?categoria=Accesorios', label: 'Accesorios' },
  { href: '/plan-retoma', label: 'Plan Retoma' },
];

export function Header() {
  const { count } = useCart();

  return (
    <header className="site-header">
      <div className="topline">
        <p className="promo-line">
          <span className="promo-dot" />
          Precios imperdibles · por tiempo limitado
        </p>
        <div className="topline-links">
          <span className="topline-location">
            <MapPin size={13} /> {store.address}
          </span>
          <a href={waLink('Hola FIX MOBIL, quiero asesoría para comprar un equipo.')} target="_blank" rel="noreferrer">
            <MessageCircle size={13} /> Asesoría por WhatsApp
          </a>
        </div>
      </div>

      <div className="header-main">
        <Link href="/" className="brand" aria-label="FIX MOBIL, ir al inicio">
          <Image
            src={store.logo}
            alt="FIX MOBIL"
            width={1426}
            height={1103}
            className="brand-logo"
            priority
          />
        </Link>

        <nav className="desktop-nav" aria-label="Navegación principal">
          <Link href="/">Inicio</Link>
          <Link href="/catalogo?categoria=iPhone">iPhone</Link>
          <Link href="/catalogo?categoria=Samsung">Samsung</Link>
          <Link href="/catalogo?categoria=iPad">iPad</Link>
          <Link href="/catalogo?categoria=Apple+Watch">Watch</Link>
          <Link href="/catalogo?categoria=Audio">Audio</Link>
          <Link href="/catalogo?categoria=Accesorios">Accesorios</Link>
        </nav>

        <form className="search" action="/catalogo" role="search">
          <Search size={17} aria-hidden />
          <input
            name="q"
            placeholder="Buscar iPhone, Galaxy, AirPods..."
            aria-label="Buscar productos"
          />
        </form>

        <Link className="header-wa" href={waLink('Hola FIX MOBIL, quiero asesoría para comprar un equipo.')} target="_blank" rel="noreferrer">
          <MessageCircle size={17} />
          <span>WhatsApp</span>
        </Link>

        <Link className="cart-link" href="/carrito" aria-label="Ver mi cotización">
          <ShoppingBag size={20} />
          <span>Cotización</span>
          {count > 0 && <b className="cart-count">{count}</b>}
        </Link>
      </div>

      <nav className="mobile-nav" aria-label="Navegación móvil">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
