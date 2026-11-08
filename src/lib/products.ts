export type ProductCategory =
  | 'iPhone'
  | 'Samsung'
  | 'iPad'
  | 'Apple Watch'
  | 'Audio'
  | 'Accesorios';

export type ProductType = 'phone' | 'tablet' | 'watch' | 'audio' | 'accessory';

export type Product = {
  slug: string;
  name: string;
  brand: 'Apple' | 'Samsung';
  category: ProductCategory;
  type: ProductType;
  condition: 'Nuevo';
  storage?: string;
  connectivity?: string;
  ram?: string;
  size?: string;
  color: string;
  colorHex: string;
  price: number;
  badge?: string;
  image: string;
  stock: string;
  featured?: boolean;
  description: string;
  highlights: string[];
  specs: { label: string; value: string }[];
};

/**
 * Inventario publicado en la campaña "Precios imperdibles" de FIX MOBIL.
 * Los precios están en pesos colombianos (COP) y son los del listado oficial.
 */
export const products: Product[] = [
  {
    slug: 'iphone-18-pro-max-512gb-burgundy',
    name: 'iPhone 18 Pro Max',
    brand: 'Apple',
    category: 'iPhone',
    type: 'phone',
    condition: 'Nuevo',
    storage: '512 GB',
    connectivity: 'eSIM',
    color: 'Burgundy',
    colorHex: '#6b2c33',
    price: 6099000,
    badge: 'Nuevo',
    image: '/products/iphone-18-pro-max-burgundy.webp',
    stock: 'Disponible en tienda',
    featured: true,
    description:
      'El iPhone más avanzado de Apple. Acabado premium, pantalla Super Retina XDR y un sistema de cámaras Pro para fotografía y video de nivel profesional.',
    highlights: [
      'Pantalla Super Retina XDR de 6.9"',
      'Chip A20 Pro de última generación',
      'Sistema de cámaras Pro de 48 MP',
      'Face ID y resistencia al agua IP68',
    ],
    specs: [
      { label: 'Pantalla', value: '6.9" Super Retina XDR' },
      { label: 'Chip', value: 'A20 Pro' },
      { label: 'Cámara', value: 'Sistema Pro de 48 MP' },
      { label: 'Conectividad', value: 'eSIM' },
      { label: 'Seguridad', value: 'Face ID' },
      { label: 'Acabado', value: 'Titanio · Burgundy' },
    ],
  },
  {
    slug: 'iphone-18-pro-max-512gb-silver',
    name: 'iPhone 18 Pro Max',
    brand: 'Apple',
    category: 'iPhone',
    type: 'phone',
    condition: 'Nuevo',
    storage: '512 GB',
    connectivity: 'eSIM',
    color: 'Silver',
    colorHex: '#d8dde4',
    price: 5799000,
    badge: 'Nuevo',
    image: '/products/iphone-18-pro-max-silver.webp',
    stock: 'Últimas unidades',
    featured: true,
    description:
      'La versión de 512 GB del iPhone 18 Pro Max en acabado Silver. Potencia, cámara Pro y la experiencia completa de iOS en un solo equipo.',
    highlights: [
      'Pantalla Super Retina XDR de 6.9"',
      'Chip A20 Pro',
      'Cámara Pro de 48 MP',
      'eSIM y carga rápida USB-C',
    ],
    specs: [
      { label: 'Pantalla', value: '6.9" Super Retina XDR' },
      { label: 'Chip', value: 'A20 Pro' },
      { label: 'Cámara', value: 'Sistema Pro de 48 MP' },
      { label: 'Conectividad', value: 'eSIM' },
      { label: 'Seguridad', value: 'Face ID' },
      { label: 'Acabado', value: 'Titanio · Silver' },
    ],
  },
  {
    slug: 'iphone-18-pro-max-256gb-black',
    name: 'iPhone 18 Pro Max',
    brand: 'Apple',
    category: 'iPhone',
    type: 'phone',
    condition: 'Nuevo',
    storage: '256 GB',
    connectivity: 'eSIM',
    color: 'Black',
    colorHex: '#25282d',
    price: 5349000,
    badge: 'Más buscado',
    image: '/products/iphone-18-pro-max-black.webp',
    stock: 'Disponible en tienda',
    featured: true,
    description:
      'El equilibrio perfecto entre capacidad y precio. iPhone 18 Pro Max de 256 GB en Black, con todo el poder de la gama Pro.',
    highlights: [
      'Pantalla Super Retina XDR de 6.9"',
      'Chip A20 Pro',
      'Cámara Pro de 48 MP',
      'Acabado Titanio Black',
    ],
    specs: [
      { label: 'Pantalla', value: '6.9" Super Retina XDR' },
      { label: 'Chip', value: 'A20 Pro' },
      { label: 'Cámara', value: 'Sistema Pro de 48 MP' },
      { label: 'Conectividad', value: 'eSIM' },
      { label: 'Seguridad', value: 'Face ID' },
      { label: 'Acabado', value: 'Titanio · Black' },
    ],
  },
  {
    slug: 'iphone-18-pro-max-256gb-glacier',
    name: 'iPhone 18 Pro Max',
    brand: 'Apple',
    category: 'iPhone',
    type: 'phone',
    condition: 'Nuevo',
    storage: '256 GB',
    connectivity: 'eSIM',
    color: 'Glacier',
    colorHex: '#b6c1d1',
    price: 4879000,
    badge: 'Precio imperdible',
    image: '/products/iphone-18-pro-max-glacier.webp',
    stock: 'Últimas unidades',
    featured: true,
    description:
      'El precio más bajo del iPhone 18 Pro Max en nuestro listado. 256 GB, eSIM y el exclusivo acabado Glacier.',
    highlights: [
      'Pantalla Super Retina XDR de 6.9"',
      'Chip A20 Pro',
      'Cámara Pro de 48 MP',
      'Acabado Glacier exclusivo',
    ],
    specs: [
      { label: 'Pantalla', value: '6.9" Super Retina XDR' },
      { label: 'Chip', value: 'A20 Pro' },
      { label: 'Cámara', value: 'Sistema Pro de 48 MP' },
      { label: 'Conectividad', value: 'eSIM' },
      { label: 'Seguridad', value: 'Face ID' },
      { label: 'Acabado', value: 'Titanio · Glacier' },
    ],
  },
  {
    slug: 'iphone-17-pro-max-256gb',
    name: 'iPhone 17 Pro Max',
    brand: 'Apple',
    category: 'iPhone',
    type: 'phone',
    condition: 'Nuevo',
    storage: '256 GB',
    connectivity: 'eSIM',
    color: 'Cosmic Orange',
    colorHex: '#cf5d28',
    price: 4099990,
    badge: 'Top ventas',
    image: '/products/iphone-17-pro-max.webp',
    stock: 'Disponible en tienda',
    featured: true,
    description:
      'El iPhone 17 Pro Max combina el chip A19 Pro, cámara Pro de 48 MP y una pantalla ProMotion de 6.9". Un equipo hecho para crear.',
    highlights: [
      'Pantalla ProMotion de 6.9"',
      'Chip A19 Pro',
      'Cámara Pro de 48 MP con teleobjetivo',
      'eSIM y acabado Cosmic Orange',
    ],
    specs: [
      { label: 'Pantalla', value: '6.9" ProMotion' },
      { label: 'Chip', value: 'A19 Pro' },
      { label: 'Cámara', value: 'Pro de 48 MP' },
      { label: 'Conectividad', value: 'eSIM' },
      { label: 'Seguridad', value: 'Face ID' },
      { label: 'Acabado', value: 'Aluminio · Cosmic Orange' },
    ],
  },
  {
    slug: 'iphone-17-pro-256gb',
    name: 'iPhone 17 Pro',
    brand: 'Apple',
    category: 'iPhone',
    type: 'phone',
    condition: 'Nuevo',
    storage: '256 GB',
    connectivity: 'eSIM',
    color: 'Deep Blue',
    colorHex: '#2a3a52',
    price: 3949990,
    badge: 'Nuevo',
    image: '/products/iphone-17-pro.webp',
    stock: 'Disponible en tienda',
    featured: true,
    description:
      'Compacto por fuera, Pro por dentro. iPhone 17 Pro con chip A19 Pro, cámara de 48 MP y pantalla ProMotion de 6.3".',
    highlights: [
      'Pantalla ProMotion de 6.3"',
      'Chip A19 Pro',
      'Cámara Pro de 48 MP',
      'eSIM y carga rápida USB-C',
    ],
    specs: [
      { label: 'Pantalla', value: '6.3" ProMotion' },
      { label: 'Chip', value: 'A19 Pro' },
      { label: 'Cámara', value: 'Pro de 48 MP' },
      { label: 'Conectividad', value: 'eSIM' },
      { label: 'Seguridad', value: 'Face ID' },
      { label: 'Acabado', value: 'Aluminio · Deep Blue' },
    ],
  },
  {
    slug: 'iphone-17-256gb',
    name: 'iPhone 17',
    brand: 'Apple',
    category: 'iPhone',
    type: 'phone',
    condition: 'Nuevo',
    storage: '256 GB',
    connectivity: 'SIM física',
    color: 'Mist Blue',
    colorHex: '#a9c4d9',
    price: 2899990,
    badge: 'Nuevo',
    image: '/products/iphone-17.webp',
    stock: 'Disponible en tienda',
    description:
      'El iPhone 17 de 256 GB con chip A19, doble cámara de 48 MP y pantalla Super Retina XDR. La puerta de entrada a la nueva generación.',
    highlights: [
      'Pantalla Super Retina XDR de 6.3"',
      'Chip A19',
      'Cámara principal de 48 MP',
      'SIM física y USB-C',
    ],
    specs: [
      { label: 'Pantalla', value: '6.3" Super Retina XDR' },
      { label: 'Chip', value: 'A19' },
      { label: 'Cámara', value: 'Dual de 48 MP' },
      { label: 'Conectividad', value: 'SIM física' },
      { label: 'Seguridad', value: 'Face ID' },
      { label: 'Acabado', value: 'Aluminio · Mist Blue' },
    ],
  },
  {
    slug: 'iphone-16-128gb',
    name: 'iPhone 16',
    brand: 'Apple',
    category: 'iPhone',
    type: 'phone',
    condition: 'Nuevo',
    storage: '128 GB',
    connectivity: 'SIM física',
    color: 'Ultramarine',
    colorHex: '#6774e8',
    price: 2399990,
    badge: 'Precio imperdible',
    image: '/products/iphone-16.webp',
    stock: 'Disponible en tienda',
    featured: true,
    description:
      'iPhone 16 de 128 GB en Ultramarine. Chip A18, cámara de 48 MP y botón de acción: una compra segura y llena de color.',
    highlights: [
      'Pantalla Super Retina XDR de 6.1"',
      'Chip A18',
      'Cámara principal de 48 MP',
      'SIM física y USB-C',
    ],
    specs: [
      { label: 'Pantalla', value: '6.1" Super Retina XDR' },
      { label: 'Chip', value: 'A18' },
      { label: 'Cámara', value: 'Dual de 48 MP' },
      { label: 'Conectividad', value: 'SIM física' },
      { label: 'Seguridad', value: 'Face ID' },
      { label: 'Acabado', value: 'Aluminio · Ultramarine' },
    ],
  },
  {
    slug: 'galaxy-s26-ultra-512gb',
    name: 'Samsung Galaxy S26 Ultra',
    brand: 'Samsung',
    category: 'Samsung',
    type: 'phone',
    condition: 'Nuevo',
    storage: '512 GB',
    ram: '12 GB',
    color: 'Violet',
    colorHex: '#5b4a7e',
    price: 3599990,
    badge: 'Más buscado',
    image: '/products/galaxy-s26-ultra-512.webp',
    stock: 'Disponible en tienda',
    featured: true,
    description:
      'El Galaxy más completo: pantalla Dynamic AMOLED de 6.9", cámara de 200 MP, S Pen y 12 GB de RAM. Productividad y creación sin límites.',
    highlights: [
      'Pantalla Dynamic AMOLED 2X de 6.9"',
      'Cámara principal de 200 MP',
      '12 GB de RAM y 512 GB',
      'S Pen incluido',
    ],
    specs: [
      { label: 'Pantalla', value: '6.9" Dynamic AMOLED 2X' },
      { label: 'Memoria', value: '12 GB RAM · 512 GB' },
      { label: 'Cámara', value: '200 MP + ultra gran angular' },
      { label: 'Batería', value: '5.000 mAh' },
      { label: 'Extras', value: 'S Pen · Galaxy AI' },
      { label: 'Acabado', value: 'Violet' },
    ],
  },
  {
    slug: 'galaxy-s26-ultra-256gb',
    name: 'Samsung Galaxy S26 Ultra',
    brand: 'Samsung',
    category: 'Samsung',
    type: 'phone',
    condition: 'Nuevo',
    storage: '256 GB',
    ram: '12 GB',
    color: 'Blue',
    colorHex: '#9db7cf',
    price: 3199990,
    badge: 'Nuevo',
    image: '/products/galaxy-s26-ultra-256.webp',
    stock: 'Disponible en tienda',
    description:
      'Galaxy S26 Ultra de 256 GB y 12 GB de RAM. La experiencia Ultra con S Pen, cámara de 200 MP y pantalla de 6.9".',
    highlights: [
      'Pantalla Dynamic AMOLED 2X de 6.9"',
      'Cámara principal de 200 MP',
      '12 GB de RAM y 256 GB',
      'S Pen incluido',
    ],
    specs: [
      { label: 'Pantalla', value: '6.9" Dynamic AMOLED 2X' },
      { label: 'Memoria', value: '12 GB RAM · 256 GB' },
      { label: 'Cámara', value: '200 MP + ultra gran angular' },
      { label: 'Batería', value: '5.000 mAh' },
      { label: 'Extras', value: 'S Pen · Galaxy AI' },
      { label: 'Acabado', value: 'Blue' },
    ],
  },
  {
    slug: 'ipad-a16-11-128gb',
    name: 'iPad (A16) 11"',
    brand: 'Apple',
    category: 'iPad',
    type: 'tablet',
    condition: 'Nuevo',
    storage: '128 GB',
    color: 'Blue',
    colorHex: '#6f9fca',
    price: 1599990,
    badge: 'Ideal para estudiar',
    image: '/products/ipad-a16.webp',
    stock: 'Disponible en tienda',
    description:
      'iPad de 11" con chip A16 y 128 GB. La herramienta perfecta para estudiar, trabajar y disfrutar contenido con Apple Pencil y teclado.',
    highlights: [
      'Pantalla Liquid Retina de 11"',
      'Chip A16',
      '128 GB de almacenamiento',
      'Touch ID y USB-C',
    ],
    specs: [
      { label: 'Pantalla', value: '11" Liquid Retina' },
      { label: 'Chip', value: 'A16' },
      { label: 'Almacenamiento', value: '128 GB' },
      { label: 'Seguridad', value: 'Touch ID' },
      { label: 'Conectividad', value: 'Wi-Fi' },
      { label: 'Acabado', value: 'Blue' },
    ],
  },
  {
    slug: 'apple-watch-series-12-42mm',
    name: 'Apple Watch Series 12',
    brand: 'Apple',
    category: 'Apple Watch',
    type: 'watch',
    condition: 'Nuevo',
    size: '42 mm',
    color: 'Light Gold',
    colorHex: '#d6c39a',
    price: 1599990,
    badge: 'Nuevo',
    image: '/products/watch-series-12.webp',
    stock: 'Disponible en tienda',
    featured: true,
    description:
      'Apple Watch Series 12 de 42 mm. Salud, entrenamiento y conexión en tu muñeca, con pantalla Always-On y acabado Light Gold.',
    highlights: [
      'Caja de 42 mm',
      'Pantalla Always-On',
      'Seguimiento de salud y actividad',
      'Resistencia al agua 50 m',
    ],
    specs: [
      { label: 'Tamaño', value: '42 mm' },
      { label: 'Pantalla', value: 'Always-On Retina' },
      { label: 'Salud', value: 'Ritmo cardíaco y sueño' },
      { label: 'Conectividad', value: 'GPS · Bluetooth' },
      { label: 'Resistencia', value: 'Agua 50 m' },
      { label: 'Acabado', value: 'Aluminio · Light Gold' },
    ],
  },
  {
    slug: 'apple-watch-se-3-44mm',
    name: 'Apple Watch SE 3',
    brand: 'Apple',
    category: 'Apple Watch',
    type: 'watch',
    condition: 'Nuevo',
    size: '44 mm',
    color: 'Starlight',
    colorHex: '#e8e0d2',
    price: 1049990,
    badge: 'Mejor precio',
    image: '/products/watch-se-3.webp',
    stock: 'Disponible en tienda',
    description:
      'Apple Watch SE 3 de 44 mm. Todo lo esencial de Apple Watch a un precio increíble: salud, notificaciones, deporte y GPS.',
    highlights: [
      'Caja de 44 mm',
      'Pantalla Retina',
      'Ritmo cardíaco y seguimiento del sueño',
      'GPS y resistencia al agua 50 m',
    ],
    specs: [
      { label: 'Tamaño', value: '44 mm' },
      { label: 'Pantalla', value: 'Retina' },
      { label: 'Salud', value: 'Ritmo cardíaco y sueño' },
      { label: 'Conectividad', value: 'GPS · Bluetooth' },
      { label: 'Resistencia', value: 'Agua 50 m' },
      { label: 'Acabado', value: 'Aluminio · Starlight' },
    ],
  },
  {
    slug: 'airpods-5',
    name: 'AirPods 5',
    brand: 'Apple',
    category: 'Audio',
    type: 'audio',
    condition: 'Nuevo',
    color: 'Blanco',
    colorHex: '#f2f2f2',
    price: 599990,
    badge: 'Nuevo',
    image: '/products/airpods-5.webp',
    stock: 'Disponible en tienda',
    description:
      'AirPods 5 con audio espacial, cancelación activa de ruido y estuche de carga USB-C. Sonido envolvente para tu día a día.',
    highlights: [
      'Audio espacial personalizado',
      'Cancelación activa de ruido',
      'Estuche de carga USB-C',
      'Hasta 30 horas con el estuche',
    ],
    specs: [
      { label: 'Tipo', value: 'Audífonos inalámbricos' },
      { label: 'Audio', value: 'Espacial personalizado' },
      { label: 'Cancelación', value: 'Activa de ruido' },
      { label: 'Carga', value: 'Estuche USB-C' },
      { label: 'Autonomía', value: 'Hasta 30 h con estuche' },
      { label: 'Color', value: 'Blanco' },
    ],
  },
  {
    slug: 'airpods-pro-3',
    name: 'AirPods Pro 3',
    brand: 'Apple',
    category: 'Audio',
    type: 'audio',
    condition: 'Nuevo',
    color: 'Blanco',
    colorHex: '#f2f2f2',
    price: 899990,
    badge: 'Top ventas',
    image: '/products/airpods-pro-3.webp',
    stock: 'Disponible en tienda',
    featured: true,
    description:
      'AirPods Pro 3 con cancelación activa de ruido, audio adaptativo y sensor de frecuencia cardíaca. La experiencia auditiva más completa.',
    highlights: [
      'Cancelación activa de ruido',
      'Audio adaptativo',
      'Sensor de frecuencia cardíaca',
      'Estuche MagSafe USB-C',
    ],
    specs: [
      { label: 'Tipo', value: 'Audífonos inalámbricos' },
      { label: 'Audio', value: 'Adaptativo' },
      { label: 'Cancelación', value: 'Activa de ruido' },
      { label: 'Salud', value: 'Sensor de frecuencia cardíaca' },
      { label: 'Carga', value: 'Estuche MagSafe USB-C' },
      { label: 'Color', value: 'Blanco' },
    ],
  },
  {
    slug: 'adaptador-20w-original',
    name: 'Adaptador 20 W',
    brand: 'Apple',
    category: 'Accesorios',
    type: 'accessory',
    condition: 'Nuevo',
    color: 'Blanco',
    colorHex: '#f2f2f2',
    price: 99990,
    badge: 'Original',
    image: '/products/adaptador-20w.webp',
    stock: 'Disponible en tienda',
    description:
      'Adaptador de corriente USB-C de 20 W original Apple. Carga rápida y segura para tu iPhone, iPad o AirPods.',
    highlights: [
      'Potencia de 20 W',
      'Conector USB-C',
      'Compatible con carga rápida',
      'Producto original Apple',
    ],
    specs: [
      { label: 'Tipo', value: 'Adaptador de corriente' },
      { label: 'Potencia', value: '20 W' },
      { label: 'Conector', value: 'USB-C' },
      { label: 'Compatibilidad', value: 'iPhone · iPad · AirPods' },
      { label: 'Color', value: 'Blanco' },
      { label: 'Garantía', value: 'Original Apple' },
    ],
  },
  {
    slug: 'cable-usb-c-original',
    name: 'Cable USB-C',
    brand: 'Apple',
    category: 'Accesorios',
    type: 'accessory',
    condition: 'Nuevo',
    color: 'Blanco',
    colorHex: '#f2f2f2',
    price: 79990,
    badge: 'Original',
    image: '/products/cable-usb-c.webp',
    stock: 'Disponible en tienda',
    description:
      'Cable USB-C a USB-C original Apple de 1 metro. Carga, sincroniza y transfiere datos con la calidad de siempre.',
    highlights: [
      'USB-C a USB-C',
      'Longitud de 1 metro',
      'Soporta hasta 60 W',
      'Producto original Apple',
    ],
    specs: [
      { label: 'Tipo', value: 'Cable de carga' },
      { label: 'Conectores', value: 'USB-C a USB-C' },
      { label: 'Longitud', value: '1 m' },
      { label: 'Potencia', value: 'Hasta 60 W' },
      { label: 'Color', value: 'Blanco' },
      { label: 'Garantía', value: 'Original Apple' },
    ],
  },
  {
    slug: 'cable-lightning-original',
    name: 'Cable Lightning',
    brand: 'Apple',
    category: 'Accesorios',
    type: 'accessory',
    condition: 'Nuevo',
    color: 'Blanco',
    colorHex: '#f2f2f2',
    price: 79990,
    badge: 'Original',
    image: '/products/cable-lightning.webp',
    stock: 'Disponible en tienda',
    description:
      'Cable USB-C a Lightning original Apple de 1 metro. La solución de carga y sincronización para equipos con conector Lightning.',
    highlights: [
      'USB-C a Lightning',
      'Longitud de 1 metro',
      'Carga y sincronización',
      'Producto original Apple',
    ],
    specs: [
      { label: 'Tipo', value: 'Cable de carga' },
      { label: 'Conectores', value: 'USB-C a Lightning' },
      { label: 'Longitud', value: '1 m' },
      { label: 'Función', value: 'Carga y sincronización' },
      { label: 'Color', value: 'Blanco' },
      { label: 'Garantía', value: 'Original Apple' },
    ],
  },
];

