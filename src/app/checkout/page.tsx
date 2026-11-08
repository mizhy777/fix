import type { Metadata } from 'next';
import { CheckoutForm } from '@/components/checkout-form';

export const metadata: Metadata = {
  title: 'Finalizar compra',
  description: 'Envía tu pedido a FIX MOBIL y confirma disponibilidad con un asesor.',
};

export default function CheckoutPage() {
  return <CheckoutForm />;
}
