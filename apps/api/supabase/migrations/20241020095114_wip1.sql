
drop function if exists "public"."get_revenue_v2"(team_id uuid, date_from date, date_to date, base_currency text);


alter table "public"."users" add column "is_onboarded" boolean not null default false;


alter table "skill_assessment"."questions" add column "skill_id" uuid;

alter table "skill_assessment"."questions" add constraint "fk_skill_id" FOREIGN KEY (skill_id) REFERENCES skill_assessment.skills(id) not valid;

alter table "skill_assessment"."questions" validate constraint "fk_skill_id";

grant delete on table "skill_assessment"."question_options" to "anon";

grant insert on table "skill_assessment"."question_options" to "anon";

grant references on table "skill_assessment"."question_options" to "anon";

grant select on table "skill_assessment"."question_options" to "anon";

grant trigger on table "skill_assessment"."question_options" to "anon";

grant truncate on table "skill_assessment"."question_options" to "anon";

grant update on table "skill_assessment"."question_options" to "anon";

grant delete on table "skill_assessment"."question_options" to "authenticated";

grant insert on table "skill_assessment"."question_options" to "authenticated";

grant references on table "skill_assessment"."question_options" to "authenticated";

grant select on table "skill_assessment"."question_options" to "authenticated";

grant trigger on table "skill_assessment"."question_options" to "authenticated";

grant truncate on table "skill_assessment"."question_options" to "authenticated";

grant update on table "skill_assessment"."question_options" to "authenticated";

grant delete on table "skill_assessment"."question_options" to "service_role";

grant insert on table "skill_assessment"."question_options" to "service_role";

grant references on table "skill_assessment"."question_options" to "service_role";

grant select on table "skill_assessment"."question_options" to "service_role";

grant trigger on table "skill_assessment"."question_options" to "service_role";

grant truncate on table "skill_assessment"."question_options" to "service_role";

grant update on table "skill_assessment"."question_options" to "service_role";

grant delete on table "skill_assessment"."question_skill_topic_weights" to "anon";

grant insert on table "skill_assessment"."question_skill_topic_weights" to "anon";

grant references on table "skill_assessment"."question_skill_topic_weights" to "anon";

grant select on table "skill_assessment"."question_skill_topic_weights" to "anon";

grant trigger on table "skill_assessment"."question_skill_topic_weights" to "anon";

grant truncate on table "skill_assessment"."question_skill_topic_weights" to "anon";

grant update on table "skill_assessment"."question_skill_topic_weights" to "anon";

grant delete on table "skill_assessment"."question_skill_topic_weights" to "authenticated";

grant insert on table "skill_assessment"."question_skill_topic_weights" to "authenticated";

grant references on table "skill_assessment"."question_skill_topic_weights" to "authenticated";

grant select on table "skill_assessment"."question_skill_topic_weights" to "authenticated";

grant trigger on table "skill_assessment"."question_skill_topic_weights" to "authenticated";

grant truncate on table "skill_assessment"."question_skill_topic_weights" to "authenticated";

grant update on table "skill_assessment"."question_skill_topic_weights" to "authenticated";

grant delete on table "skill_assessment"."question_skill_topic_weights" to "service_role";

grant insert on table "skill_assessment"."question_skill_topic_weights" to "service_role";

grant references on table "skill_assessment"."question_skill_topic_weights" to "service_role";

grant select on table "skill_assessment"."question_skill_topic_weights" to "service_role";

grant trigger on table "skill_assessment"."question_skill_topic_weights" to "service_role";

grant truncate on table "skill_assessment"."question_skill_topic_weights" to "service_role";

grant update on table "skill_assessment"."question_skill_topic_weights" to "service_role";

grant delete on table "skill_assessment"."questions" to "anon";

grant insert on table "skill_assessment"."questions" to "anon";

grant references on table "skill_assessment"."questions" to "anon";

grant select on table "skill_assessment"."questions" to "anon";

grant trigger on table "skill_assessment"."questions" to "anon";

grant truncate on table "skill_assessment"."questions" to "anon";

grant update on table "skill_assessment"."questions" to "anon";

grant delete on table "skill_assessment"."questions" to "authenticated";

grant insert on table "skill_assessment"."questions" to "authenticated";

grant references on table "skill_assessment"."questions" to "authenticated";

grant select on table "skill_assessment"."questions" to "authenticated";

grant trigger on table "skill_assessment"."questions" to "authenticated";

grant truncate on table "skill_assessment"."questions" to "authenticated";

grant update on table "skill_assessment"."questions" to "authenticated";

