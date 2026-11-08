import type { Product } from './products';

export const store = {
  name: 'FIX MOBIL',
  tagline: 'Tecnología a tu alcance',
  address: 'C.C. River Plaza, segundo piso, local 229',
  city: 'Cúcuta, Norte de Santander',
  phones: ['310 644 5564', '313 887 5534'],
  instagram: '@fixmobilcucuta',
  logo: '/brand/fix-mobil-blanco.png',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=C.C.+River+Plaza+C%C3%BAcuta',
};

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573106445564';

export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function productWaLink(product: Product) {
  return waLink(
    `Hola FIX MOBIL. Me interesa el ${product.name} ${product.storage ?? ''} ${
      product.color
    } que vi en la página. Precio publicado: ${new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(product.price)}. ¿Me confirman disponibilidad?`,
  );
}

export const paymentMethods = [
  {
    name: 'Maxcrédito',
    detail: 'Financiación con aprobación del proveedor.',
    accent: '#0b3bd6',
  },
  {
    name: 'SU+Pay',
    detail: 'Compra ahora y paga después, sujeta a estudio.',
    accent: '#0f766e',
  },
  {
    name: 'Addi',
    detail: 'Cuotas flexibles con aprobación en línea.',
    accent: '#7c3aed',
  },
  {
    name: 'Sistecrédito',
    detail: 'Crédito para compra de tecnología.',
    accent: '#b91c1c',
  },
  {
    name: 'Banco de Bogotá',
    detail: 'Medios de pago y financiación bancaria.',
    accent: '#1d4ed8',
  },
];

export const benefits = [
  {
    title: 'Equipos originales',
    text: 'Productos nuevos y sellados, con garantía.',
  },
  {
    title: 'Compra segura',
    text: 'Atención presencial en River Plaza y asesoría por WhatsApp.',
  },
  {
    title: 'Financiación',
    text: 'Maxcrédito, SU+Pay, Addi, Sistecrédito y Banco de Bogotá.',
  },
  {
    title: 'Entrega inmediata',
    text: 'Recoge tu equipo en el local 229 el mismo día.',
  },
];
