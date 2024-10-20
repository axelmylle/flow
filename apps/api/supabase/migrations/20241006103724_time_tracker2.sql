-- alter table
--     "public"."transaction_categories" drop constraint "transaction_categories_slug_team_id_unique";
-- alter table
--     "public"."transactions" drop constraint "transactions_category_slug_team_id_fkey";
-- drop index if exists "public"."transaction_categories_slug_team_id_unique";
set
    check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_profit_v3(team_id uuid, date_from date, date_to date, base_currency text DEFAULT NULL::text)
 RETURNS TABLE(date timestamp with time zone, value numeric, currency text)
 LANGUAGE plpgsql
AS $function$
declare
    target_currency text;
begin
    if get_profit_v3.base_currency is not null then
        target_currency := get_profit_v3.base_currency;
    else
        select teams.base_currency into target_currency
        from teams
        where teams.id = get_profit_v3.team_id;
    end if;

  return query
    select
      date_trunc('month', month_series) as date,
      coalesce(sum(
        case
          when get_profit_v3.base_currency is not null then t.amount
          else t.base_amount
        end
      ), 0) as value,
      target_currency as currency
    from
      generate_series(
        date_from::date,
        date_to::date,
        interval '1 month'
      ) as month_series
    left join transactions as t on date_trunc('month', t.date) = date_trunc('month', month_series)
      and t.team_id = get_profit_v3.team_id
      and t.category_slug != 'transfer'
      and t.status = 'posted'
      and (
        (get_profit_v3.base_currency is not null and t.currency = target_currency) or
        (get_profit_v3.base_currency is null and t.base_currency = target_currency)
      )
    group by
      date_trunc('month', month_series)
    order by
      date_trunc('month', month_series);
end;
$function$
;

CREATE OR REPLACE FUNCTION public.get_revenue_v2(team_id uuid, date_from date, date_to date, base_currency text DEFAULT NULL::text)
 RETURNS TABLE(date timestamp with time zone, value numeric, currency text)
 LANGUAGE plpgsql
AS $function$
declare
    target_currency text;
begin
    if get_revenue_v2.base_currency is not null then
        target_currency := get_revenue_v2.base_currency;
    else
        select teams.base_currency into target_currency
        from teams
        where teams.id = get_revenue_v2.team_id;
    end if;
  return query
    select
      date_trunc('month', month_series) as date,
      coalesce(sum(base_amount), 0) as value,
      target_currency as currency
    from
      generate_series(
        date_from::date,
        date_to::date,
        interval '1 month'
      ) as month_series
      left join transactions as t on date_trunc('month', t.date) = date_trunc('month', month_series)
      and t.team_id = get_revenue_v2.team_id
      and t.category_slug != 'transfer'
      and t.category_slug = 'income'
      and t.status = 'posted'
      and t.base_currency = target_currency
    group by
      date_trunc('month', month_series)
    order by
      date_trunc('month', month_series);
end;
$function$
;
CREATE OR REPLACE FUNCTION "public"."nanoid"("size" integer DEFAULT 21, "alphabet" "text" DEFAULT '_-0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'::"text", "additionalbytesfactor" double precision DEFAULT 1.6) RETURNS "text"
    LANGUAGE "plpgsql" PARALLEL SAFE
    AS $$
DECLARE
    alphabetArray  text[];
    alphabetLength int := 64;
    mask           int := 63;
    step           int := 34;
BEGIN
    IF size IS NULL OR size < 1 THEN
        RAISE EXCEPTION 'The size must be defined and greater than 0!';
    END IF;

    IF alphabet IS NULL OR length(alphabet) = 0 OR length(alphabet) > 255 THEN
        RAISE EXCEPTION 'The alphabet can''t be undefined, zero or bigger than 255 symbols!';
    END IF;

    IF additionalBytesFactor IS NULL OR additionalBytesFactor < 1 THEN
        RAISE EXCEPTION 'The additional bytes factor can''t be less than 1!';
    END IF;

    alphabetArray := regexp_split_to_array(alphabet, '');
    alphabetLength := array_length(alphabetArray, 1);
    mask := (2 << cast(floor(log(alphabetLength - 1) / log(2)) as int)) - 1;
    step := cast(ceil(additionalBytesFactor * mask * size / alphabetLength) AS int);

    IF step > 1024 THEN
        step := 1024; -- The step size % can''t be bigger then 1024!
    END IF;

    RETURN nanoid_optimized(size, alphabet, mask, step);
