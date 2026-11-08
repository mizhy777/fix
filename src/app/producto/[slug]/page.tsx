import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  BadgeCheck,
  Check,
  CreditCard,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Store,
} from 'lucide-react';
import { AddToCartButton } from '@/components/add-to-cart-button';
import { PaymentBadges } from '@/components/payment-badges';
import { ProductCard } from '@/components/product-card';
import { cop } from '@/lib/format';
import {
  productBySlug,
  productSpecLine,
  products,
  relatedProducts,
} from '@/lib/products';
import { productWaLink, store } from '@/lib/store';

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug.get(slug);
  if (!product) return { title: 'Producto no encontrado' };

  const description = `${product.name} ${productSpecLine(product)} ${product.color}. Precio ${cop(
    product.price,
  )} COP en FIX MOBIL. Equipo nuevo, original y con garantía.`;

  return {
    title: `${product.name} ${product.storage ?? product.size ?? ''}`.trim(),
    description,
    openGraph: {
      title: `${product.name} · FIX MOBIL`,
      description,
      images: [{ url: product.image, alt: `${product.name} ${product.color}` }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = productBySlug.get(slug);
  if (!product) notFound();

  const related = relatedProducts(product, 4);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${product.name} ${product.storage ?? product.size ?? ''}`.trim(),
    image: product.image,
    description: product.description,
    brand: { '@type': 'Brand', name: product.brand },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'COP',
      price: product.price,
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: 'FIX MOBIL' },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="product-page">
        <nav className="breadcrumbs product-breadcrumbs" aria-label="Ruta de navegación">
          <Link href="/">Inicio</Link>
          <span>/</span>
          <Link href="/catalogo">Catálogo</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className="product-layout">
          <div className="product-gallery">
            <div className="product-gallery-main">
              {product.badge && <span className="pill red">{product.badge}</span>}
              <Image
                src={product.image}
                alt={`${product.name} ${product.color}`}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="product-gallery-foot">
              <span className="color-dot" style={{ background: product.colorHex }} />
              <span>{product.color}</span>
              <span className="meta-sep">·</span>
              <span>{product.condition}</span>
              <span className="gallery-original"><BadgeCheck size={15} /> Original</span>
            </div>

            <div className="product-gallery-extra">
              <b>Compra con respaldo FIX MOBIL</b>
              <ul>
                <li><BadgeCheck size={15} /> Producto nuevo y original</li>
                <li><ShieldCheck size={15} /> Garantía de 12 meses</li>
                <li><Store size={15} /> Recoge en River Plaza, local 229</li>
              </ul>
              <a
                href={productWaLink(product)}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={15} /> Asesoría personalizada por WhatsApp
              </a>
            </div>
          </div>

          <div className="product-detail">
            <span className="eyebrow">{product.category} · FIX MOBIL</span>
            <h1>{product.name}</h1>
            <p className="product-subtitle">
              {productSpecLine(product)} · {product.color}
            </p>

            <div className="product-price-box">
              <div>
                <small>Precio publicado</small>
                <p className="price price-large">
                  {cop(product.price)} <small>COP</small>
                </p>
              </div>
              <span className="stock-badge">
                <span className="stock-dot" /> {product.stock}
              </span>
            </div>

            <p className="product-description">{product.description}</p>

            <ul className="product-highlights">
              {product.highlights.map((highlight) => (
                <li key={highlight}><Check size={16} /> {highlight}</li>
              ))}
            </ul>

            <div className="product-cta">
              <AddToCartButton slug={product.slug} variant="full" />
              <a
                className="button button-wa full"
                href={productWaLink(product)}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={18} /> Comprar por WhatsApp
              </a>
            </div>

            <div className="product-trust">
              <div><ShieldCheck size={18} /><span><b>Garantía</b>12 meses</span></div>
              <div><Store size={18} /><span><b>Recogida</b>River Plaza 229</span></div>
              <div><CreditCard size={18} /><span><b>Financiación</b>5 medios de pago</span></div>
            </div>

            <div className="product-specs">
              <h2>Especificaciones</h2>
              <dl>
                {product.specs.map((spec) => (
                  <div key={spec.label}>
                    <dt>{spec.label}</dt>
                    <dd>{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <p className="product-disclaimer">
              Precio en pesos colombianos. Aplican términos y condiciones.
              Disponibilidad y condiciones de financiación sujetas a confirmación.
            </p>
          </div>
        </div>
      </section>

      <section className="section soft-section product-payments">
        <PaymentBadges compact />
      </section>

      <section className="section product-related">
        <div className="section-heading">
          <div>
            <span className="eyebrow">TAMBIÉN TE PUEDE INTERESAR</span>
            <h2>Completa tu compra</h2>
          </div>
          <Link className="text-link" href="/catalogo">
            <ArrowLeft size={15} /> Volver al catálogo
          </Link>
        </div>
        <div className="products-grid">
          {related.map((item) => (
            <ProductCard key={item.slug} product={item} />
          ))}
        </div>
      </section>

      <div className="product-mobile-bar">
        <div>
          <small>Precio</small>
          <b>{cop(product.price)}</b>
        </div>
        <a
          className="button button-wa"
          href={productWaLink(product)}
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle size={17} /> WhatsApp
        </a>
      </div>
    </>
  );
}
