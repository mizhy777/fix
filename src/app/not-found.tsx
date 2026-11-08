import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="section narrow page-section empty-state">
      <span className="empty-icon"><Search size={34} /></span>
      <span className="eyebrow">ERROR 404</span>
      <h1>No encontramos esta página</h1>
      <p>
        El enlace puede haber cambiado o el producto ya no está publicado.
        Explora el inventario actualizado de FIX MOBIL.
      </p>
      <div className="empty-actions">
        <Link className="button button-primary" href="/catalogo">
          Ver inventario <ArrowRight size={17} />
        </Link>
        <Link className="button button-outline" href="/">
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
