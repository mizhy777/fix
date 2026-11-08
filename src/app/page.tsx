import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  CreditCard,
  Headphones,
  MapPin,
  MessageCircle,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Store,
  Tablet,
  Watch,
} from 'lucide-react';
import { PaymentBadges } from '@/components/payment-badges';
import { ProductCard } from '@/components/product-card';
import { cop } from '@/lib/format';
import { featuredProducts, productSpecLine, products } from '@/lib/products';
import { store, waLink } from '@/lib/store';

const categoryCards = [
  { label: 'iPhone', href: '/catalogo?categoria=iPhone', icon: Smartphone, count: 8 },
  { label: 'Samsung', href: '/catalogo?categoria=Samsung', icon: Smartphone, count: 2 },
  { label: 'iPad', href: '/catalogo?categoria=iPad', icon: Tablet, count: 1 },
  { label: 'Apple Watch', href: '/catalogo?categoria=Apple+Watch', icon: Watch, count: 2 },
  { label: 'Audio', href: '/catalogo?categoria=Audio', icon: Headphones, count: 2 },
  { label: 'Accesorios', href: '/catalogo?categoria=Accesorios', icon: ZapIcon, count: 3 },
];

function ZapIcon(props: { size?: number }) {
  return <Sparkles {...props} />;
}

