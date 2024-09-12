create table "public"."freelancers" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid default gen_random_uuid(),
    "headline" text,
    "is_active" boolean not null default false,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone default now(),
    "hourly_rate" smallint,
    "experience_years" smallint,
    "bio" text
);


alter table "public"."freelancers" enable row level security;

CREATE UNIQUE INDEX freelancers_pkey ON public.freelancers USING btree (id);

alter table "public"."freelancers" add constraint "freelancers_pkey" PRIMARY KEY using index "freelancers_pkey";

alter table "public"."freelancers" add constraint "public_freelancers_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."freelancers" validate constraint "public_freelancers_user_id_fkey";

grant delete on table "public"."freelancers" to "anon";

grant insert on table "public"."freelancers" to "anon";

grant references on table "public"."freelancers" to "anon";

grant select on table "public"."freelancers" to "anon";

grant trigger on table "public"."freelancers" to "anon";

grant truncate on table "public"."freelancers" to "anon";

grant update on table "public"."freelancers" to "anon";

grant delete on table "public"."freelancers" to "authenticated";

grant insert on table "public"."freelancers" to "authenticated";

grant references on table "public"."freelancers" to "authenticated";

grant select on table "public"."freelancers" to "authenticated";

grant trigger on table "public"."freelancers" to "authenticated";

grant truncate on table "public"."freelancers" to "authenticated";

grant update on table "public"."freelancers" to "authenticated";

grant delete on table "public"."freelancers" to "service_role";

grant insert on table "public"."freelancers" to "service_role";

grant references on table "public"."freelancers" to "service_role";

grant select on table "public"."freelancers" to "service_role";

grant trigger on table "public"."freelancers" to "service_role";

grant truncate on table "public"."freelancers" to "service_role";

grant update on table "public"."freelancers" to "service_role";