import Image from 'next/image';
import Link from 'next/link';
import { AtSign, MapPin, MessageCircle, Phone, ShieldCheck } from 'lucide-react';
import { paymentMethods, store, waLink } from '@/lib/store';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand-block">
          <Image
            src={store.logo}
            alt="FIX MOBIL"
            width={1426}
            height={1103}
            className="footer-logo"
          />
          <p>
            Equipos nuevos, accesorios originales y asesoría personalizada para
            estrenar tecnología sin complicaciones.
          </p>
          <a className="footer-social" href="https://instagram.com/fixmobilcucuta" target="_blank" rel="noreferrer">
            <AtSign size={16} /> {store.instagram}
          </a>
        </div>

        <div>
          <b className="footer-title">Explorar</b>
          <ul className="footer-list">
            <li><Link href="/catalogo">Todo el catálogo</Link></li>
            <li><Link href="/catalogo?categoria=iPhone">iPhone</Link></li>
            <li><Link href="/catalogo?categoria=Samsung">Samsung</Link></li>
            <li><Link href="/catalogo?categoria=Apple+Watch">Apple Watch</Link></li>
            <li><Link href="/catalogo?categoria=Accesorios">Accesorios</Link></li>
            <li><Link href="/plan-retoma">Plan Retoma</Link></li>
          </ul>
        </div>

        <div>
          <b className="footer-title">Visítanos</b>
          <ul className="footer-list footer-contact">
            <li><MapPin size={15} /> {store.address}</li>
            <li>{store.city}</li>
            <li><Phone size={15} /> {store.phones[0]}</li>
            <li><Phone size={15} /> {store.phones[1]}</li>
            <li>
              <a href={waLink('Hola FIX MOBIL, quiero asesoría.')} target="_blank" rel="noreferrer">
                <MessageCircle size={15} /> Escribir por WhatsApp
              </a>
            </li>
          </ul>
        </div>

        <div>
          <b className="footer-title">Compra segura</b>
          <ul className="footer-list">
            <li><Link href="/metodos-de-pago">Métodos de pago</Link></li>
            <li><Link href="/garantias">Garantías</Link></li>
            <li><Link href="/contacto">Contacto</Link></li>
            <li><Link href="/checkout">Cómo finalizar mi compra</Link></li>
          </ul>
          <div className="footer-pay">
            {paymentMethods.map((method) => (
              <span key={method.name}>{method.name}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <small>© {new Date().getFullYear()} FIX MOBIL. Todos los derechos reservados.</small>
        <small className="footer-legal">
          <ShieldCheck size={13} /> Precios en COP. Aplican términos y condiciones.
          Disponibilidad sujeta a confirmación.
        </small>
      </div>
    </footer>
  );
}
