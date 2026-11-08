'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Store,
} from 'lucide-react';
import { useCart } from '@/lib/cart';
import { cop } from '@/lib/format';
import { productSpecLine } from '@/lib/products';
import { store, waLink } from '@/lib/store';

type Fulfillment = 'pickup' | 'shipping';

export function CheckoutForm() {
  const { detailed, count, total, ready } = useCart();
  const [fulfillment, setFulfillment] = useState<Fulfillment>('pickup');
  const [payment, setPayment] = useState('Efectivo en tienda');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    city: 'Cúcuta',
    address: '',
    notes: '',
  });
  const [accepted, setAccepted] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  if (!ready) {
    return <section className="section page-section"><div className="cart-loading" /></section>;
  }

  if (detailed.length === 0) {
    return (
      <section className="section narrow page-section empty-state">
        <span className="empty-icon"><ShoppingBag size={34} /></span>
        <span className="eyebrow">FINALIZAR COMPRA</span>
        <h1>Tu cotización está vacía</h1>
        <p>Agrega al menos un equipo para continuar con tus datos.</p>
        <Link className="button button-primary" href="/catalogo">
          Ver inventario <ArrowRight size={17} />
        </Link>
      </section>
    );
  }

  function update(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    setError('');

    if (form.name.trim().length < 3) {
      setError('Escribe tu nombre completo.');
      return;
    }
    if (form.phone.replace(/\D/g, '').length < 7) {
      setError('Escribe un número de teléfono válido.');
      return;
    }
    if (fulfillment === 'shipping' && form.address.trim().length < 8) {
      setError('Escribe la dirección de entrega.');
      return;
    }
    if (!accepted) {
      setError('Debes aceptar las condiciones de la cotización.');
      return;
    }

    const lines = [
      'Hola FIX MOBIL. Quiero confirmar esta compra:',
      '',
      ...detailed.map(
        ({ item, product }) =>
          `• ${item.qty} × ${product.name} ${productSpecLine(product)} ${product.color} — ${cop(
            product.price * item.qty,
          )}`,
      ),
      '',
      `Total publicado: ${cop(total)}`,
      '',
      `Nombre: ${form.name}`,
      `Teléfono: ${form.phone}`,
      `Entrega: ${fulfillment === 'pickup' ? 'Recoger en tienda (River Plaza, local 229)' : `Envío nacional a ${form.city} — ${form.address}`}`,
      `Método de pago: ${payment}`,
      form.notes ? `Notas: ${form.notes}` : '',
      '',
      'Entiendo que la disponibilidad y el valor final se confirman con un asesor.',
    ].filter(Boolean);

    window.open(waLink(lines.join('\n')), '_blank', 'noopener,noreferrer');
    setSent(true);
  }

  return (
    <>
      <section className="cart-hero checkout-hero">
        <div className="cart-hero-inner">
          <div>
            <nav className="breadcrumbs" aria-label="Ruta de navegación">
              <Link href="/">Inicio</Link><span>/</span>
              <Link href="/carrito">Cotización</Link><span>/</span><span>Datos</span>
            </nav>
            <span className="eyebrow light">ÚLTIMO PASO</span>
            <h1>Finaliza tu compra</h1>
            <p>Déjanos tus datos y envía el resumen a un asesor. No se cobra nada en línea.</p>
          </div>
          <span className="cart-hero-icon"><ShieldCheck size={28} /></span>
        </div>
      </section>

      <section className="section cart-section">
        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={submit}>
            <div className="form-block">
              <div className="form-block-head">
                <span>1</span>
                <div><h2>Tus datos</h2><p>Para contactarte y confirmar la compra.</p></div>
              </div>
              <div className="form-grid">
                <label>
                  Nombre completo
                  <input
                    value={form.name}
                    onChange={(event) => update('name', event.target.value)}
                    placeholder="Ej. María Pérez"
                    autoComplete="name"
                    required
                  />
                </label>
                <label>
                  Teléfono / WhatsApp
                  <input
                    value={form.phone}
                    onChange={(event) => update('phone', event.target.value)}
                    placeholder="Ej. 310 000 0000"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                  />
                </label>
              </div>
            </div>

            <div className="form-block">
              <div className="form-block-head">
                <span>2</span>
                <div><h2>Entrega</h2><p>Elige cómo quieres recibir tus equipos.</p></div>
              </div>
              <div className="choice-grid">
                <button
                  type="button"
                  className={fulfillment === 'pickup' ? 'choice-card active' : 'choice-card'}
                  onClick={() => setFulfillment('pickup')}
                >
                  <Store size={20} />
                  <b>Recoger en tienda</b>
                  <small>River Plaza, local 229</small>
                </button>
                <button
                  type="button"
                  className={fulfillment === 'shipping' ? 'choice-card active' : 'choice-card'}
                  onClick={() => setFulfillment('shipping')}
                >
                  <Truck size={20} />
                  <b>Envío nacional</b>
                  <small>Costo confirmado por el asesor</small>
                </button>
              </div>

              {fulfillment === 'shipping' && (
                <div className="form-grid shipping-fields">
                  <label>
                    Ciudad / municipio
                    <input
                      value={form.city}
                      onChange={(event) => update('city', event.target.value)}
                      autoComplete="address-level2"
                    />
                  </label>
                  <label>
                    Dirección completa
                    <input
                      value={form.address}
                      onChange={(event) => update('address', event.target.value)}
                      placeholder="Calle, carrera, número, barrio"
                      autoComplete="street-address"
                    />
                  </label>
                </div>
              )}
            </div>

            <div className="form-block">
              <div className="form-block-head">
                <span>3</span>
                <div><h2>Forma de pago</h2><p>Sujeta a aprobación del proveedor.</p></div>
              </div>
              <div className="payment-options">
                {[
                  'Efectivo en tienda',
                  'Addi',
                  'Sistecrédito',
                  'SU+Pay',
                  'Maxcrédito',
                  'Plan Retoma',
                  'Apartado',
                ].map((option) => (
                  <label key={option} className={payment === option ? 'payment-option active' : 'payment-option'}>
                    <input
                      type="radio"
                      name="payment"
                      value={option}
                      checked={payment === option}
                      onChange={() => setPayment(option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
              <label className="form-textarea">
                Notas para el asesor (opcional)
                <textarea
                  value={form.notes}
                  onChange={(event) => update('notes', event.target.value)}
                  rows={3}
                  placeholder="Color preferido, horario de contacto, detalles de la entrega..."
                />
              </label>
            </div>

            <label className="terms-check">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(event) => setAccepted(event.target.checked)}
              />
              <span>
                Acepto que la disponibilidad, el precio final y las condiciones de
                financiación se confirman con un asesor de FIX MOBIL.
              </span>
            </label>

            {error && <p className="error form-error">{error}</p>}

            <button type="submit" className="button button-primary full">
              {sent ? <CheckCircle2 size={18} /> : <MessageCircle size={18} />}
              {sent ? 'Enviar de nuevo por WhatsApp' : 'Enviar pedido por WhatsApp'}
            </button>

            {sent && (
              <p className="sent-note">
                <CheckCircle2 size={16} /> Se abrió WhatsApp con tu pedido. Si no
                se abrió, <a href={waLink('Hola FIX MOBIL, quiero confirmar mi compra.')} target="_blank" rel="noreferrer">haz clic aquí</a>.
              </p>
            )}
          </form>

          <aside className="checkout-summary">
            <span className="eyebrow">TU PEDIDO</span>
            <h2>{count} {count === 1 ? 'producto' : 'productos'}</h2>
            <div className="checkout-items">
              {detailed.map(({ item, product }) => (
                <div key={product.slug} className="checkout-item">
                  <Image src={product.image} alt={product.name} width={76} height={76} />
                  <div>
                    <b>{product.name}</b>
                    <span>{productSpecLine(product)} · {product.color}</span>
                    <small>{item.qty} × {cop(product.price)}</small>
                  </div>
                  <b>{cop(product.price * item.qty)}</b>
                </div>
              ))}
            </div>
            <div className="cart-summary-total">
              <span>Total publicado</span>
              <b>{cop(total)}</b>
            </div>
            <div className="checkout-info">
              <p><Store size={15} /> {store.address}</p>
              <p><ShieldCheck size={15} /> No se realiza ningún cobro en línea.</p>
            </div>
            <Link className="text-link" href="/carrito">
              <ArrowRight size={14} /> Editar mi cotización
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
