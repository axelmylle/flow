create type "public"."invoice_delivery_type" as enum ('create', 'create_and_send');

create type "public"."invoice_size" as enum ('a4', 'letter');

create type "public"."invoice_status" as enum ('draft', 'overdue', 'paid', 'unpaid', 'canceled');

create type "public"."jobstatus" as enum ('active', 'filled', 'archived', 'draft', 'closed');

create type "public"."usertypes" as enum ('Company', 'Freelancer');

create table "public"."companies" (
    "created_at" timestamp without time zone not null default now(),
    "email" character varying,
    "id" uuid not null default gen_random_uuid(),
    "inbox_email" character varying,
    "logo_url" character varying,
    "name" character varying not null,
    "description" text,
    "linkedin_url" character varying
);


create table "public"."company_user_invites" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "company_id" uuid not null,
    "email" text,
    "role" teamroles,
    "code" text default nanoid(24),
    "invited_by" uuid
);


create table "public"."customers" (
    "id" uuid not null default gen_random_uuid(),
    "address_line_1" character varying(255),
    "address_line_2" character varying(255),
    "city" character varying(100),
    "country" character varying(100),
    "country_code" character varying(10),
    "created_at" timestamp without time zone default now(),
    "email" character varying(255) not null,
    "name" character varying(255) not null,
    "note" text,
    "phone" character varying(20),
    "state" character varying(100),
    "team_id" uuid not null,
    "token" character varying(255) not null,
    "vat_number" character varying(50),
    "website" character varying(255),
    "zip" character varying(20)
);


create table "public"."freelancer_experiences" (
    "id" uuid not null default gen_random_uuid(),
    "freelancer_id" uuid not null,
    "title" character varying(255) not null,
    "skills" text[],
    "tools" text[],
    "company" character varying(255),
    "richtext" text,
    "description" text,
    "thumbnail_url" text,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


create table "public"."invoice_comments" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp without time zone default now()
);


create table "public"."invoice_templates" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp without time zone default now(),
    "currency" character varying(10),
    "customer_label" character varying(255),
    "date_format" character varying(50),
    "delivery_type" invoice_delivery_type not null,
    "description_label" character varying(255),
    "discount_label" character varying(255),
    "due_date_label" character varying(255),
    "from_details" jsonb,
    "from_label" character varying(255),
    "include_decimals" boolean,
    "include_discount" boolean,
    "include_qr" boolean,
    "include_tax" boolean,
    "include_vat" boolean,
    "invoice_no_label" character varying(255),
    "issue_date_label" character varying(255),
    "locale" character varying(50),
    "logo_url" character varying(255),
    "note_label" character varying(255),
    "payment_details" jsonb,
    "payment_label" character varying(255),
    "price_label" character varying(255),
    "quantity_label" character varying(255),
    "size" invoice_size,
    "tax_label" character varying(255),
    "tax_rate" numeric,
    "team_id" uuid not null,
    "timezone" character varying(50),
    "total_label" character varying(255),
    "vat_label" character varying(255)
);


create table "public"."invoices" (
    "id" uuid not null default gen_random_uuid(),
    "amount" numeric,
    "company_details" jsonb,
    "created_at" timestamp without time zone default now(),
    "currency" character varying(10),
    "customer_details" jsonb,
    "customer_id" uuid,
    "customer_name" character varying(255),
    "discount" numeric,
    "due_date" date,
    "file_path" text[],
    "file_size" numeric,
    "from_details" jsonb,
    "fts" tsvector,
    "internal_note" text,
    "invoice_number" character varying(50),
    "issue_date" date,
    "line_items" jsonb,
    "note" text,
    "note_details" jsonb,
    "paid_at" timestamp without time zone,
    "payment_details" jsonb,
    "reminder_sent_at" timestamp without time zone,
    "sent_to" character varying(255),
    "status" invoice_status not null default 'draft'::invoice_status,
    "tax" numeric,
    "team_id" uuid not null,
    "template" jsonb,
    "token" character varying(255) not null,
    "updated_at" timestamp without time zone,
    "url" character varying(255),
    "user_id" uuid,
    "vat" numeric,
    "viewed_at" timestamp without time zone
);