export const categories: { name: ProductCategory | 'Todos'; label: string }[] = [
  { name: 'Todos', label: 'Todo el inventario' },
  { name: 'iPhone', label: 'iPhone' },
  { name: 'Samsung', label: 'Samsung' },
  { name: 'iPad', label: 'iPad' },
  { name: 'Apple Watch', label: 'Apple Watch' },
  { name: 'Audio', label: 'Audio' },
  { name: 'Accesorios', label: 'Accesorios' },
];

export const productBySlug = new Map(products.map((product) => [product.slug, product]));

export const featuredProducts = products.filter((product) => product.featured);

export function countByCategory(category: ProductCategory | 'Todos') {
  return category === 'Todos'
    ? products.length
    : products.filter((product) => product.category === category).length;
}

export function productSpecLine(product: Product) {
  if (product.storage && product.connectivity) {
    return `${product.storage} · ${product.connectivity}`;
  }
  if (product.storage && product.ram) {
    return `${product.storage} · ${product.ram} RAM`;
  }
  if (product.storage) return product.storage;
  if (product.size) return product.size;
  return product.category;
}

export function relatedProducts(product: Product, limit = 4) {
  const sameCategory = products.filter(
    (item) => item.slug !== product.slug && item.category === product.category,
  );
  const others = products.filter(
    (item) => item.slug !== product.slug && item.category !== product.category,
  );
  return [...sameCategory, ...others].slice(0, limit);
}
