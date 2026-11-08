import { CreditCard, ShieldCheck } from 'lucide-react';
import { paymentMethods } from '@/lib/store';

export function PaymentBadges({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? 'payment-strip compact' : 'payment-strip'}>
      <div className="payment-strip-head">
        <span className="payment-icon"><CreditCard size={18} /></span>
        <div>
          <b>Financiación disponible</b>
          <small>Sujeta a aprobación y condiciones del proveedor.</small>
        </div>
      </div>
      <div className="payment-badges">
        {paymentMethods.map((method) => (
          <span key={method.name} className="pay-badge">
            <span className="pay-mark" style={{ background: method.accent }}>
              {method.name.charAt(0)}
            </span>
            {method.name}
          </span>
        ))}
        <span className="pay-badge pay-cash">
          <ShieldCheck size={14} /> Efectivo en tienda
        </span>
      </div>
    </div>
  );
}
