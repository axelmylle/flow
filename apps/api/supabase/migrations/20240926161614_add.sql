create schema if not exists "_supavisor";


create type "public"."account_type" as enum ('depository', 'credit', 'other_asset', 'loan', 'other_liability');

create type "public"."bank_providers" as enum ('gocardless', 'plaid', 'teller');

create type "public"."bankproviders" as enum ('gocardless', 'plaid', 'teller');

create type "public"."connection_status" as enum ('disconnected', 'connected', 'unknown');

create type "public"."inbox_status" as enum ('processing', 'pending', 'archived', 'new', 'deleted');

create type "public"."inbox_type" as enum ('invoice', 'expense');

create type "public"."reporttypes" as enum ('profit', 'revenue', 'burn_rate', 'expense');

create type "public"."teamroles" as enum ('owner', 'member');

create type "public"."trackerstatus" as enum ('in_progress', 'completed');

create type "public"."transaction_frequency" as enum ('weekly', 'biweekly', 'monthly', 'semi_monthly', 'annually', 'irregular', 'unknown');

create type "public"."transactioncategories" as enum ('travel', 'office_supplies', 'meals', 'software', 'rent', 'income', 'equipment', 'transfer', 'internet_and_telephone', 'facilities_expenses', 'activity', 'uncategorized', 'taxes', 'other', 'salary', 'fees');

create type "public"."transactionmethods" as enum ('payment', 'card_purchase', 'card_atm', 'transfer', 'other', 'unknown', 'ach', 'interest', 'deposit', 'wire', 'fee');

create type "public"."transactionstatus" as enum ('posted', 'pending', 'excluded', 'completed');

create policy "select_own_profile"
on "public"."freelancers"
as permissive
for select
to authenticated
using ((auth.uid() = user_id));


create policy "update_own_profile"
on "public"."freelancers"
as permissive
for update
to public
using ((auth.uid() = user_id));



