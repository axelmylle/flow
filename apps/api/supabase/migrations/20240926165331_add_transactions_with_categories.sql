drop trigger if exists "update_posts_updated_at" on "public"."posts";

drop policy "allow delete for post owners" on "public"."posts";

drop policy "allow insert for authenticated users" on "public"."posts";

drop policy "allow read access for all authenticated users" on "public"."posts";

drop policy "allow update for post owners" on "public"."posts";

revoke delete on table "public"."posts" from "anon";

revoke insert on table "public"."posts" from "anon";

revoke references on table "public"."posts" from "anon";

revoke select on table "public"."posts" from "anon";

revoke trigger on table "public"."posts" from "anon";

revoke truncate on table "public"."posts" from "anon";

revoke update on table "public"."posts" from "anon";

revoke delete on table "public"."posts" from "authenticated";

revoke insert on table "public"."posts" from "authenticated";

revoke references on table "public"."posts" from "authenticated";

revoke select on table "public"."posts" from "authenticated";

revoke trigger on table "public"."posts" from "authenticated";

revoke truncate on table "public"."posts" from "authenticated";

revoke update on table "public"."posts" from "authenticated";

revoke delete on table "public"."posts" from "service_role";

revoke insert on table "public"."posts" from "service_role";

revoke references on table "public"."posts" from "service_role";

revoke select on table "public"."posts" from "service_role";

revoke trigger on table "public"."posts" from "service_role";

revoke truncate on table "public"."posts" from "service_role";

revoke update on table "public"."posts" from "service_role";

alter table "public"."posts" drop constraint "fk_posts_user";

alter table "public"."posts" drop constraint "posts_pkey";

drop index if exists "public"."idx_posts_user_id";

drop index if exists "public"."posts_pkey";

drop table "public"."posts";

create table "public"."bank_accounts" (
    "account_id" text not null,
    "balance" numeric,
    "bank_connection_id" uuid,
    "base_balance" numeric,
    "base_currency" text,
    "created_at" timestamp without time zone not null default now(),
    "created_by" uuid not null,
    "currency" text,
    "enabled" boolean not null default true,
    "id" uuid not null default gen_random_uuid(),
    "manual" boolean,
    "name" text,
    "company_id" uuid not null,
    "type" account_type
);


create table "public"."transaction_categories" (
    "color" text,
    "created_at" timestamp without time zone default now(),
    "description" text,
    "embedding" text,
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "slug" text not null,
    "system" boolean,
    "company_id" uuid not null,
    "vat" numeric
);


create table "public"."transactions" (
    "amount" numeric not null,
    "assigned_id" uuid,
    "balance" numeric,
    "bank_account_id" uuid,
    "base_amount" numeric,
    "base_currency" text,
    "category" transactioncategories,
    "category_slug" text,
    "created_at" timestamp without time zone not null default now(),
    "currency" text not null,
    "date" date not null,
    "description" text,
    "frequency" transaction_frequency,
    "fts_vector" tsvector,
    "id" uuid not null default gen_random_uuid(),
    "internal_id" text not null,
    "manual" boolean,
    "method" transactionmethods not null,
    "name" text not null,
    "note" text,
    "recurring" boolean,
    "status" transactionstatus,
    "company_id" uuid not null,
    "updated_at" timestamp without time zone,
    "amount_text" text,
    "calculated_vat" numeric,
    "is_fulfilled" boolean
);


CREATE UNIQUE INDEX bank_accounts_pkey ON public.bank_accounts USING btree (id);

CREATE UNIQUE INDEX transaction_categories_pkey ON public.transaction_categories USING btree (id);

CREATE UNIQUE INDEX transaction_categories_slug_company_id_unique ON public.transaction_categories USING btree (slug, company_id);

CREATE UNIQUE INDEX transactions_pkey ON public.transactions USING btree (id);

alter table "public"."bank_accounts" add constraint "bank_accounts_pkey" PRIMARY KEY using index "bank_accounts_pkey";

alter table "public"."transaction_categories" add constraint "transaction_categories_pkey" PRIMARY KEY using index "transaction_categories_pkey";

alter table "public"."transactions" add constraint "transactions_pkey" PRIMARY KEY using index "transactions_pkey";

alter table "public"."bank_accounts" add constraint "bank_accounts_bank_connection_id_fkey" FOREIGN KEY (bank_connection_id) REFERENCES bank_connections(id) ON DELETE SET NULL not valid;

alter table "public"."bank_accounts" validate constraint "bank_accounts_bank_connection_id_fkey";

alter table "public"."bank_accounts" add constraint "bank_accounts_created_by_fkey" FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."bank_accounts" validate constraint "bank_accounts_created_by_fkey";

alter table "public"."bank_accounts" add constraint "public_bank_accounts_company_id_fkey" FOREIGN KEY (company_id) REFERENCES teams(id) ON DELETE CASCADE not valid;

alter table "public"."bank_accounts" validate constraint "public_bank_accounts_company_id_fkey";

alter table "public"."transaction_categories" add constraint "transaction_categories_company_id_fkey" FOREIGN KEY (company_id) REFERENCES teams(id) ON DELETE CASCADE not valid;