create table "public"."jobs" (
    "id" uuid not null default gen_random_uuid(),
    "title" character varying(255) not null,
    "description" text,
    "location" character varying(255),
    "employment_type" character varying(50),
    "created_at" timestamp without time zone default now(),
    "updated_at" timestamp without time zone default now(),
    "company_id" uuid,
    "user_id" uuid,
    "is_scraped" boolean default false,
    "source_url" character varying(500),
    "status" jobstatus default 'active'::jobstatus,
    "company_name" character varying,
    "location_city" character varying,
    "location_state_region" character varying,
    "location_country" character varying,
    "location_remote_on_site_hybrid" character varying,
    "salary_minimum" numeric,
    "salary_maximum" numeric,
    "salary_currency" character varying,
    "salary_frequency" character varying,
    "about_company" text,
    "about_role" text,
    "technical_skills" text[],
    "soft_skills" text[],
    "years_of_experience" character varying,
    "preferred_skills" text[],
    "job_responsibilities" text[],
    "technical_stack" text[],
    "industry" character varying,
    "company_culture" text,
    "application_deadline" date,
    "posted_date" date,
    "job_benefits" text[],
    "application_url" character varying,
    "source_platform" character varying,
    "job_id" character varying,
    "contact_email" character varying
);


create table "public"."transaction_attachments" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "type" text,
    "transaction_id" uuid,
    "team_id" uuid,
    "size" bigint,
    "name" text,
    "path" text[]
);


create table "public"."users_on_company" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "company_id" uuid not null,
    "role" teamroles,
    "created_at" timestamp without time zone default now(),
    "title" text
);


alter table "public"."users" add column "company_id" uuid;

alter table "public"."users" add column "user_type" usertypes;

alter table "public"."users_on_team" add column "freelancer_id" uuid default gen_random_uuid();

CREATE UNIQUE INDEX companies_name_key ON public.companies USING btree (name);

CREATE UNIQUE INDEX companies_pkey ON public.companies USING btree (id);

CREATE UNIQUE INDEX customers_pkey ON public.customers USING btree (id);

CREATE UNIQUE INDEX customers_token_key ON public.customers USING btree (token);

CREATE UNIQUE INDEX freelancer_experiences_pkey ON public.freelancer_experiences USING btree (id);

CREATE UNIQUE INDEX invoice_comments_pkey ON public.invoice_comments USING btree (id);

CREATE UNIQUE INDEX invoice_templates_pkey ON public.invoice_templates USING btree (id);

CREATE UNIQUE INDEX invoices_pkey ON public.invoices USING btree (id);

CREATE UNIQUE INDEX invoices_token_key ON public.invoices USING btree (token);

CREATE UNIQUE INDEX jobs_job_id_key ON public.jobs USING btree (job_id);

CREATE UNIQUE INDEX jobs_pkey ON public.jobs USING btree (id);

CREATE UNIQUE INDEX users_on_company_pkey ON public.users_on_company USING btree (id);

alter table "public"."companies" add constraint "companies_pkey" PRIMARY KEY using index "companies_pkey";

alter table "public"."customers" add constraint "customers_pkey" PRIMARY KEY using index "customers_pkey";

alter table "public"."freelancer_experiences" add constraint "freelancer_experiences_pkey" PRIMARY KEY using index "freelancer_experiences_pkey";

alter table "public"."invoice_comments" add constraint "invoice_comments_pkey" PRIMARY KEY using index "invoice_comments_pkey";

alter table "public"."invoice_templates" add constraint "invoice_templates_pkey" PRIMARY KEY using index "invoice_templates_pkey";

alter table "public"."invoices" add constraint "invoices_pkey" PRIMARY KEY using index "invoices_pkey";

alter table "public"."jobs" add constraint "jobs_pkey" PRIMARY KEY using index "jobs_pkey";

alter table "public"."users_on_company" add constraint "users_on_company_pkey" PRIMARY KEY using index "users_on_company_pkey";

alter table "public"."companies" add constraint "companies_name_key" UNIQUE using index "companies_name_key";

alter table "public"."company_user_invites" add constraint "public_company_user_invites_company_id_fkey" FOREIGN KEY (company_id) REFERENCES companies(id) not valid;

alter table "public"."company_user_invites" validate constraint "public_company_user_invites_company_id_fkey";

alter table "public"."company_user_invites" add constraint "public_company_user_invites_invited_by_fkey" FOREIGN KEY (invited_by) REFERENCES users(id) not valid;

alter table "public"."company_user_invites" validate constraint "public_company_user_invites_invited_by_fkey";

