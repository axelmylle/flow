alter table "public"."bank_accounts" drop constraint "public_bank_accounts_company_id_fkey";

alter table "public"."bank_connections" drop constraint "fk_company_id";

alter table "public"."transaction_categories" drop constraint "transaction_categories_company_id_fkey";

alter table "public"."transaction_categories" drop constraint "transaction_categories_slug_company_id_unique";

alter table "public"."transactions" drop constraint "public_transactions_company_id_fkey";

alter table "public"."transactions" drop constraint "transactions_category_slug_company_id_fkey";

alter table "public"."users" drop constraint "users_company_id_fkey";

drop index if exists "public"."transaction_categories_slug_company_id_unique";

create table "public"."tracker_entries" (
    "assigned_id" uuid,
    "billed" boolean,
    "created_at" timestamp with time zone default now(),
    "currency" character varying(3) default NULL::character varying,
    "date" date,
    "description" text,
    "duration" numeric,
    "id" uuid not null default uuid_generate_v4(),
    "project_id" uuid,
    "rate" numeric,
    "start" timestamp with time zone,
    "stop" timestamp with time zone,
    "team_id" uuid,
    "project_members" jsonb
);


create table "public"."tracker_projects" (
    "billable" boolean,
    "created_at" timestamp with time zone default now(),
    "currency" character varying(3) default NULL::character varying,
    "description" text,
    "estimate" numeric,
    "id" uuid not null default uuid_generate_v4(),
    "name" character varying not null,
    "rate" numeric,
    "status" trackerstatus not null,
    "team_id" uuid,
    "get_assigned_users_for_project" jsonb,
    "get_project_total_amount" numeric,
    "project_members" jsonb,
    "total_duration" numeric
);


create table "public"."users_on_team" (
    "created_at" timestamp with time zone default now(),
    "id" uuid not null default uuid_generate_v4(),
    "role" teamroles,
    "team_id" uuid not null,
    "user_id" uuid not null
);


alter table "public"."bank_accounts" drop column "company_id";

alter table "public"."bank_accounts" add column "team_id" uuid not null;

alter table "public"."bank_connections" drop column "company_id";

alter table "public"."bank_connections" add column "team_id" uuid not null;

alter table "public"."transaction_categories" drop column "company_id";

alter table "public"."transaction_categories" add column "team_id" uuid not null;

alter table "public"."transactions" drop column "company_id";

alter table "public"."transactions" add column "team_id" uuid not null;

alter table "public"."users" drop column "company_id";

alter table "public"."users" add column "team_id" uuid;

CREATE UNIQUE INDEX tracker_entries_pkey ON public.tracker_entries USING btree (id);

CREATE UNIQUE INDEX tracker_projects_pkey ON public.tracker_projects USING btree (id);

CREATE UNIQUE INDEX users_on_team_pkey ON public.users_on_team USING btree (id);

CREATE UNIQUE INDEX transaction_categories_slug_company_id_unique ON public.transaction_categories USING btree (slug, team_id);

alter table "public"."tracker_entries" add constraint "tracker_entries_pkey" PRIMARY KEY using index "tracker_entries_pkey";

alter table "public"."tracker_projects" add constraint "tracker_projects_pkey" PRIMARY KEY using index "tracker_projects_pkey";

alter table "public"."users_on_team" add constraint "users_on_team_pkey" PRIMARY KEY using index "users_on_team_pkey";

alter table "public"."tracker_entries" add constraint "tracker_entries_assigned_id_fkey" FOREIGN KEY (assigned_id) REFERENCES users(id) ON DELETE SET NULL not valid;

alter table "public"."tracker_entries" validate constraint "tracker_entries_assigned_id_fkey";

alter table "public"."tracker_entries" add constraint "tracker_entries_project_id_fkey" FOREIGN KEY (project_id) REFERENCES tracker_projects(id) ON DELETE SET NULL not valid;

alter table "public"."tracker_entries" validate constraint "tracker_entries_project_id_fkey";

alter table "public"."tracker_entries" add constraint "tracker_entries_team_id_fkey" FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE SET NULL not valid;

alter table "public"."tracker_entries" validate constraint "tracker_entries_team_id_fkey";

alter table "public"."tracker_projects" add constraint "tracker_projects_team_id_fkey" FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE SET NULL not valid;

alter table "public"."tracker_projects" validate constraint "tracker_projects_team_id_fkey";

alter table "public"."users_on_team" add constraint "users_on_team_team_id_fkey" FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE not valid;

alter table "public"."users_on_team" validate constraint "users_on_team_team_id_fkey";

alter table "public"."users_on_team" add constraint "users_on_team_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."users_on_team" validate constraint "users_on_team_user_id_fkey";

alter table "public"."bank_accounts" add constraint "public_bank_accounts_company_id_fkey" FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE not valid;

alter table "public"."bank_accounts" validate constraint "public_bank_accounts_company_id_fkey";