END
$$;

ALTER FUNCTION "public"."nanoid"("size" integer, "alphabet" "text", "additionalbytesfactor" double precision) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."nanoid_optimized"("size" integer, "alphabet" "text", "mask" integer, "step" integer) RETURNS "text"
    LANGUAGE "plpgsql" PARALLEL SAFE
    AS $$
DECLARE
    idBuilder      text := '';
    counter        int  := 0;
    bytes          bytea;
    alphabetIndex  int;
    alphabetArray  text[];
    alphabetLength int  := 64;
BEGIN
    alphabetArray := regexp_split_to_array(alphabet, '');
    alphabetLength := array_length(alphabetArray, 1);

    LOOP
        bytes := extensions.gen_random_bytes(step);
        FOR counter IN 0..step - 1
            LOOP
                alphabetIndex := (get_byte(bytes, counter) & mask) + 1;
                IF alphabetIndex <= alphabetLength THEN
                    idBuilder := idBuilder || alphabetArray[alphabetIndex];
                    IF length(idBuilder) = size THEN
                        RETURN idBuilder;
                    END IF;
                END IF;
            END LOOP;
    END LOOP;
END
$$;

ALTER FUNCTION "public"."nanoid_optimized"("size" integer, "alphabet" "text", "mask" integer, "step" integer) OWNER TO "postgres";


create table "public"."user_invites" (
    "code" text default nanoid(24),
    "created_at" timestamp with time zone default now(),
    "email" character varying,
    "id" uuid not null default uuid_generate_v4(),
    "invited_by" uuid,
    "role" teamroles,
    "team_id" uuid
);

CREATE UNIQUE INDEX user_invites_pkey ON public.user_invites USING btree (id);

alter table
    "public"."user_invites"
add
    constraint "user_invites_pkey" PRIMARY KEY using index "user_invites_pkey";

alter table
    "public"."user_invites"
add
    constraint "public_user_invites_team_id_fkey" FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE
SET
    NULL not valid;

alter table
    "public"."user_invites" validate constraint "public_user_invites_team_id_fkey";

alter table
    "public"."user_invites"
add
    constraint "user_invites_invited_by_fkey" FOREIGN KEY (invited_by) REFERENCES users(id) ON DELETE
SET
    NULL not valid;

alter table
    "public"."user_invites" validate constraint "user_invites_invited_by_fkey";

grant delete on table "public"."user_invites" to "anon";

grant
insert
    on table "public"."user_invites" to "anon";

grant references on table "public"."user_invites" to "anon";

grant
select
    on table "public"."user_invites" to "anon";

grant trigger on table "public"."user_invites" to "anon";

grant truncate on table "public"."user_invites" to "anon";

grant
update
    on table "public"."user_invites" to "anon";

grant delete on table "public"."user_invites" to "authenticated";

grant
insert
    on table "public"."user_invites" to "authenticated";

grant references on table "public"."user_invites" to "authenticated";

grant
select
    on table "public"."user_invites" to "authenticated";

grant trigger on table "public"."user_invites" to "authenticated";

grant truncate on table "public"."user_invites" to "authenticated";

grant
update
    on table "public"."user_invites" to "authenticated";

grant delete on table "public"."user_invites" to "service_role";

grant
insert
    on table "public"."user_invites" to "service_role";

grant references on table "public"."user_invites" to "service_role";

grant
select
    on table "public"."user_invites" to "service_role";

grant trigger on table "public"."user_invites" to "service_role";

grant truncate on table "public"."user_invites" to "service_role";

grant
update
    on table "public"."user_invites" to "service_role";

create schema if not exists "skill_assessment";

create type "skill_assessment"."question_type" as enum ('yes_no', 'multiple_choice', 'text');

create table "skill_assessment"."question_options" (
    "id" uuid not null default uuid_generate_v4(),
    "question_id" uuid not null,
    "content" text not null,
    "is_correct" boolean default false
);

create table "skill_assessment"."question_skill_topic_weights" (
    "question_id" uuid not null,
    "skill_topic_id" uuid not null,
    "weight" numeric not null
);