alter table "public"."customers" add constraint "customers_team_id_fkey" FOREIGN KEY (team_id) REFERENCES teams(id) not valid;

alter table "public"."customers" validate constraint "customers_team_id_fkey";

alter table "public"."customers" add constraint "customers_token_key" UNIQUE using index "customers_token_key";

alter table "public"."freelancer_experiences" add constraint "freelancer_experiences_freelancer_id_fkey" FOREIGN KEY (freelancer_id) REFERENCES freelancers(id) ON DELETE CASCADE not valid;

alter table "public"."freelancer_experiences" validate constraint "freelancer_experiences_freelancer_id_fkey";

alter table "public"."invoice_templates" add constraint "invoice_templates_team_id_fkey" FOREIGN KEY (team_id) REFERENCES teams(id) not valid;

alter table "public"."invoice_templates" validate constraint "invoice_templates_team_id_fkey";

alter table "public"."invoices" add constraint "invoices_customer_id_fkey" FOREIGN KEY (customer_id) REFERENCES customers(id) not valid;

alter table "public"."invoices" validate constraint "invoices_customer_id_fkey";

alter table "public"."invoices" add constraint "invoices_team_id_fkey" FOREIGN KEY (team_id) REFERENCES teams(id) not valid;

alter table "public"."invoices" validate constraint "invoices_team_id_fkey";

alter table "public"."invoices" add constraint "invoices_token_key" UNIQUE using index "invoices_token_key";

alter table "public"."invoices" add constraint "invoices_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) not valid;

alter table "public"."invoices" validate constraint "invoices_user_id_fkey";

alter table "public"."jobs" add constraint "fk_jobs_company_id" FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE SET NULL not valid;

alter table "public"."jobs" validate constraint "fk_jobs_company_id";

alter table "public"."jobs" add constraint "jobs_job_id_key" UNIQUE using index "jobs_job_id_key";

alter table "public"."jobs" add constraint "public_jobs_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) not valid;

alter table "public"."jobs" validate constraint "public_jobs_user_id_fkey";

alter table "public"."users" add constraint "fk_users_company_id" FOREIGN KEY (company_id) REFERENCES companies(id) not valid;

alter table "public"."users" validate constraint "fk_users_company_id";

alter table "public"."users_on_company" add constraint "fk_users_on_company_company_id" FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE not valid;

alter table "public"."users_on_company" validate constraint "fk_users_on_company_company_id";

alter table "public"."users_on_company" add constraint "fk_users_on_company_user_id" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."users_on_company" validate constraint "fk_users_on_company_user_id";

alter table "public"."users_on_team" add constraint "public_users_on_team_freelancer_id_fkey" FOREIGN KEY (freelancer_id) REFERENCES freelancers(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."users_on_team" validate constraint "public_users_on_team_freelancer_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_freelancer(headline character varying)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
    new_freelancer_id uuid;
    new_team_id uuid;
begin
    insert into freelancers (headline, user_id) values (headline, auth.uid()) returning id into new_freelancer_id;
    insert into teams (name) values (headline) returning id into new_team_id;
    insert into users_on_team (user_id, team_id, role, freelancer_id) values (auth.uid(), new_team_id, 'owner', new_freelancer_id);

    return new_freelancer_id;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.generate_hmac(secret_key text, message text)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
DECLARE
    hmac_result bytea;
BEGIN
    hmac_result := extensions.hmac(message::bytea, secret_key::bytea, 'sha256');
    RETURN encode(hmac_result, 'base64');
END;
$function$
;

CREATE OR REPLACE FUNCTION public.webhook()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
    url text;
    secret text;
    payload jsonb;
    request_id bigint;
    signature text;
    path text;
BEGIN
    -- Extract the first item from TG_ARGV as path
    path = TG_ARGV[0];

    -- Get the webhook URL and secret from the vault
    SELECT decrypted_secret INTO url FROM vault.decrypted_secrets WHERE name = 'WEBHOOK_ENDPOINT' LIMIT 1;
    SELECT decrypted_secret INTO secret FROM vault.decrypted_secrets WHERE name = 'WEBHOOK_SECRET' LIMIT 1;

    -- Generate the payload
    payload = jsonb_build_object(
        'old_record', old,
        'record', new,
        'type', tg_op,
        'table', tg_table_name,
        'schema', tg_table_schema
    );

    -- Generate the signature
    signature = generate_hmac(secret, payload::text);

    -- Send the webhook request
    SELECT http_post
    INTO request_id
    FROM
        net.http_post(
                url :=  'http://host.docker.internal:3000/api/webhook/registered',
                body := payload,
                headers := jsonb_build_object(
                        'Content-Type', 'application/json',
                        'X-Supabase-Signature', signature
                ),
               timeout_milliseconds := 3000
        );

    -- Insert the request ID into the Supabase hooks table
    INSERT INTO supabase_functions.hooks
        (hook_table_id, hook_name, request_id)
    VALUES (tg_relid, tg_name, request_id);

    RETURN new;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$DECLARE
  user_type_enum usertypes;
BEGIN
  -- Assign user_type_enum only if the value matches the expected enum values
  CASE new.raw_user_meta_data->>'user_type'
    WHEN 'Company' THEN
      user_type_enum := 'Company'::usertypes;
    WHEN 'Freelancer' THEN
      user_type_enum := 'Freelancer'::usertypes;
    ELSE
      user_type_enum := NULL;
  END CASE;
  -- Now insert with the variable
  INSERT INTO public.users (id, email, full_name, avatar_url, user_type)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
user_type_enum  );

  RETURN new;
