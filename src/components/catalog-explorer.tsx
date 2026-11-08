'use client';

import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { ProductCard } from '@/components/product-card';
import {
  categories,
  products,
  type ProductCategory,
} from '@/lib/products';

type Sort = 'featured' | 'price-asc' | 'price-desc' | 'name';

export function CatalogExplorer({
  initialCategory = 'Todos',
  initialQuery = '',
}: {
  initialCategory?: string;
  initialQuery?: string;
}) {
  const [category, setCategory] = useState<string>(
    categories.some((item) => item.name === initialCategory) ? initialCategory : 'Todos',
  );
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState<Sort>('featured');

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const result = products.filter((product) => {
      const matchesCategory =
        category === 'Todos' || product.category === (category as ProductCategory);
      const haystack = [
        product.name,
        product.brand,
        product.category,
        product.storage,
        product.ram,
        product.color,
        product.connectivity,
        product.size,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return matchesCategory && (!normalized || haystack.includes(normalized));
    });

    if (sort === 'price-asc') return [...result].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') return [...result].sort((a, b) => b.price - a.price);
    if (sort === 'name') return [...result].sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [category, query, sort]);

  const hasFilters = category !== 'Todos' || query.trim() !== '' || sort !== 'featured';

  return (
    <div className="catalog-explorer">
      <div className="catalog-controls">
        <div className="catalog-search">
          <Search size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Busca por modelo, color o capacidad"
            aria-label="Buscar en el catálogo"
          />
          {query && (
            <button type="button" onClick={() => setQuery('')} aria-label="Limpiar búsqueda">
              <X size={16} />
            </button>
          )}
        </div>

        <label className="catalog-sort">
          <SlidersHorizontal size={16} />
          <select value={sort} onChange={(event) => setSort(event.target.value as Sort)}>
            <option value="featured">Orden del listado</option>
            <option value="price-asc">Menor precio</option>
            <option value="price-desc">Mayor precio</option>
            <option value="name">Nombre A–Z</option>
          </select>
        </label>
      </div>

      <div className="filter-chips" role="list" aria-label="Filtrar por categoría">
        {categories.map((item) => (
          <button
            type="button"
            key={item.name}
            className={category === item.name ? 'filter-chip active' : 'filter-chip'}
            onClick={() => setCategory(item.name)}
          >
            {item.label}
            <span>
              {item.name === 'Todos'
                ? products.length
                : products.filter((product) => product.category === item.name).length}
            </span>
          </button>
        ))}
      </div>

      <div className="catalog-summary">
        <p>
          <b>{filtered.length}</b> {filtered.length === 1 ? 'equipo' : 'equipos'} en
          inventario
        </p>
        {hasFilters && (
          <button
            type="button"
            className="clear-filters"
            onClick={() => {
              setCategory('Todos');
              setQuery('');
              setSort('featured');
            }}
          >
            Limpiar filtros <X size={14} />
          </button>
        )}
      </div>

      {filtered.length > 0 ? (
        <div className="products-grid">
          {filtered.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div className="catalog-empty">
          <Search size={30} />
          <h3>No encontramos ese equipo</h3>
          <p>Prueba con otra palabra o revisa todo el inventario disponible.</p>
          <button
            type="button"
            className="button button-primary"
            onClick={() => {
              setCategory('Todos');
              setQuery('');
            }}
          >
            Ver todo el inventario
          </button>
        </div>
      )}
    </div>
  );
}
