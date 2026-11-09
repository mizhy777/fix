# FIX MOBIL — tienda y catálogo online

Proyecto Next.js + TypeScript listo para desplegar en Netlify. Incluye el
inventario de la campaña **Precios imperdibles**, fichas de producto, filtros,
cotización con carrito y cierre de pedido por WhatsApp.

## Lo que incluye

- Home comercial con hero de campaña, categorías, destacados y listado completo.
- **18 productos** del listado oficial: iPhone, Samsung, iPad, Apple Watch,
  AirPods y accesorios.
- Imágenes de producto de alta calidad descargadas y optimizadas en WebP
  (`public/products`).
- Catálogo con búsqueda, filtros por categoría y orden por precio.
- Ficha individual por producto con especificaciones, precio y CTA a WhatsApp.
- Carrito / cotización con persistencia en `localStorage`.
- Checkout que envía el pedido a WhatsApp con los datos del cliente.
- Páginas de métodos de pago, garantías, contacto y Plan Retoma.
- Panel administrativo base con Supabase (opcional).
- Configuración de Netlify (`netlify.toml`) y Node 22 (`.nvmrc`).

## Requisitos locales

- Node.js 20.9 o superior (recomendado Node 22 LTS).
- npm.

## Ejecutar en local

```bash
npm install
copy .env.example .env.local
npm run dev
```

Abre <http://localhost:3000>.

La vitrina pública funciona **sin Supabase**. Solo el panel `/admin` necesita
las variables de Supabase.

## Variables de entorno

| Variable | Uso |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL pública del sitio (Open Graph y sitemap). |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número internacional sin `+` para los CTAs. |
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto Supabase (panel). |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave pública de Supabase (panel). |
| `SUPABASE_SERVICE_ROLE_KEY` | Solo servidor. Nunca exponer en el cliente. |

## Desplegar en Vercel (preview actual)

El proyecto está publicado en:

**https://fix-mobil.vercel.app**

Para desplegar desde cero:

1. Entra a <https://vercel.com/new>.
2. Importa el repositorio `mizhy777/fix`.
3. Vercel detecta Next.js automáticamente.
4. Agrega las variables de entorno si las necesitas.
5. Deploy.

También puedes desplegar desde la terminal:

```bash
npx vercel --prod
```

Para que cada push a GitHub despliegue automáticamente, conecta el repositorio
desde **Vercel → Project → Settings → Git**. Si Vercel indica que no tiene
permisos, instala la GitHub App de Vercel para el repositorio `fix`.

## Desplegar en Netlify

### Opción A — desde GitHub (recomendada)

1. Crea un repositorio y sube este proyecto.
2. En Netlify: **Add new site → Import an existing project**.
3. Selecciona el repositorio. Netlify detecta Next.js y lee `netlify.toml`.
4. Configura las variables de entorno (`NEXT_PUBLIC_SITE_URL`,
   `NEXT_PUBLIC_WHATSAPP_NUMBER` y, si usarás el panel, las de Supabase).
5. Deploy. La URL quedará lista para conectar un dominio propio.

### Opción B — Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --build --prod
```

También puedes ejecutar `npm run build` antes para validar el build local.

## Actualizar inventario o precios

Todo el catálogo está en:

```
src/lib/products.ts
```

Cada producto incluye nombre, categoría, capacidad, color, precio, imagen,
descripción, especificaciones y si aparece en destacados. Para agregar un
producto:

1. Copia una imagen optimizada en `public/products/`.
2. Añade un objeto al arreglo `products`.
3. Ajusta `featured: true` si quieres mostrarlo en la home.

El listado completo de la home se genera automáticamente.

## Imágenes

Los renders de producto se obtuvieron de fuentes oficiales de Apple y Samsung,
y de GSMArena para los modelos iPhone 17 Pro / Pro Max. Fueron recortados,
centrados y convertidos a WebP. Las marcas y productos son propiedad de sus
respectivos titulares; FIX MOBIL los usa para identificar los equipos que
comercializa.

## Panel administrativo (opcional)

1. Crea un proyecto en <https://supabase.com/dashboard>.
2. Ejecuta `supabase/migrations/0001_initial_schema.sql` en el SQL Editor.
3. Configura las variables de Supabase.
4. Crea los usuarios del equipo y asigna roles desde SQL.

Roles: `owner`, `admin`, `seller`, `inventory`, `viewer`. No habilites registro
público de personal.

> El middleware de refresco automático de sesión se omitió para que el build de
> Netlify no dependa de una Edge Function. Las páginas del panel validan la
> sesión y el rol en el servidor. Si más adelante necesitas refresco automático
> de tokens, el código de referencia está en `docs/supabase-proxy.ts.txt`; puedes
> restaurarlo como `src/proxy.ts` cuando lo requieras.

## Comandos

```bash
npm run dev        # desarrollo
npm run typecheck  # validación TypeScript
npm run build      # build de producción
npm start          # servidor de producción
```

## Antes de recibir pedidos reales

- Validar disponibilidad y precios con el inventario físico.
- Definir políticas de garantía, privacidad y retracto.
- Configurar un número de WhatsApp comercial definitivo.
- Conectar Supabase para persistir pedidos y controlar inventario.
- Validar condiciones y recargos de Addi, Sistecrédito, SU+Pay y Maxcrédit.

## Estructura

```
src/app/                 páginas Next.js (home, catálogo, producto, carrito…)
src/components/          header, footer, tarjetas, filtros, formularios
src/lib/products.ts      inventario y precios
src/lib/store.ts         datos del negocio y enlaces de WhatsApp
src/lib/cart.tsx         carrito / cotización en localStorage
public/products/         imágenes optimizadas de cada equipo
public/brand/            logo, icono y Open Graph
netlify.toml             configuración de despliegue
```
