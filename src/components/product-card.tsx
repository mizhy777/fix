import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { AddToCartButton } from '@/components/add-to-cart-button';
import { cop } from '@/lib/format';
import { productSpecLine, type Product } from '@/lib/products';

function badgeClass(badge?: string) {
  if (!badge) return 'pill purple';
  if (badge.toLowerCase().includes('precio')) return 'pill red';
  if (badge.toLowerCase().includes('buscado') || badge.toLowerCase().includes('ventas')) {
    return 'pill gold';
  }
  if (badge.toLowerCase().includes('nuevo')) return 'pill blue';
  return 'pill purple';
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <Link href={`/producto/${product.slug}`} className="product-media" aria-label={product.name}>
        {product.badge && (
          <span className={badgeClass(product.badge)}>{product.badge}</span>
        )}
        <span className="product-category">{product.category}</span>
        <Image
          src={product.image}
          alt={`${product.name} ${product.color}`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1100px) 33vw, 25vw"
        />
      </Link>

      <div className="product-info">
        <div className="product-meta">
          <span className="color-dot" style={{ background: product.colorHex }} />
          <span>{product.color}</span>
          <span className="meta-sep">·</span>
          <span>{productSpecLine(product)}</span>
        </div>

        <h3>
          <Link href={`/producto/${product.slug}`}>{product.name}</Link>
        </h3>

        <p className="stock-line">
          <span className="stock-dot" /> {product.stock}
        </p>

        <div className="product-bottom">
          <p className="price">
            {cop(product.price)}
            <small> COP</small>
          </p>
          <div className="product-actions">
            <Link
              href={`/producto/${product.slug}`}
              className="product-detail-link"
              aria-label={`Ver ficha de ${product.name}`}
            >
              Ver ficha <ArrowUpRight size={14} />
            </Link>
            <AddToCartButton slug={product.slug} />
          </div>
        </div>
      </div>
    </article>
  );
}