alter table "public"."bank_connections" add constraint "fk_company_id" FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE not valid;

alter table "public"."bank_connections" validate constraint "fk_company_id";

alter table "public"."transaction_categories" add constraint "transaction_categories_company_id_fkey" FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE not valid;

alter table "public"."transaction_categories" validate constraint "transaction_categories_company_id_fkey";

alter table "public"."transaction_categories" add constraint "transaction_categories_slug_company_id_unique" UNIQUE using index "transaction_categories_slug_company_id_unique";

alter table "public"."transactions" add constraint "public_transactions_company_id_fkey" FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE not valid;

alter table "public"."transactions" validate constraint "public_transactions_company_id_fkey";

alter table "public"."transactions" add constraint "transactions_category_slug_company_id_fkey" FOREIGN KEY (category_slug, team_id) REFERENCES transaction_categories(slug, team_id) ON DELETE SET NULL not valid;

alter table "public"."transactions" validate constraint "transactions_category_slug_company_id_fkey";

alter table "public"."users" add constraint "users_company_id_fkey" FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE SET NULL not valid;

alter table "public"."users" validate constraint "users_company_id_fkey";

grant delete on table "public"."tracker_entries" to "anon";

grant insert on table "public"."tracker_entries" to "anon";

grant references on table "public"."tracker_entries" to "anon";

grant select on table "public"."tracker_entries" to "anon";

grant trigger on table "public"."tracker_entries" to "anon";

grant truncate on table "public"."tracker_entries" to "anon";

grant update on table "public"."tracker_entries" to "anon";

grant delete on table "public"."tracker_entries" to "authenticated";

grant insert on table "public"."tracker_entries" to "authenticated";

grant references on table "public"."tracker_entries" to "authenticated";

grant select on table "public"."tracker_entries" to "authenticated";

grant trigger on table "public"."tracker_entries" to "authenticated";

grant truncate on table "public"."tracker_entries" to "authenticated";

grant update on table "public"."tracker_entries" to "authenticated";

grant delete on table "public"."tracker_entries" to "service_role";

grant insert on table "public"."tracker_entries" to "service_role";

grant references on table "public"."tracker_entries" to "service_role";

grant select on table "public"."tracker_entries" to "service_role";

grant trigger on table "public"."tracker_entries" to "service_role";

grant truncate on table "public"."tracker_entries" to "service_role";

grant update on table "public"."tracker_entries" to "service_role";

grant delete on table "public"."tracker_projects" to "anon";

grant insert on table "public"."tracker_projects" to "anon";

grant references on table "public"."tracker_projects" to "anon";

grant select on table "public"."tracker_projects" to "anon";

grant trigger on table "public"."tracker_projects" to "anon";

grant truncate on table "public"."tracker_projects" to "anon";

grant update on table "public"."tracker_projects" to "anon";

grant delete on table "public"."tracker_projects" to "authenticated";

grant insert on table "public"."tracker_projects" to "authenticated";

grant references on table "public"."tracker_projects" to "authenticated";

grant select on table "public"."tracker_projects" to "authenticated";

grant trigger on table "public"."tracker_projects" to "authenticated";

grant truncate on table "public"."tracker_projects" to "authenticated";

grant update on table "public"."tracker_projects" to "authenticated";

grant delete on table "public"."tracker_projects" to "service_role";

grant insert on table "public"."tracker_projects" to "service_role";

grant references on table "public"."tracker_projects" to "service_role";

grant select on table "public"."tracker_projects" to "service_role";

grant trigger on table "public"."tracker_projects" to "service_role";

grant truncate on table "public"."tracker_projects" to "service_role";

grant update on table "public"."tracker_projects" to "service_role";

grant delete on table "public"."users_on_team" to "anon";

grant insert on table "public"."users_on_team" to "anon";

grant references on table "public"."users_on_team" to "anon";

grant select on table "public"."users_on_team" to "anon";

grant trigger on table "public"."users_on_team" to "anon";

grant truncate on table "public"."users_on_team" to "anon";

grant update on table "public"."users_on_team" to "anon";

grant delete on table "public"."users_on_team" to "authenticated";

grant insert on table "public"."users_on_team" to "authenticated";

grant references on table "public"."users_on_team" to "authenticated";

grant select on table "public"."users_on_team" to "authenticated";

grant trigger on table "public"."users_on_team" to "authenticated";

grant truncate on table "public"."users_on_team" to "authenticated";

grant update on table "public"."users_on_team" to "authenticated";

grant delete on table "public"."users_on_team" to "service_role";

grant insert on table "public"."users_on_team" to "service_role";

grant references on table "public"."users_on_team" to "service_role";

grant select on table "public"."users_on_team" to "service_role";

grant trigger on table "public"."users_on_team" to "service_role";

grant truncate on table "public"."users_on_team" to "service_role";

grant update on table "public"."users_on_team" to "service_role";