END;$function$
;

grant delete on table "public"."companies" to "anon";

grant insert on table "public"."companies" to "anon";

grant references on table "public"."companies" to "anon";

grant select on table "public"."companies" to "anon";

grant trigger on table "public"."companies" to "anon";

grant truncate on table "public"."companies" to "anon";

grant update on table "public"."companies" to "anon";

grant delete on table "public"."companies" to "authenticated";

grant insert on table "public"."companies" to "authenticated";

grant references on table "public"."companies" to "authenticated";

grant select on table "public"."companies" to "authenticated";

grant trigger on table "public"."companies" to "authenticated";

grant truncate on table "public"."companies" to "authenticated";

grant update on table "public"."companies" to "authenticated";

grant delete on table "public"."companies" to "service_role";

grant insert on table "public"."companies" to "service_role";

grant references on table "public"."companies" to "service_role";

grant select on table "public"."companies" to "service_role";

grant trigger on table "public"."companies" to "service_role";

grant truncate on table "public"."companies" to "service_role";

grant update on table "public"."companies" to "service_role";

grant delete on table "public"."company_user_invites" to "anon";

grant insert on table "public"."company_user_invites" to "anon";

grant references on table "public"."company_user_invites" to "anon";

grant select on table "public"."company_user_invites" to "anon";

grant trigger on table "public"."company_user_invites" to "anon";

grant truncate on table "public"."company_user_invites" to "anon";

grant update on table "public"."company_user_invites" to "anon";

grant delete on table "public"."company_user_invites" to "authenticated";

grant insert on table "public"."company_user_invites" to "authenticated";

grant references on table "public"."company_user_invites" to "authenticated";

grant select on table "public"."company_user_invites" to "authenticated";

grant trigger on table "public"."company_user_invites" to "authenticated";

grant truncate on table "public"."company_user_invites" to "authenticated";

grant update on table "public"."company_user_invites" to "authenticated";

grant delete on table "public"."company_user_invites" to "service_role";

grant insert on table "public"."company_user_invites" to "service_role";

grant references on table "public"."company_user_invites" to "service_role";

grant select on table "public"."company_user_invites" to "service_role";

grant trigger on table "public"."company_user_invites" to "service_role";

grant truncate on table "public"."company_user_invites" to "service_role";

grant update on table "public"."company_user_invites" to "service_role";

grant delete on table "public"."customers" to "anon";

grant insert on table "public"."customers" to "anon";

grant references on table "public"."customers" to "anon";

grant select on table "public"."customers" to "anon";

grant trigger on table "public"."customers" to "anon";

grant truncate on table "public"."customers" to "anon";

grant update on table "public"."customers" to "anon";

grant delete on table "public"."customers" to "authenticated";

grant insert on table "public"."customers" to "authenticated";

grant references on table "public"."customers" to "authenticated";

grant select on table "public"."customers" to "authenticated";

grant trigger on table "public"."customers" to "authenticated";

grant truncate on table "public"."customers" to "authenticated";

grant update on table "public"."customers" to "authenticated";

grant delete on table "public"."customers" to "service_role";

grant insert on table "public"."customers" to "service_role";

grant references on table "public"."customers" to "service_role";

grant select on table "public"."customers" to "service_role";

