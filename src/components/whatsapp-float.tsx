import { MessageCircle } from 'lucide-react';
import { waLink } from '@/lib/store';

export function WhatsAppFloat() {
  return (
    <a
      className="wa-float"
      href={waLink('Hola FIX MOBIL, vi los precios en la página y quiero asesoría.')}
      target="_blank"
      rel="noreferrer"
      aria-label="Escribir a FIX MOBIL por WhatsApp"
    >
      <MessageCircle size={22} />
      <span>Asesoría</span>
    </a>
  );
}
