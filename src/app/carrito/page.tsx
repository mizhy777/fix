import type { Metadata } from 'next';
import { CartView } from '@/components/cart-view';

export const metadata: Metadata = {
  title: 'Mi cotización',
  description: 'Revisa los equipos seleccionados y envía tu cotización a FIX MOBIL.',
};

export default function CartPage() {
  return <CartView />;
}