grant trigger on table "public"."customers" to "service_role";

grant truncate on table "public"."customers" to "service_role";

grant update on table "public"."customers" to "service_role";

grant delete on table "public"."freelancer_experiences" to "anon";

grant insert on table "public"."freelancer_experiences" to "anon";

grant references on table "public"."freelancer_experiences" to "anon";

grant select on table "public"."freelancer_experiences" to "anon";

grant trigger on table "public"."freelancer_experiences" to "anon";

grant truncate on table "public"."freelancer_experiences" to "anon";

grant update on table "public"."freelancer_experiences" to "anon";

grant delete on table "public"."freelancer_experiences" to "authenticated";

grant insert on table "public"."freelancer_experiences" to "authenticated";

grant references on table "public"."freelancer_experiences" to "authenticated";

grant select on table "public"."freelancer_experiences" to "authenticated";

grant trigger on table "public"."freelancer_experiences" to "authenticated";

grant truncate on table "public"."freelancer_experiences" to "authenticated";

grant update on table "public"."freelancer_experiences" to "authenticated";

grant delete on table "public"."freelancer_experiences" to "service_role";

grant insert on table "public"."freelancer_experiences" to "service_role";

grant references on table "public"."freelancer_experiences" to "service_role";

grant select on table "public"."freelancer_experiences" to "service_role";

grant trigger on table "public"."freelancer_experiences" to "service_role";

grant truncate on table "public"."freelancer_experiences" to "service_role";

grant update on table "public"."freelancer_experiences" to "service_role";

grant delete on table "public"."invoice_comments" to "anon";

grant insert on table "public"."invoice_comments" to "anon";

grant references on table "public"."invoice_comments" to "anon";

grant select on table "public"."invoice_comments" to "anon";

grant trigger on table "public"."invoice_comments" to "anon";

grant truncate on table "public"."invoice_comments" to "anon";

grant update on table "public"."invoice_comments" to "anon";

grant delete on table "public"."invoice_comments" to "authenticated";

grant insert on table "public"."invoice_comments" to "authenticated";

grant references on table "public"."invoice_comments" to "authenticated";

grant select on table "public"."invoice_comments" to "authenticated";

grant trigger on table "public"."invoice_comments" to "authenticated";

grant truncate on table "public"."invoice_comments" to "authenticated";

grant update on table "public"."invoice_comments" to "authenticated";

grant delete on table "public"."invoice_comments" to "service_role";

grant insert on table "public"."invoice_comments" to "service_role";

grant references on table "public"."invoice_comments" to "service_role";

grant select on table "public"."invoice_comments" to "service_role";

grant trigger on table "public"."invoice_comments" to "service_role";

grant truncate on table "public"."invoice_comments" to "service_role";

grant update on table "public"."invoice_comments" to "service_role";

grant delete on table "public"."invoice_templates" to "anon";

grant insert on table "public"."invoice_templates" to "anon";

grant references on table "public"."invoice_templates" to "anon";

grant select on table "public"."invoice_templates" to "anon";

grant trigger on table "public"."invoice_templates" to "anon";

grant truncate on table "public"."invoice_templates" to "anon";

grant update on table "public"."invoice_templates" to "anon";

grant delete on table "public"."invoice_templates" to "authenticated";

grant insert on table "public"."invoice_templates" to "authenticated";

grant references on table "public"."invoice_templates" to "authenticated";

grant select on table "public"."invoice_templates" to "authenticated";

grant trigger on table "public"."invoice_templates" to "authenticated";

grant truncate on table "public"."invoice_templates" to "authenticated";

grant update on table "public"."invoice_templates" to "authenticated";

grant delete on table "public"."invoice_templates" to "service_role";

grant insert on table "public"."invoice_templates" to "service_role";

grant references on table "public"."invoice_templates" to "service_role";

grant select on table "public"."invoice_templates" to "service_role";

grant trigger on table "public"."invoice_templates" to "service_role";

grant truncate on table "public"."invoice_templates" to "service_role";

grant update on table "public"."invoice_templates" to "service_role";

grant delete on table "public"."invoices" to "anon";

grant insert on table "public"."invoices" to "anon";

grant references on table "public"."invoices" to "anon";

grant select on table "public"."invoices" to "anon";

grant trigger on table "public"."invoices" to "anon";

grant truncate on table "public"."invoices" to "anon";

grant update on table "public"."invoices" to "anon";

