import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, AtSign, MapPin, MessageCircle, Phone } from 'lucide-react';
import { store, waLink } from '@/lib/store';

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Visítanos en C.C. River Plaza, segundo piso, local 229, o escríbenos por WhatsApp.',
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner">
          <div>
            <nav className="breadcrumbs" aria-label="Ruta de navegación">
              <Link href="/">Inicio</Link><span>/</span><span>Contacto</span>
            </nav>
            <span className="eyebrow light">ESTAMOS PARA AYUDARTE</span>
            <h1>Hablemos de tecnología</h1>
            <p>
              Visítanos en River Plaza o escríbenos por WhatsApp. Te ayudamos a
              elegir tu próximo equipo y la mejor forma de pago.
            </p>
          </div>
          <span className="page-hero-icon"><MessageCircle size={30} /></span>
        </div>
      </section>

      <section className="section">
        <div className="contact-layout">
          <div className="contact-cards">
            <article className="contact-card">
              <span><MapPin size={20} /></span>
              <div>
                <b>Visítanos</b>
                <p>{store.address}<br/>{store.city}</p>
                <a href={store.mapsUrl} target="_blank" rel="noreferrer">Cómo llegar <ArrowRight size={14} /></a>
              </div>
            </article>
            <article className="contact-card">
              <span><Phone size={20} /></span>
              <div>
                <b>Llámanos</b>
                <p>{store.phones[0]}<br/>{store.phones[1]}</p>
              </div>
            </article>
            <article className="contact-card">
              <span><MessageCircle size={20} /></span>
              <div>
                <b>WhatsApp</b>
                <p>Atención personalizada para compras, disponibilidad y pagos.</p>
                <a href={waLink('Hola FIX MOBIL, quiero asesoría.')} target="_blank" rel="noreferrer">Escribir ahora <ArrowRight size={14} /></a>
              </div>
            </article>
            <article className="contact-card">
              <span><AtSign size={20} /></span>
              <div>
                <b>Instagram</b>
                <p>{store.instagram}</p>
                <a href="https://instagram.com/fixmobilcucuta" target="_blank" rel="noreferrer">Ver perfil <ArrowRight size={14} /></a>
              </div>
            </article>
          </div>

          <div className="contact-map">
            <div className="map-lines" />
            <div className="map-road map-road-one" />
            <div className="map-road map-road-two" />
            <div className="map-pin">
              <MapPin size={22} />
              <span>FIX MOBIL<br/><small>Local 229 · segundo piso</small></span>
            </div>
            <div className="contact-map-foot">
              <b>FIX MOBIL · River Plaza</b>
              <a href={store.mapsUrl} target="_blank" rel="noreferrer">Abrir en Google Maps <ArrowRight size={14} /></a>
            </div>
          </div>
        </div>

        <div className="cta-band inline">
          <div>
            <h2>¿Buscas un equipo específico?</h2>
            <p>Cuéntanos qué modelo necesitas y te confirmamos disponibilidad.</p>
          </div>
          <a className="button button-primary" href={waLink('Hola FIX MOBIL, estoy buscando un equipo específico. ¿Me ayudan?')} target="_blank" rel="noreferrer">
            <MessageCircle size={17} /> Preguntar por disponibilidad
          </a>
        </div>
      </section>
    </>
  );
}
