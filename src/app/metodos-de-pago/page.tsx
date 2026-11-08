import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CreditCard, MessageCircle, ShieldCheck, Store } from 'lucide-react';
import { PaymentBadges } from '@/components/payment-badges';
import { paymentMethods, store, waLink } from '@/lib/store';

export const metadata: Metadata = {
  title: 'Métodos de pago',
  description:
    'Efectivo en tienda, Maxcrédito, SU+Pay, Addi, Sistecrédito, Banco de Bogotá, Plan Retoma y apartados en FIX MOBIL.',
};

export default function PaymentsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner">
          <div>
            <nav className="breadcrumbs" aria-label="Ruta de navegación">
              <Link href="/">Inicio</Link><span>/</span><span>Métodos de pago</span>
            </nav>
            <span className="eyebrow light">COMPRA CON INFORMACIÓN CLARA</span>
            <h1>Métodos de pago</h1>
            <p>
              Elige la forma de pago que mejor se adapte a ti. La aprobación y las
              condiciones se confirman con un asesor antes de cerrar la compra.
            </p>
          </div>
          <span className="page-hero-icon"><CreditCard size={30} /></span>
        </div>
      </section>

      <section className="section">
        <PaymentBadges />

        <div className="info-grid">
          {paymentMethods.map((method, index) => (
            <article key={method.name} className="info-card">
              <span className="info-number">{String(index + 1).padStart(2, '0')}</span>
              <h2>{method.name}</h2>
              <p>{method.detail}</p>
            </article>
          ))}
          <article className="info-card">
            <span className="info-number">06</span>
            <h2>Efectivo en tienda</h2>
            <p>Pago presencial en C.C. River Plaza, segundo piso, local 229.</p>
          </article>
          <article className="info-card">
            <span className="info-number">07</span>
            <h2>Plan Retoma</h2>
            <p>Entrega tu equipo usado como parte de pago, sujeto a evaluación.</p>
          </article>
          <article className="info-card">
            <span className="info-number">08</span>
            <h2>Apartado</h2>
            <p>Abono inicial desde $100.000 COP y plazo inicial de 15 días.</p>
          </article>
        </div>

        <div className="notice notice-large">
          <ShieldCheck size={20} />
          <div>
            <b>Importante</b>
            <p>
              No se realizan cobros en línea desde esta página. La disponibilidad,
              el valor final, los recargos de financiación y las condiciones de
              cada proveedor se confirman con el equipo de FIX MOBIL antes de
              cualquier pago.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div>
          <span className="eyebrow light">¿TIENES DUDAS?</span>
          <h2>Te ayudamos a elegir la mejor forma de pago</h2>
          <p>Escríbenos y un asesor revisa las opciones disponibles para tu compra.</p>
        </div>
        <div className="cta-band-actions">
          <a className="button button-primary" href={waLink('Hola FIX MOBIL, quiero saber qué métodos de pago aplican para mi compra.')} target="_blank" rel="noreferrer">
            <MessageCircle size={17} /> WhatsApp
          </a>
          <a className="button button-ghost" href={store.mapsUrl} target="_blank" rel="noreferrer">
            <Store size={17} /> Visítanos
          </a>
        </div>
      </section>
    </>
  );
}