grant delete on table "public"."invoices" to "authenticated";

grant insert on table "public"."invoices" to "authenticated";

grant references on table "public"."invoices" to "authenticated";

grant select on table "public"."invoices" to "authenticated";

grant trigger on table "public"."invoices" to "authenticated";

grant truncate on table "public"."invoices" to "authenticated";

grant update on table "public"."invoices" to "authenticated";

grant delete on table "public"."invoices" to "service_role";

grant insert on table "public"."invoices" to "service_role";

grant references on table "public"."invoices" to "service_role";

grant select on table "public"."invoices" to "service_role";

grant trigger on table "public"."invoices" to "service_role";

grant truncate on table "public"."invoices" to "service_role";

grant update on table "public"."invoices" to "service_role";

grant delete on table "public"."jobs" to "anon";

grant insert on table "public"."jobs" to "anon";

grant references on table "public"."jobs" to "anon";

grant select on table "public"."jobs" to "anon";

grant trigger on table "public"."jobs" to "anon";

grant truncate on table "public"."jobs" to "anon";

grant update on table "public"."jobs" to "anon";

grant delete on table "public"."jobs" to "authenticated";

grant insert on table "public"."jobs" to "authenticated";

grant references on table "public"."jobs" to "authenticated";

grant select on table "public"."jobs" to "authenticated";

grant trigger on table "public"."jobs" to "authenticated";

grant truncate on table "public"."jobs" to "authenticated";

grant update on table "public"."jobs" to "authenticated";

grant delete on table "public"."jobs" to "service_role";

grant insert on table "public"."jobs" to "service_role";

grant references on table "public"."jobs" to "service_role";

grant select on table "public"."jobs" to "service_role";

grant trigger on table "public"."jobs" to "service_role";

grant truncate on table "public"."jobs" to "service_role";

grant update on table "public"."jobs" to "service_role";

grant delete on table "public"."transaction_attachments" to "anon";

grant insert on table "public"."transaction_attachments" to "anon";

grant references on table "public"."transaction_attachments" to "anon";

grant select on table "public"."transaction_attachments" to "anon";

grant trigger on table "public"."transaction_attachments" to "anon";

grant truncate on table "public"."transaction_attachments" to "anon";

grant update on table "public"."transaction_attachments" to "anon";

grant delete on table "public"."transaction_attachments" to "authenticated";

grant insert on table "public"."transaction_attachments" to "authenticated";

grant references on table "public"."transaction_attachments" to "authenticated";

grant select on table "public"."transaction_attachments" to "authenticated";

grant trigger on table "public"."transaction_attachments" to "authenticated";

grant truncate on table "public"."transaction_attachments" to "authenticated";

grant update on table "public"."transaction_attachments" to "authenticated";

grant delete on table "public"."transaction_attachments" to "service_role";

grant insert on table "public"."transaction_attachments" to "service_role";

grant references on table "public"."transaction_attachments" to "service_role";

grant select on table "public"."transaction_attachments" to "service_role";

grant trigger on table "public"."transaction_attachments" to "service_role";

grant truncate on table "public"."transaction_attachments" to "service_role";

grant update on table "public"."transaction_attachments" to "service_role";

grant delete on table "public"."users_on_company" to "anon";

grant insert on table "public"."users_on_company" to "anon";

grant references on table "public"."users_on_company" to "anon";

grant select on table "public"."users_on_company" to "anon";

grant trigger on table "public"."users_on_company" to "anon";

grant truncate on table "public"."users_on_company" to "anon";

grant update on table "public"."users_on_company" to "anon";

grant delete on table "public"."users_on_company" to "authenticated";

grant insert on table "public"."users_on_company" to "authenticated";

grant references on table "public"."users_on_company" to "authenticated";

grant select on table "public"."users_on_company" to "authenticated";

grant trigger on table "public"."users_on_company" to "authenticated";

grant truncate on table "public"."users_on_company" to "authenticated";

grant update on table "public"."users_on_company" to "authenticated";

grant delete on table "public"."users_on_company" to "service_role";

grant insert on table "public"."users_on_company" to "service_role";

grant references on table "public"."users_on_company" to "service_role";

grant select on table "public"."users_on_company" to "service_role";

grant trigger on table "public"."users_on_company" to "service_role";

grant truncate on table "public"."users_on_company" to "service_role";

grant update on table "public"."users_on_company" to "service_role";