alter table "public"."transaction_categories" validate constraint "transaction_categories_company_id_fkey";

alter table "public"."transaction_categories" add constraint "transaction_categories_slug_company_id_unique" UNIQUE using index "transaction_categories_slug_company_id_unique";

alter table "public"."transactions" add constraint "public_transactions_assigned_id_fkey" FOREIGN KEY (assigned_id) REFERENCES users(id) ON DELETE SET NULL not valid;

alter table "public"."transactions" validate constraint "public_transactions_assigned_id_fkey";

alter table "public"."transactions" add constraint "public_transactions_company_id_fkey" FOREIGN KEY (company_id) REFERENCES teams(id) ON DELETE CASCADE not valid;

alter table "public"."transactions" validate constraint "public_transactions_company_id_fkey";

alter table "public"."transactions" add constraint "transactions_bank_account_id_fkey" FOREIGN KEY (bank_account_id) REFERENCES bank_accounts(id) ON DELETE SET NULL not valid;

alter table "public"."transactions" validate constraint "transactions_bank_account_id_fkey";

alter table "public"."transactions" add constraint "transactions_category_slug_company_id_fkey" FOREIGN KEY (category_slug, company_id) REFERENCES transaction_categories(slug, company_id) ON DELETE SET NULL not valid;

alter table "public"."transactions" validate constraint "transactions_category_slug_company_id_fkey";

grant delete on table "public"."bank_accounts" to "anon";

grant insert on table "public"."bank_accounts" to "anon";

grant references on table "public"."bank_accounts" to "anon";

grant select on table "public"."bank_accounts" to "anon";

grant trigger on table "public"."bank_accounts" to "anon";

grant truncate on table "public"."bank_accounts" to "anon";

grant update on table "public"."bank_accounts" to "anon";

grant delete on table "public"."bank_accounts" to "authenticated";

grant insert on table "public"."bank_accounts" to "authenticated";

grant references on table "public"."bank_accounts" to "authenticated";

grant select on table "public"."bank_accounts" to "authenticated";

grant trigger on table "public"."bank_accounts" to "authenticated";

grant truncate on table "public"."bank_accounts" to "authenticated";

grant update on table "public"."bank_accounts" to "authenticated";

grant delete on table "public"."bank_accounts" to "service_role";

grant insert on table "public"."bank_accounts" to "service_role";

grant references on table "public"."bank_accounts" to "service_role";

grant select on table "public"."bank_accounts" to "service_role";

grant trigger on table "public"."bank_accounts" to "service_role";

grant truncate on table "public"."bank_accounts" to "service_role";

grant update on table "public"."bank_accounts" to "service_role";

grant delete on table "public"."transaction_categories" to "anon";

grant insert on table "public"."transaction_categories" to "anon";

grant references on table "public"."transaction_categories" to "anon";

grant select on table "public"."transaction_categories" to "anon";

grant trigger on table "public"."transaction_categories" to "anon";

grant truncate on table "public"."transaction_categories" to "anon";

grant update on table "public"."transaction_categories" to "anon";

grant delete on table "public"."transaction_categories" to "authenticated";

grant insert on table "public"."transaction_categories" to "authenticated";

grant references on table "public"."transaction_categories" to "authenticated";

grant select on table "public"."transaction_categories" to "authenticated";

grant trigger on table "public"."transaction_categories" to "authenticated";

grant truncate on table "public"."transaction_categories" to "authenticated";

grant update on table "public"."transaction_categories" to "authenticated";

grant delete on table "public"."transaction_categories" to "service_role";

grant insert on table "public"."transaction_categories" to "service_role";

grant references on table "public"."transaction_categories" to "service_role";

grant select on table "public"."transaction_categories" to "service_role";

grant trigger on table "public"."transaction_categories" to "service_role";

grant truncate on table "public"."transaction_categories" to "service_role";

grant update on table "public"."transaction_categories" to "service_role";

grant delete on table "public"."transactions" to "anon";

grant insert on table "public"."transactions" to "anon";

grant references on table "public"."transactions" to "anon";

grant select on table "public"."transactions" to "anon";

grant trigger on table "public"."transactions" to "anon";

grant truncate on table "public"."transactions" to "anon";

grant update on table "public"."transactions" to "anon";

grant delete on table "public"."transactions" to "authenticated";

grant insert on table "public"."transactions" to "authenticated";

grant references on table "public"."transactions" to "authenticated";

grant select on table "public"."transactions" to "authenticated";

grant trigger on table "public"."transactions" to "authenticated";

grant truncate on table "public"."transactions" to "authenticated";

grant update on table "public"."transactions" to "authenticated";

grant delete on table "public"."transactions" to "service_role";

grant insert on table "public"."transactions" to "service_role";

grant references on table "public"."transactions" to "service_role";

grant select on table "public"."transactions" to "service_role";

grant trigger on table "public"."transactions" to "service_role";

grant truncate on table "public"."transactions" to "service_role";

grant update on table "public"."transactions" to "service_role";


