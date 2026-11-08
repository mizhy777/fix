# Estado de implementación — FIX MOBIL

## Listo para revisar y desplegar
- Vitrina Next.js 16 con diseño responsive.
- Inventario completo de la campaña **Precios imperdibles**: 18 productos.
- Imágenes de producto optimizadas en WebP dentro de `public/products`.
- Catálogo con búsqueda, filtros por categoría y orden por precio.
- Ficha individual por producto con especificaciones y CTA a WhatsApp.
- Carrito / cotización persistente en `localStorage`.
- Checkout que envía el pedido a WhatsApp con datos del cliente.
- Páginas de métodos de pago, garantías, contacto y Plan Retoma.
- Metadatos, Open Graph, sitemap, robots y favicon.
- Configuración de Netlify validada con `netlify build`.

## Datos del inventario
El arreglo `src/lib/products.ts` contiene nombre, precio, capacidad, color,
conectividad, especificaciones, imagen y destacados de cada producto. La home y
el catálogo se generan desde ese archivo.

## Pendientes para venta transaccional
- Conectar inventario y pedidos a Supabase para persistencia real.
- Validar disponibilidad, precios y condiciones de financiación con el negocio.
- Configurar el número de WhatsApp comercial definitivo.
- Completar formularios CRUD del panel administrativo.
- Definir políticas legales de privacidad, garantía y retracto.
- Validar recargos y condiciones de Addi, Sistecrédito, SU+Pay y Maxcrédit.

## Nota técnica
El proyecto no incluye el middleware de refresco de Supabase para evitar una
Edge Function en Netlify. El código de referencia quedó en
`docs/supabase-proxy.ts.txt` y el panel sigue validando sesión y rol en el
servidor.