create table "skill_assessment"."questions" (
    "id" uuid not null default uuid_generate_v4(),
    "content" text not null,
    "type" skill_assessment.question_type not null,
    "created_at" timestamp with time zone default now(),
    "correct_answer" text
);

create table "skill_assessment"."responses" (
    "id" uuid not null default uuid_generate_v4(),
    "question_id" uuid not null,
    "candidate_id" uuid not null,
    "answer" text not null,
    "score" numeric not null,
    "created_at" timestamp with time zone default now()
);

create table "skill_assessment"."skill_topics" (
    "id" uuid not null default uuid_generate_v4(),
    "skill_id" uuid not null,
    "name" character varying(255) not null,
    "description" text
);

create table "skill_assessment"."skills" (
    "id" uuid not null default uuid_generate_v4(),
    "escoid" uuid not null,
    "name" character varying(255) not null
);

CREATE UNIQUE INDEX question_options_pkey ON skill_assessment.question_options USING btree (id);

CREATE UNIQUE INDEX question_skill_topic_weights_pkey ON skill_assessment.question_skill_topic_weights USING btree (question_id, skill_topic_id);

CREATE UNIQUE INDEX questions_pkey ON skill_assessment.questions USING btree (id);

CREATE UNIQUE INDEX responses_pkey ON skill_assessment.responses USING btree (id);

CREATE UNIQUE INDEX skill_topics_pkey ON skill_assessment.skill_topics USING btree (id);

CREATE UNIQUE INDEX skills_escoid_key ON skill_assessment.skills USING btree (escoid);

CREATE UNIQUE INDEX skills_pkey ON skill_assessment.skills USING btree (id);

alter table
    "skill_assessment"."question_options"
add
    constraint "question_options_pkey" PRIMARY KEY using index "question_options_pkey";

alter table
    "skill_assessment"."question_skill_topic_weights"
add
    constraint "question_skill_topic_weights_pkey" PRIMARY KEY using index "question_skill_topic_weights_pkey";

alter table
    "skill_assessment"."questions"
add
    constraint "questions_pkey" PRIMARY KEY using index "questions_pkey";

alter table
    "skill_assessment"."responses"
add
    constraint "responses_pkey" PRIMARY KEY using index "responses_pkey";

alter table
    "skill_assessment"."skill_topics"
add
    constraint "skill_topics_pkey" PRIMARY KEY using index "skill_topics_pkey";

alter table
    "skill_assessment"."skills"
add
    constraint "skills_pkey" PRIMARY KEY using index "skills_pkey";

alter table
    "skill_assessment"."question_options"
add
    constraint "fk_question_id" FOREIGN KEY (question_id) REFERENCES skill_assessment.questions(id) ON DELETE CASCADE not valid;

alter table
    "skill_assessment"."question_options" validate constraint "fk_question_id";

alter table
    "skill_assessment"."question_skill_topic_weights"
add
    constraint "fk_question_id" FOREIGN KEY (question_id) REFERENCES skill_assessment.questions(id) ON DELETE CASCADE not valid;

alter table
    "skill_assessment"."question_skill_topic_weights" validate constraint "fk_question_id";

alter table
    "skill_assessment"."question_skill_topic_weights"
add
    constraint "fk_skill_topic_id" FOREIGN KEY (skill_topic_id) REFERENCES skill_assessment.skill_topics(id) ON DELETE CASCADE not valid;

alter table
    "skill_assessment"."question_skill_topic_weights" validate constraint "fk_skill_topic_id";

alter table
    "skill_assessment"."responses"
add
    constraint "fk_question_id_response" FOREIGN KEY (question_id) REFERENCES skill_assessment.questions(id) ON DELETE CASCADE not valid;

alter table
    "skill_assessment"."responses" validate constraint "fk_question_id_response";

alter table
    "skill_assessment"."skill_topics"
add
    constraint "fk_skill_id" FOREIGN KEY (skill_id) REFERENCES skill_assessment.skills(id) ON DELETE CASCADE not valid;

alter table
    "skill_assessment"."skill_topics" validate constraint "fk_skill_id";

alter table
    "skill_assessment"."skills"
add
    constraint "skills_escoid_key" UNIQUE using index "skills_escoid_key";