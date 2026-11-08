-- FIX MOBIL initial schema. Run in Supabase SQL Editor or with Supabase CLI.
create extension if not exists pgcrypto;
create type public.staff_role as enum ('owner','admin','seller','inventory','viewer');
create type public.device_condition as enum ('new','display');
create type public.device_status as enum ('available','reserved','sold','inspection','unpublished');
create type public.order_status as enum ('pending_confirmation','confirmed','preparing','ready_for_pickup','shipped','delivered','cancelled','incident');
create type public.payment_status as enum ('pending','awaiting_provider','verified','partially_paid','rejected','refunded');
create type public.fulfillment_method as enum ('store_pickup','national_shipping');
create type public.payment_method_code as enum ('cash_store','addi_sistecredito','su_pay','maxcredit','trade_in','layaway');
create type public.reservation_status as enum ('active','expired','converted','cancelled');

create table public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 full_name text,
 role public.staff_role not null default 'viewer',
 active boolean not null default true,
 created_at timestamptz not null default now()
);
create table public.brands (id uuid primary key default gen_random_uuid(), name text not null unique, slug text not null unique, active boolean not null default true);
create table public.categories (id uuid primary key default gen_random_uuid(), name text not null, slug text not null unique, parent_id uuid references public.categories(id), active boolean not null default true);
create table public.products (
 id uuid primary key default gen_random_uuid(), name text not null, slug text not null unique,
 brand_id uuid references public.brands(id), category_id uuid references public.categories(id),
 description text, product_type text not null check (product_type in ('device','accessory')),
 is_active boolean not null default false, is_featured boolean not null default false,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.devices (
 id uuid primary key default gen_random_uuid(), product_id uuid not null references public.products(id),
 internal_code text not null unique, imei text, serial_number text, condition public.device_condition not null,
 storage text, color text, battery_health integer check (battery_health between 0 and 100),
 physical_condition text, functional_condition text, included_accessories jsonb not null default '[]'::jsonb,
 warranty_days integer not null default 0 check (warranty_days >= 0), cash_price bigint not null check (cash_price >= 0),
 regular_price bigint check (regular_price is null or regular_price >= 0), status public.device_status not null default 'inspection',
 published_at timestamptz, created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
 constraint imei_unique unique (imei)
);
create table public.device_images (id uuid primary key default gen_random_uuid(), device_id uuid not null references public.devices(id) on delete cascade, storage_path text not null, alt_text text, sort_order integer not null default 0);
create table public.accessories (
 id uuid primary key default gen_random_uuid(), product_id uuid not null references public.products(id), sku text not null unique,
 variant jsonb not null default '{}'::jsonb, stock_quantity integer not null default 0 check (stock_quantity >= 0),
 minimum_stock integer not null default 0 check (minimum_stock >= 0), price bigint not null check (price >= 0), cost bigint check (cost is null or cost >= 0), active boolean not null default true
);
create table public.customers (id uuid primary key default gen_random_uuid(), full_name text not null, document_type text, document_number text, email text, phone text not null, created_at timestamptz not null default now());
create table public.addresses (id uuid primary key default gen_random_uuid(), customer_id uuid not null references public.customers(id), department text, city text, neighborhood text, address_line text not null, postal_code text, delivery_notes text, created_at timestamptz not null default now());
create table public.store_settings (key text primary key, value jsonb not null, updated_at timestamptz not null default now());
create table public.payment_methods (code public.payment_method_code primary key, label text not null, active boolean not null default true, surcharge_type text not null default 'none' check (surcharge_type in ('none','percentage','fixed')), surcharge_value numeric(12,2) not null default 0, config jsonb not null default '{}'::jsonb, updated_at timestamptz not null default now());
create table public.orders (
 id uuid primary key default gen_random_uuid(), reference text not null unique,
 customer_id uuid not null references public.customers(id), status public.order_status not null default 'pending_confirmation',
 payment_status public.payment_status not null default 'pending', fulfillment public.fulfillment_method not null,
 payment_method public.payment_method_code not null, subtotal_cop bigint not null check (subtotal_cop >= 0),
 shipping_cop bigint not null default 0 check (shipping_cop >= 0), surcharge_cop bigint not null default 0 check (surcharge_cop >= 0),
 discount_cop bigint not null default 0 check (discount_cop >= 0), total_cop bigint not null check (total_cop >= 0),
 address_id uuid references public.addresses(id), shipping_notes text, admin_notes text,
 reservation_expires_at timestamptz, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.order_items (
 id uuid primary key default gen_random_uuid(), order_id uuid not null references public.orders(id) on delete cascade,
 product_id uuid not null references public.products(id), device_id uuid references public.devices(id), accessory_id uuid references public.accessories(id),
 item_name_snapshot text not null, sku_snapshot text, condition_snapshot text, quantity integer not null check (quantity > 0),
 unit_price_cop bigint not null check (unit_price_cop >= 0), line_total_cop bigint not null check (line_total_cop >= 0),
 check ((device_id is not null and accessory_id is null and quantity = 1) or (device_id is null and accessory_id is not null))
);
create table public.payments (id uuid primary key default gen_random_uuid(), order_id uuid not null references public.orders(id), method public.payment_method_code not null, amount_cop bigint not null check (amount_cop >= 0), status public.payment_status not null default 'pending', provider_reference text, verified_by uuid references public.profiles(id), verified_at timestamptz, notes text, created_at timestamptz not null default now());
create table public.reservations (id uuid primary key default gen_random_uuid(), device_id uuid not null references public.devices(id), order_id uuid references public.orders(id), customer_id uuid not null references public.customers(id), deposit_cop bigint not null check (deposit_cop >= 100000), duration_days integer not null default 15 check (duration_days > 0 and duration_days <= 90), status public.reservation_status not null default 'active', starts_at timestamptz not null default now(), expires_at timestamptz not null, created_at timestamptz not null default now());
create table public.trade_ins (id uuid primary key default gen_random_uuid(), customer_id uuid references public.customers(id), full_name text not null, phone text not null, brand text not null, model text not null, storage text, color text, battery_health integer check (battery_health between 0 and 100), physical_condition text, functional_condition text, repairs text, status text not null default 'received' check (status in ('received','reviewing','offer_sent','accepted','rejected','completed')), offer_cop bigint check (offer_cop is null or offer_cop >= 0), admin_notes text, created_at timestamptz not null default now());
create table public.trade_in_images (id uuid primary key default gen_random_uuid(), trade_in_id uuid not null references public.trade_ins(id) on delete cascade, storage_path text not null, created_at timestamptz not null default now());
create table public.inventory_movements (id uuid primary key default gen_random_uuid(), device_id uuid references public.devices(id), accessory_id uuid references public.accessories(id), movement_type text not null, quantity integer not null, reason text, reference_id uuid, created_by uuid references public.profiles(id), created_at timestamptz not null default now(), check ((device_id is not null)::int + (accessory_id is not null)::int = 1));
create table public.audit_logs (id uuid primary key default gen_random_uuid(), actor_id uuid references public.profiles(id), action text not null, entity text not null, entity_id uuid, metadata jsonb not null default '{}'::jsonb, created_at timestamptz not null default now());

create index devices_product_status_idx on public.devices(product_id,status);
create index devices_condition_idx on public.devices(condition);
create index orders_created_idx on public.orders(created_at desc);
create index orders_status_idx on public.orders(status,payment_status);
create index trade_ins_created_idx on public.trade_ins(created_at desc);
create index accessories_product_idx on public.accessories(product_id);

insert into public.store_settings(key,value) values
 ('currency','"COP"'::jsonb), ('store_name','"FIX MOBIL"'::jsonb), ('store_address','"C.C. River Plaza, segundo piso, local 229"'::jsonb),
 ('layaway_duration_days','15'::jsonb), ('layaway_minimum_deposit_cop','100000'::jsonb), ('shipping_mode','"manual"'::jsonb), ('cash_payment_location','"store_only"'::jsonb)
on conflict (key) do nothing;
insert into public.payment_methods(code,label,active,surcharge_type,surcharge_value) values
 ('cash_store','Efectivo en tienda',true,'none',0), ('addi_sistecredito','Addi / Sistecrédito',true,'percentage',20),
 ('su_pay','SU+Pay',true,'percentage',15), ('maxcredit','Maxcrédit',true,'fixed',200000),
 ('trade_in','Plan Retoma',true,'none',0), ('layaway','Apartado',true,'none',0)
on conflict (code) do nothing;
insert into public.brands(name,slug) values ('Apple','apple'),('Samsung','samsung'),('Xiaomi','xiaomi'),('Motorola','motorola') on conflict do nothing;
insert into public.categories(name,slug) values ('iPhone','iphone'),('Android','android'),('Accesorios','accesorios') on conflict do nothing;

create or replace function public.current_staff_role() returns public.staff_role
language sql stable security definer set search_path = public as $$
 select role from public.profiles where id = auth.uid() and active = true limit 1;
$$;
create or replace function public.is_staff() returns boolean
language sql stable security definer set search_path = public as $$
 select exists(select 1 from public.profiles where id = auth.uid() and active = true and role in ('owner','admin','seller','inventory','viewer'));
$$;
create or replace function public.can_manage_catalog() returns boolean
language sql stable security definer set search_path = public as $$
 select public.current_staff_role() in ('owner','admin','inventory');
$$;
create or replace function public.can_manage_orders() returns boolean
language sql stable security definer set search_path = public as $$
 select public.current_staff_role() in ('owner','admin','seller');
$$;

alter table public.profiles enable row level security;
alter table public.brands enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.devices enable row level security;
alter table public.device_images enable row level security;
alter table public.accessories enable row level security;
alter table public.customers enable row level security;
alter table public.addresses enable row level security;
alter table public.store_settings enable row level security;
alter table public.payment_methods enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.payments enable row level security;
alter table public.reservations enable row level security;
alter table public.trade_ins enable row level security;
alter table public.trade_in_images enable row level security;
alter table public.inventory_movements enable row level security;
alter table public.audit_logs enable row level security;

create policy "staff read own profile" on public.profiles for select to authenticated using (id=auth.uid() or public.current_staff_role() in ('owner','admin'));
create policy "owners manage profiles" on public.profiles for all to authenticated using (public.current_staff_role() in ('owner','admin')) with check (public.current_staff_role() in ('owner','admin'));
create policy "public read active brands" on public.brands for select to anon,authenticated using (active or public.is_staff());
create policy "staff manage brands" on public.brands for all to authenticated using (public.current_staff_role() in ('owner','admin','inventory')) with check (public.current_staff_role() in ('owner','admin','inventory'));
create policy "public read active categories" on public.categories for select to anon,authenticated using (active or public.is_staff());
create policy "staff manage categories" on public.categories for all to authenticated using (public.current_staff_role() in ('owner','admin','inventory')) with check (public.current_staff_role() in ('owner','admin','inventory'));
create policy "public read active products" on public.products for select to anon,authenticated using (is_active or public.is_staff());
create policy "catalog staff manage products" on public.products for all to authenticated using (public.can_manage_catalog()) with check (public.can_manage_catalog());
create policy "public read available published devices" on public.devices for select to anon,authenticated using ((status='available' and published_at is not null) or public.is_staff());
create policy "catalog staff manage devices" on public.devices for all to authenticated using (public.can_manage_catalog()) with check (public.can_manage_catalog());
create policy "public read images for published devices" on public.device_images for select to anon,authenticated using (exists(select 1 from public.devices d where d.id=device_id and d.status='available' and d.published_at is not null) or public.is_staff());
create policy "catalog staff manage device images" on public.device_images for all to authenticated using (public.can_manage_catalog()) with check (public.can_manage_catalog());
create policy "public read active accessories" on public.accessories for select to anon,authenticated using (active or public.is_staff());
create policy "catalog staff manage accessories" on public.accessories for all to authenticated using (public.can_manage_catalog()) with check (public.can_manage_catalog());
create policy "staff manage customers" on public.customers for all to authenticated using (public.can_manage_orders()) with check (public.can_manage_orders());
create policy "staff manage addresses" on public.addresses for all to authenticated using (public.can_manage_orders()) with check (public.can_manage_orders());
create policy "public read public store settings" on public.store_settings for select to anon,authenticated using (key in ('currency','store_name','store_address','layaway_duration_days','layaway_minimum_deposit_cop','shipping_mode'));
create policy "admins manage store settings" on public.store_settings for all to authenticated using (public.current_staff_role() in ('owner','admin')) with check (public.current_staff_role() in ('owner','admin'));
create policy "public read active payment methods" on public.payment_methods for select to anon,authenticated using (active or public.is_staff());
create policy "admins manage payment methods" on public.payment_methods for all to authenticated using (public.current_staff_role() in ('owner','admin')) with check (public.current_staff_role() in ('owner','admin'));
create policy "staff manage orders" on public.orders for all to authenticated using (public.can_manage_orders()) with check (public.can_manage_orders());
create policy "staff read order items" on public.order_items for select to authenticated using (public.is_staff());
create policy "staff manage order items" on public.order_items for all to authenticated using (public.can_manage_orders()) with check (public.can_manage_orders());
create policy "staff manage payments" on public.payments for all to authenticated using (public.can_manage_orders()) with check (public.can_manage_orders());
create policy "staff manage reservations" on public.reservations for all to authenticated using (public.can_manage_orders()) with check (public.can_manage_orders());
create policy "staff manage tradeins" on public.trade_ins for all to authenticated using (public.can_manage_orders()) with check (public.can_manage_orders());
create policy "staff manage tradein images" on public.trade_in_images for all to authenticated using (public.can_manage_orders()) with check (public.can_manage_orders());
create policy "staff read inventory movements" on public.inventory_movements for select to authenticated using (public.is_staff());
create policy "catalog staff insert inventory movements" on public.inventory_movements for insert to authenticated with check (public.can_manage_catalog());
create policy "admins read audit logs" on public.audit_logs for select to authenticated using (public.current_staff_role() in ('owner','admin'));
create policy "staff insert audit logs" on public.audit_logs for insert to authenticated with check (public.is_staff());

-- Public submission is intentionally not granted direct table access for orders/customers/trade-ins.
-- Add server-validated Route Handlers/RPC with CAPTCHA/rate limiting before accepting public submissions.

-- Column-level protection: public catalog readers must never receive IMEI, serial number or internal inventory code.
revoke select on public.devices from anon, authenticated;
grant select (id, product_id, condition, storage, color, battery_health, physical_condition, functional_condition, included_accessories, warranty_days, cash_price, regular_price, status, published_at, created_at, updated_at) on public.devices to anon, authenticated;
grant select (internal_code, imei, serial_number) on public.devices to authenticated;
