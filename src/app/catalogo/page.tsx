import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MapPin, ShieldCheck } from 'lucide-react';
import { CatalogExplorer } from '@/components/catalog-explorer';
import { products } from '@/lib/products';
import { store } from '@/lib/store';

export const metadata: Metadata = {
  title: 'Catálogo y precios',
  description:
    'Listado completo de iPhone, Samsung Galaxy, iPad, Apple Watch, AirPods y accesorios originales disponibles en FIX MOBIL.',
};

type CatalogParams = {
  categoria?: string;
  q?: string;
  tipo?: string;
};

function resolveCategory(params: CatalogParams) {
  if (params.categoria) return params.categoria;
  if (params.tipo === 'iphone') return 'iPhone';
  if (params.tipo === 'android') return 'Samsung';
  if (params.tipo === 'accesorios') return 'Accesorios';
  return 'Todos';
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<CatalogParams>;
}) {
  const params = await searchParams;

  return (
    <>
      <section className="catalog-hero">
        <div className="catalog-hero-inner">
          <div>
            <nav className="breadcrumbs" aria-label="Ruta de navegación">
              <Link href="/">Inicio</Link>
              <span>/</span>
              <span>Catálogo</span>
            </nav>
            <span className="eyebrow light">PRECIOS IMPERDIBLES</span>
            <h1>Inventario FIX MOBIL</h1>
            <p>
              {products.length} equipos nuevos y accesorios originales con precios
              publicados. Filtra por categoría o busca tu modelo favorito.
            </p>
          </div>
          <div className="catalog-hero-facts">
            <div><b>{products.length}</b><span>productos</span></div>
            <div><b>12</b><span>meses de garantía</span></div>
            <div><MapPin size={18} /><span>River Plaza · Local 229</span></div>
          </div>
        </div>
      </section>

      <section className="section catalog-section">
        <div className="catalog-note">
          <ShieldCheck size={18} />
          <p>
            Precios en COP. La disponibilidad se confirma antes de cerrar la
            compra. <Link href="/metodos-de-pago">Consulta los medios de pago <ArrowRight size={14} /></Link>
          </p>
          <span>{store.address}</span>
        </div>
        <CatalogExplorer
          initialCategory={resolveCategory(params)}
          initialQuery={params.q ?? ''}
        />
      </section>
    </>
  );
}
