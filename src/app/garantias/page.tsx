import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, MessageCircle, ShieldCheck, XCircle } from 'lucide-react';
import { store, waLink } from '@/lib/store';

export const metadata: Metadata = {
  title: 'Garantías y condiciones',
  description:
    'Información de garantía, cobertura y condiciones de compra de equipos en FIX MOBIL.',
};

export default function WarrantyPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner">
          <div>
            <nav className="breadcrumbs" aria-label="Ruta de navegación">
              <Link href="/">Inicio</Link><span>/</span><span>Garantías</span>
            </nav>
            <span className="eyebrow light">INFORMACIÓN DE COMPRA</span>
            <h1>Garantías y condiciones</h1>
            <p>
              Tu compra está respaldada por FIX MOBIL. Aquí encuentras el resumen
              de cobertura y el paso a paso para solicitar soporte.
            </p>
          </div>
          <span className="page-hero-icon"><ShieldCheck size={30} /></span>
        </div>
      </section>

      <section className="section narrow-wide">
        <div className="info-grid two">
          <article className="info-card">
            <span className="info-number">01</span>
            <h2>Garantía de 12 meses</h2>
            <p>
              Los equipos nuevos cuentan con 12 meses de garantía por defectos de
              fabricación, sujeta a la revisión técnica y a las condiciones del
              fabricante.
            </p>
          </article>
          <article className="info-card">
            <span className="info-number">02</span>
            <h2>Accesorios originales</h2>
            <p>
              Los accesorios originales cuentan con garantía por defectos de
              fabricación. La cobertura se confirma según el producto y el
              comprobante de compra.
            </p>
          </article>
        </div>

        <div className="warranty-columns">
          <div className="warranty-box">
            <h2><CheckCircle2 size={20} /> ¿Qué cubre?</h2>
            <ul>
              <li>Defectos de fabricación del equipo.</li>
              <li>Fallas de hardware no atribuibles al uso.</li>
              <li>Revisión técnica por parte del servicio autorizado.</li>
              <li>Reparación o reemplazo según el diagnóstico.</li>
            </ul>
          </div>
          <div className="warranty-box">
            <h2><XCircle size={20} /> ¿Qué no cubre?</h2>
            <ul>
              <li>Golpes, caídas, humedad o daño por líquidos.</li>
              <li>Manipulación por terceros no autorizados.</li>
              <li>Desgaste normal de batería o accesorios.</li>
              <li>Pérdida, robo o uso indebido del equipo.</li>
            </ul>
          </div>
        </div>

        <div className="steps">
          <h2>¿Cómo solicito mi garantía?</h2>
          <div className="steps-grid">
            <div><span>1</span><b>Escríbenos</b><p>Envía tu nombre, comprobante y una descripción de la falla por WhatsApp.</p></div>
            <div><span>2</span><b>Revisión</b><p>Un asesor agenda la revisión técnica y te explica el proceso.</p></div>
            <div><span>3</span><b>Solución</b><p>Según el diagnóstico, se repara o se reemplaza el equipo.</p></div>
          </div>
        </div>

        <div className="notice notice-large">
          <ShieldCheck size={20} />
          <div>
            <b>Condiciones generales</b>
            <p>
              Esta información es un resumen. La garantía definitiva se entrega
              con el comprobante de compra y puede variar según el producto. Antes
              de publicar, FIX MOBIL debe validar sus políticas con la normativa
              colombiana de protección al consumidor.
            </p>
          </div>
        </div>

        <div className="inline-actions">
          <a className="button button-primary" href={waLink('Hola FIX MOBIL, necesito información sobre la garantía de mi compra.')} target="_blank" rel="noreferrer">
            <MessageCircle size={17} /> Solicitar garantía
          </a>
          <Link className="button button-outline" href="/catalogo">
            Ver equipos <ArrowRight size={17} />
          </Link>
          <span className="inline-address">{store.address}</span>
        </div>
      </section>
    </>
  );
}