const benefitItems = [
  {
    icon: BadgeCheck,
    title: 'Equipos 100% originales',
    text: 'Productos nuevos, sellados y con garantía.',
  },
  {
    icon: ShieldCheck,
    title: 'Compra con confianza',
    text: 'Atención presencial y respaldo FIX MOBIL.',
  },
  {
    icon: CreditCard,
    title: 'Financiación a tu medida',
    text: 'Maxcrédito, SU+Pay, Addi y Sistecrédito.',
  },
  {
    icon: Store,
    title: 'Recoge el mismo día',
    text: 'C.C. River Plaza, segundo piso, local 229.',
  },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-grid" aria-hidden />
        <div className="hero-copy">
          <div className="hero-badge">
            <span /> Precios imperdibles
            <b>Por tiempo limitado</b>
          </div>
          <span className="eyebrow light">TECNOLOGÍA ORIGINAL · CÚCUTA</span>
          <h1>
            Estrena tecnología.
            <br />
            <em>Sin pagar de más.</em>
          </h1>
          <p>
            iPhone 18 Pro Max, Samsung Galaxy S26 Ultra, iPad, Apple Watch,
            AirPods y accesorios originales. Los mejores precios están en FIX
            MOBIL.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/catalogo">
              Ver todo el inventario <ArrowRight size={18} />
            </Link>
            <a
              className="button button-ghost"
              href={waLink('Hola FIX MOBIL, vi los precios imperdibles y quiero asesoría.')}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={18} /> Cotizar por WhatsApp
            </a>
          </div>
          <div className="hero-stats">
            <div>
              <b>18</b>
              <span>equipos publicados</span>
            </div>
            <div>
              <b>12</b>
              <span>meses de garantía</span>
            </div>
            <div>
              <b>5</b>
              <span>medios de financiación</span>
            </div>
          </div>
        </div>

        <div className="hero-art">
          <div className="hero-ring hero-ring-one" />
          <div className="hero-ring hero-ring-two" />
          <div className="hero-glow" />
          <Image
            src="/products/iphone-18-pro-max-burgundy.webp"
            alt="iPhone 18 Pro Max Burgundy"
            width={732}
            height={875}
            className="hero-phone"
            priority
          />
          <div className="hero-float hero-float-top">
            <span>Nuevo · eSIM</span>
            <b>iPhone 18 Pro Max</b>
            <small>Desde {cop(4879000)}</small>
          </div>
          <div className="hero-float hero-float-bottom">
            <span>Top ventas</span>
            <b>AirPods Pro 3</b>
            <small>{cop(899990)}</small>
          </div>
          <div className="hero-mini">
            <span>Apple Watch Series 12</span>
            <b>{cop(1599990)}</b>
          </div>
        </div>
      </section>

      <section className="benefit-bar" aria-label="Beneficios FIX MOBIL">
        {benefitItems.map((item) => (
          <div key={item.title} className="benefit-item">
            <span className="benefit-icon"><item.icon size={20} /></span>
            <div>
              <b>{item.title}</b>
              <span>{item.text}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">ENCUENTRA LO QUE BUSCAS</span>
            <h2>Compra por categoría</h2>
            <p>Todo el inventario nuevo, organizado para que encuentres tu equipo rápido.</p>
          </div>
          <Link href="/catalogo" className="text-link">
            Ver catálogo completo <ArrowRight size={15} />
          </Link>
        </div>

        <div className="category-grid">
          {categoryCards.map((category) => (
            <Link key={category.label} href={category.href} className="category-card">
              <span className="category-icon"><category.icon size={24} /></span>
              <b>{category.label}</b>
              <small>{category.count} {category.count === 1 ? 'equipo' : 'equipos'}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="section soft-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">SELECCIÓN FIX MOBIL</span>
            <h2>Los más buscados</h2>
            <p>Precios publicados en pesos colombianos. Disponibilidad sujeta a confirmación.</p>
          </div>
          <Link href="/catalogo" className="text-link">
            Ver todos los precios <ArrowRight size={15} />
          </Link>
        </div>
        <div className="products-grid">
          {featuredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="price-list-section">
        <div className="price-list-inner">
          <div className="price-list-heading">
            <span className="eyebrow light">LISTADO OFICIAL</span>
            <h2>Equipos nuevos</h2>
            <p>
              Los 18 precios de la campaña <b>Precios imperdibles</b>. Toca
              cualquier equipo para ver su ficha completa.
            </p>
          </div>

          <div className="price-list-card">
            <div className="price-list-grid">
              {products.map((product) => (
                <Link key={product.slug} href={`/producto/${product.slug}`} className="price-row">
                  <span className="price-row-name">
                    <span className="color-dot" style={{ background: product.colorHex }} />
                    <span>
                      <b>{product.name}</b>
                      <small>{productSpecLine(product)} · {product.color}</small>
                    </span>
                  </span>
                  <span className="price-row-value">{cop(product.price)}</span>
                </Link>
              ))}
            </div>
          </div>

          <p className="price-list-legal">
            *Aplican términos y condiciones. Precios en COP. Disponibilidad y
            condiciones de financiación sujetas a confirmación.
          </p>
        </div>
      </section>

      <section className="section">
        <PaymentBadges />
      </section>

      <section className="visit-section">
        <div className="visit-copy">
          <span className="eyebrow">VISÍTANOS EN CÚCUTA</span>
          <h2>Tu próximo equipo te espera en River Plaza</h2>
          <p>
            Atención personalizada, equipos disponibles para ver y probar, y
            asesoría para elegir la mejor forma de pago.
          </p>
          <ul className="visit-list">
            <li><MapPin size={18} /><span>{store.address}<br/><small>{store.city}</small></span></li>
            <li><MessageCircle size={18} /><span>WhatsApp {store.phones[0]} · {store.phones[1]}</span></li>
            <li><RefreshCw size={18} /><span>Plan Retoma: entrega tu equipo usado como parte de pago.</span></li>
          </ul>
          <div className="visit-actions">
            <a className="button button-primary" href={store.mapsUrl} target="_blank" rel="noreferrer">
              Cómo llegar <ArrowRight size={17} />
            </a>
            <a
              className="button button-outline"
              href={waLink('Hola FIX MOBIL, quiero visitarlos en River Plaza. ¿Me confirman disponibilidad?')}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={17} /> Hablar con un asesor
            </a>
          </div>
        </div>

        <div className="visit-card">
          <div className="visit-map" aria-hidden>
            <div className="map-lines" />
            <div className="map-road map-road-one" />
            <div className="map-road map-road-two" />
            <div className="map-pin">
              <MapPin size={22} />
              <span>FIX MOBIL<br/><small>Local 229</small></span>
            </div>
          </div>
          <div className="visit-card-info">
            <div>
              <b>FIX MOBIL · River Plaza</b>
              <span>Segundo piso · Local 229</span>
            </div>
            <span className="open-badge">Atención presencial</span>
          </div>
        </div>
      </section>
    </>
  );
}
