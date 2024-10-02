create table "public"."bank_connections" (
    "access_token" text,
    "created_at" timestamp without time zone not null default now(),
    "enrollment_id" text,
    "error_details" text,
    "expires_at" timestamp without time zone,
    "id" uuid not null default gen_random_uuid(),
    "institution_id" text not null,
    "last_accessed" timestamp without time zone,
    "logo_url" text,
    "name" text not null,
    "provider" bank_providers,
    "reference_id" text,
    "status" connection_status,
    "company_id" uuid not null
);


create table "public"."teams" (
    "base_currency" text,
    "created_at" timestamp without time zone not null default now(),
    "document_classification" boolean,
    "email" text,
    "id" uuid not null default gen_random_uuid(),
    "inbox_email" text,
    "inbox_forwarding" boolean,
    "inbox_id" uuid,
    "logo_url" text,
    "name" text
);


alter table "public"."users" add column "company_id" uuid;

CREATE UNIQUE INDEX bank_connections_pkey ON public.bank_connections USING btree (id);

CREATE UNIQUE INDEX teams_pkey ON public.teams USING btree (id);

alter table "public"."bank_connections" add constraint "bank_connections_pkey" PRIMARY KEY using index "bank_connections_pkey";

alter table "public"."teams" add constraint "teams_pkey" PRIMARY KEY using index "teams_pkey";

alter table "public"."bank_connections" add constraint "fk_company_id" FOREIGN KEY (company_id) REFERENCES teams(id) ON DELETE CASCADE not valid;

alter table "public"."bank_connections" validate constraint "fk_company_id";

alter table "public"."users" add constraint "users_company_id_fkey" FOREIGN KEY (company_id) REFERENCES teams(id) ON DELETE SET NULL not valid;

alter table "public"."users" validate constraint "users_company_id_fkey";

grant delete on table "public"."bank_connections" to "anon";

grant insert on table "public"."bank_connections" to "anon";

grant references on table "public"."bank_connections" to "anon";

grant select on table "public"."bank_connections" to "anon";

grant trigger on table "public"."bank_connections" to "anon";

grant truncate on table "public"."bank_connections" to "anon";

grant update on table "public"."bank_connections" to "anon";

grant delete on table "public"."bank_connections" to "authenticated";

grant insert on table "public"."bank_connections" to "authenticated";

grant references on table "public"."bank_connections" to "authenticated";

grant select on table "public"."bank_connections" to "authenticated";

grant trigger on table "public"."bank_connections" to "authenticated";

grant truncate on table "public"."bank_connections" to "authenticated";

grant update on table "public"."bank_connections" to "authenticated";

grant delete on table "public"."bank_connections" to "service_role";

grant insert on table "public"."bank_connections" to "service_role";

grant references on table "public"."bank_connections" to "service_role";

grant select on table "public"."bank_connections" to "service_role";

grant trigger on table "public"."bank_connections" to "service_role";

grant truncate on table "public"."bank_connections" to "service_role";

grant update on table "public"."bank_connections" to "service_role";

grant delete on table "public"."teams" to "anon";

grant insert on table "public"."teams" to "anon";

grant references on table "public"."teams" to "anon";

grant select on table "public"."teams" to "anon";

grant trigger on table "public"."teams" to "anon";

grant truncate on table "public"."teams" to "anon";

grant update on table "public"."teams" to "anon";

grant delete on table "public"."teams" to "authenticated";

grant insert on table "public"."teams" to "authenticated";

grant references on table "public"."teams" to "authenticated";

grant select on table "public"."teams" to "authenticated";

grant trigger on table "public"."teams" to "authenticated";

grant truncate on table "public"."teams" to "authenticated";

grant update on table "public"."teams" to "authenticated";

grant delete on table "public"."teams" to "service_role";

grant insert on table "public"."teams" to "service_role";

grant references on table "public"."teams" to "service_role";

grant select on table "public"."teams" to "service_role";

grant trigger on table "public"."teams" to "service_role";

grant truncate on table "public"."teams" to "service_role";

grant update on table "public"."teams" to "service_role";


