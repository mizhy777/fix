import type { MetadataRoute } from 'next';
import { products } from '@/lib/products';

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.URL ||
  'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/catalogo',
    '/carrito',
    '/checkout',
    '/metodos-de-pago',
    '/garantias',
    '/contacto',
    '/plan-retoma',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.7,
  }));

  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/producto/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
