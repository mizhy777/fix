'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  MessageCircle,
} from 'lucide-react';
import { useCart } from '@/lib/cart';
import { cop } from '@/lib/format';
import { productSpecLine, products } from '@/lib/products';
import { waLink } from '@/lib/store';

export function CartView() {
  const { detailed, count, total, ready, remove, setQty, clear } = useCart();

  if (!ready) {
    return (
      <section className="section page-section">
        <div className="cart-loading" />
      </section>
    );
  }

  if (detailed.length === 0) {
    return (
      <section className="section narrow page-section empty-state">
        <span className="empty-icon"><ShoppingBag size={34} /></span>
        <span className="eyebrow">TU COTIZACIÓN</span>
        <h1>Tu cotización está vacía</h1>
        <p>
          Agrega los equipos que te interesan y envía la lista por WhatsApp.
          Confirmamos disponibilidad y la mejor forma de pago.
        </p>
        <div className="empty-actions">
          <Link className="button button-primary" href="/catalogo">
            Explorar inventario <ArrowRight size={17} />
          </Link>
          <Link className="button button-outline" href="/producto/iphone-18-pro-max-256gb-glacier">
            Ver el iPhone 18 Pro Max
          </Link>
        </div>
      </section>
    );
  }

  const message = [
    'Hola FIX MOBIL. Quiero cotizar estos equipos:',
    '',
    ...detailed.map(
      ({ item, product }) =>
        `• ${item.qty} × ${product.name} ${productSpecLine(product)} ${product.color} — ${cop(
          product.price * item.qty,
        )}`,
    ),
    '',
    `Total publicado: ${cop(total)}`,
    '',
    '¿Me confirman disponibilidad y medios de pago?',
  ].join('\n');

  return (
    <>
      <section className="cart-hero">
        <div className="cart-hero-inner">
          <div>
            <nav className="breadcrumbs" aria-label="Ruta de navegación">
              <Link href="/">Inicio</Link><span>/</span><span>Cotización</span>
            </nav>
            <span className="eyebrow light">TU SELECCIÓN</span>
            <h1>Mi cotización</h1>
            <p>{count} {count === 1 ? 'producto agregado' : 'productos agregados'}. Revisa tu lista y envíala a un asesor.</p>
          </div>
          <span className="cart-hero-icon"><ShoppingBag size={28} /></span>
        </div>
      </section>

      <section className="section cart-section">
        <div className="cart-layout">
          <div className="cart-items">
            <div className="cart-items-head">
              <h2>Productos</h2>
              <button type="button" className="clear-cart" onClick={clear}>
                <Trash2 size={14} /> Vaciar
              </button>
            </div>
            {detailed.map(({ item, product }) => (
              <article key={product.slug} className="cart-item">
                <Link href={`/producto/${product.slug}`} className="cart-item-media">
                  <Image
                    src={product.image}
                    alt={`${product.name} ${product.color}`}
                    width={180}
                    height={180}
                  />
                </Link>
                <div className="cart-item-info">
                  <span className="cart-item-category">{product.category}</span>
                  <h3><Link href={`/producto/${product.slug}`}>{product.name}</Link></h3>
                  <p>{productSpecLine(product)} · {product.color}</p>
                  <small>{product.stock}</small>
                </div>
                <div className="cart-item-controls">
                  <div className="qty-control">
                    <button type="button" onClick={() => setQty(product.slug, item.qty - 1)} aria-label="Quitar una unidad">
                      <Minus size={14} />
                    </button>
                    <span>{item.qty}</span>
                    <button type="button" onClick={() => setQty(product.slug, item.qty + 1)} aria-label="Agregar una unidad">
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className="cart-item-price">
                    <b>{cop(product.price * item.qty)}</b>
                    <button type="button" onClick={() => remove(product.slug)} aria-label={`Quitar ${product.name}`}>
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
            <Link className="cart-continue" href="/catalogo">
              <ArrowRight size={15} /> Seguir explorando el inventario
            </Link>
          </div>

          <aside className="cart-summary">
            <span className="eyebrow">RESUMEN</span>
            <h2>Total de tu selección</h2>
            <div className="cart-summary-row">
              <span>Productos</span>
              <b>{count}</b>
            </div>
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <b>{cop(total)}</b>
            </div>
            <div className="cart-summary-total">
              <span>Total publicado</span>
              <b>{cop(total)}</b>
            </div>
            <p className="cart-summary-note">
              El valor final se confirma según disponibilidad, método de pago y
              promociones vigentes. No se realiza ningún cobro en línea.
            </p>
            <Link className="button button-primary full" href="/checkout">
              Continuar con mis datos <ArrowRight size={17} />
            </Link>
            <a
              className="button button-wa full"
              href={waLink(message)}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={17} /> Enviar cotización por WhatsApp
            </a>
            <div className="cart-summary-badges">
              <span>Pago en tienda</span>
              <span>Financiación</span>
              <span>Envío nacional</span>
            </div>
          </aside>
        </div>

        <div className="cart-suggestions">
          <div className="section-heading">
            <div>
              <span className="eyebrow">COMPLETA TU COMPRA</span>
              <h2>Accesorios originales</h2>
            </div>
            <Link className="text-link" href="/catalogo?categoria=Accesorios">Ver accesorios <ArrowRight size={14} /></Link>
          </div>
          <div className="suggestion-grid">
            {products
              .filter((product) => product.category === 'Accesorios')
              .map((product) => (
                <Link key={product.slug} href={`/producto/${product.slug}`} className="suggestion-card">
                  <Image src={product.image} alt={product.name} width={110} height={110} />
                  <div>
                    <b>{product.name}</b>
                    <span>{cop(product.price)}</span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
