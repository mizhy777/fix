import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, MessageCircle, RefreshCw, ShieldCheck } from 'lucide-react';
import { store, waLink } from '@/lib/store';

export const metadata: Metadata = {
  title: 'Plan Retoma',
  description:
    'Entrega tu teléfono usado como parte de pago para un equipo nuevo en FIX MOBIL.',
};

export default function TradeInPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner">
          <div>
            <nav className="breadcrumbs" aria-label="Ruta de navegación">
              <Link href="/">Inicio</Link><span>/</span><span>Plan Retoma</span>
            </nav>
            <span className="eyebrow light">RENUEVA TU EQUIPO</span>
            <h1>Plan Retoma</h1>
            <p>
              Dale una segunda vida a tu teléfono usado y úsalo como parte de pago
              para estrenar el equipo que quieres.
            </p>
          </div>
          <span className="page-hero-icon"><RefreshCw size={30} /></span>
        </div>
      </section>

      <section className="section narrow-wide">
        <div className="steps-grid trade-steps">
          <div><span>1</span><b>Cuéntanos</b><p>Envíanos el modelo, capacidad, estado y fotos de tu equipo por WhatsApp.</p></div>
          <div><span>2</span><b>Evaluación</b><p>Revisamos el estado físico y funcional para darte una oferta.</p></div>
          <div><span>3</span><b>Estrena</b><p>Si aceptas, aplicamos el valor como parte de pago de tu nuevo equipo.</p></div>
        </div>

        <div className="trade-layout">
          <div className="trade-copy">
            <span className="eyebrow">¿QUÉ EQUIPOS RECIBIMOS?</span>
            <h2>Tu usado puede valer</h2>
            <p>
              Recibimos equipos de las principales marcas, siempre que funcionen y
              estén en condiciones de revisión. La valoración es presencial y no
              automática.
            </p>
            <ul className="check-list">
              <li><CheckCircle2 size={16} /> iPhone y Samsung Galaxy.</li>
              <li><CheckCircle2 size={16} /> Equipos con pantalla y batería funcionales.</li>
              <li><CheckCircle2 size={16} /> Dispositivos sin bloqueo de cuenta.</li>
              <li><CheckCircle2 size={16} /> Accesorios y caja suman valor.</li>
            </ul>
            <a className="button button-primary" href={waLink('Hola FIX MOBIL, quiero solicitar una evaluación para el Plan Retoma. Mi equipo es: ')} target="_blank" rel="noreferrer">
              <MessageCircle size={17} /> Solicitar evaluación
            </a>
          </div>

          <div className="form-card trade-card">
            <span className="eyebrow">EVALUACIÓN SIN COMPROMISO</span>
            <h2>Cotiza tu usado</h2>
            <p>
              Escríbenos con estos datos y un asesor te responde con una oferta
              inicial.
            </p>
            <ul className="trade-data">
              <li>Modelo y capacidad</li>
              <li>Estado de pantalla y batería</li>
              <li>Reparaciones o cambios</li>
              <li>Fotos del equipo</li>
            </ul>
            <a className="button button-wa full" href={waLink('Hola FIX MOBIL, quiero cotizar mi equipo usado. Modelo: ___, capacidad: ___, estado: ___. Adjunto fotos.')} target="_blank" rel="noreferrer">
              <MessageCircle size={17} /> Enviar datos por WhatsApp
            </a>
            <p className="trade-legal">
              <ShieldCheck size={14} /> No envíes contraseñas, códigos de desbloqueo
              ni datos sensibles.
            </p>
          </div>
        </div>

        <div className="notice notice-large">
          <RefreshCw size={20} />
          <div>
            <b>Valoración sujeta a revisión</b>
            <p>
              La oferta depende del estado real del equipo. La evaluación no
              garantiza un valor de compra hasta que un asesor revise el
              dispositivo. {store.address}.
            </p>
          </div>
        </div>

        <div className="inline-actions">
          <Link className="button button-outline" href="/catalogo">
            Ver equipos nuevos <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