grant delete on table "skill_assessment"."questions" to "service_role";

grant insert on table "skill_assessment"."questions" to "service_role";

grant references on table "skill_assessment"."questions" to "service_role";

grant select on table "skill_assessment"."questions" to "service_role";

grant trigger on table "skill_assessment"."questions" to "service_role";

grant truncate on table "skill_assessment"."questions" to "service_role";

grant update on table "skill_assessment"."questions" to "service_role";

grant delete on table "skill_assessment"."responses" to "anon";

grant insert on table "skill_assessment"."responses" to "anon";

grant references on table "skill_assessment"."responses" to "anon";

grant select on table "skill_assessment"."responses" to "anon";

grant trigger on table "skill_assessment"."responses" to "anon";

grant truncate on table "skill_assessment"."responses" to "anon";

grant update on table "skill_assessment"."responses" to "anon";

grant delete on table "skill_assessment"."responses" to "authenticated";

grant insert on table "skill_assessment"."responses" to "authenticated";

grant references on table "skill_assessment"."responses" to "authenticated";

grant select on table "skill_assessment"."responses" to "authenticated";

grant trigger on table "skill_assessment"."responses" to "authenticated";

grant truncate on table "skill_assessment"."responses" to "authenticated";

grant update on table "skill_assessment"."responses" to "authenticated";

grant delete on table "skill_assessment"."responses" to "service_role";

grant insert on table "skill_assessment"."responses" to "service_role";

grant references on table "skill_assessment"."responses" to "service_role";

grant select on table "skill_assessment"."responses" to "service_role";

grant trigger on table "skill_assessment"."responses" to "service_role";

grant truncate on table "skill_assessment"."responses" to "service_role";

grant update on table "skill_assessment"."responses" to "service_role";

grant delete on table "skill_assessment"."skill_topics" to "anon";

grant insert on table "skill_assessment"."skill_topics" to "anon";

grant references on table "skill_assessment"."skill_topics" to "anon";

grant select on table "skill_assessment"."skill_topics" to "anon";

grant trigger on table "skill_assessment"."skill_topics" to "anon";

grant truncate on table "skill_assessment"."skill_topics" to "anon";

grant update on table "skill_assessment"."skill_topics" to "anon";

grant delete on table "skill_assessment"."skill_topics" to "authenticated";

grant insert on table "skill_assessment"."skill_topics" to "authenticated";

grant references on table "skill_assessment"."skill_topics" to "authenticated";

grant select on table "skill_assessment"."skill_topics" to "authenticated";

grant trigger on table "skill_assessment"."skill_topics" to "authenticated";

grant truncate on table "skill_assessment"."skill_topics" to "authenticated";

grant update on table "skill_assessment"."skill_topics" to "authenticated";

grant delete on table "skill_assessment"."skill_topics" to "service_role";

grant insert on table "skill_assessment"."skill_topics" to "service_role";

grant references on table "skill_assessment"."skill_topics" to "service_role";

grant select on table "skill_assessment"."skill_topics" to "service_role";

grant trigger on table "skill_assessment"."skill_topics" to "service_role";

grant truncate on table "skill_assessment"."skill_topics" to "service_role";

grant update on table "skill_assessment"."skill_topics" to "service_role";

grant delete on table "skill_assessment"."skills" to "anon";

grant insert on table "skill_assessment"."skills" to "anon";

grant references on table "skill_assessment"."skills" to "anon";

grant select on table "skill_assessment"."skills" to "anon";

grant trigger on table "skill_assessment"."skills" to "anon";

grant truncate on table "skill_assessment"."skills" to "anon";

grant update on table "skill_assessment"."skills" to "anon";

grant delete on table "skill_assessment"."skills" to "authenticated";

grant insert on table "skill_assessment"."skills" to "authenticated";

grant references on table "skill_assessment"."skills" to "authenticated";

grant select on table "skill_assessment"."skills" to "authenticated";

grant trigger on table "skill_assessment"."skills" to "authenticated";

grant truncate on table "skill_assessment"."skills" to "authenticated";

grant update on table "skill_assessment"."skills" to "authenticated";

grant delete on table "skill_assessment"."skills" to "service_role";

grant insert on table "skill_assessment"."skills" to "service_role";

grant references on table "skill_assessment"."skills" to "service_role";

grant select on table "skill_assessment"."skills" to "service_role";

grant trigger on table "skill_assessment"."skills" to "service_role";

grant truncate on table "skill_assessment"."skills" to "service_role";

grant update on table "skill_assessment"."skills" to "service_role";


