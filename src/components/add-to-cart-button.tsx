'use client';

import { useState } from 'react';
import { Check, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/cart';

type Props = {
  slug: string;
  variant?: 'icon' | 'full' | 'soft';
  label?: string;
};

export function AddToCartButton({
  slug,
  variant = 'icon',
  label = 'Agregar a mi cotización',
}: Props) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    add(slug);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  if (variant === 'icon') {
    return (
      <button
        type="button"
        className="icon-cart-button"
        onClick={handleClick}
        aria-label={label}
        title={label}
      >
        {added ? <Check size={18} /> : <Plus size={18} />}
      </button>
    );
  }

  return (
    <button
      type="button"
      className={variant === 'soft' ? 'button button-soft full' : 'button button-primary full'}
      onClick={handleClick}
    >
      {added ? <Check size={18} /> : <ShoppingBag size={18} />}
      {added ? 'Agregado a tu cotización' : label}
    </button>
  );
}
