alter table
    "public"."freelancers" drop column "hourly_rate";

alter table
    "public"."freelancers"
add
    column "daily_rate" smallint;

alter table
    "public"."freelancers"
add
    column "preferred_work_style" text;

alter table
    "public"."freelancers"
add
    column "vat_number" text;

alter table
    "public"."users"
add
    column "locale" text;