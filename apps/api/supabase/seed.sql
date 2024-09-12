INSERT INTO
  auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    invited_at,
    confirmation_token,
    confirmation_sent_at,
    recovery_token,
    recovery_sent_at,
    email_change_token_new,
    email_change,
    email_change_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    created_at,
    updated_at,
    phone,
    phone_confirmed_at,
    phone_change,
    phone_change_token,
    phone_change_sent_at,
    email_change_token_current,
    email_change_confirm_status,
    banned_until,
    reauthentication_token,
    reauthentication_sent_at,
    is_sso_user,
    deleted_at
  )
VALUES
  (
    'd05f621d-80b7-53e7-82d0-ad542625719d',
    'e3e85881-afe0-52f7-9c33-a1d0f58836e7',
    'Partiendo non iudicur aut involuptat quid cum, temperdis ingenia statua quos epicores loco.',
    'Quo esse exerga tam exis et, undiae sit erit faciantur ad multa delectus autem.',
    'Daron_Kovacek27222@upload-special.name',
    'Sumus probant is cuiquamur nec dolorate ex reperate, sic posse ab tale nivem sit.',
    '2020-11-23T10:23:33.000Z',
    '2020-01-21T12:58:15.000Z',
    'Ex modo modarbitrer expetenim poetisfacil nostrum voluptata, censet motus ita quaedamation arbitration neque.',
    '2020-12-12T12:05:50.000Z',
    'Quas cupid postea vita illum.',
    '2020-07-03T06:21:19.000Z',
    'Tur quae ad delicural rationemus voluptas.',
    'Ultim doloresque atione ut frui nem, utilia extremum dubitione odum illum manendam.',
    '2020-11-23T22:59:46.000Z',
    '2020-08-16T20:07:51.000Z',
    '{"Non":"Noster eaque quis"}',
    '{"Etur":"Ant et"}',
    't',
    '2022-11-07T22:21:46.000Z',
    '2020-03-03T02:16:57.000Z',
    DEFAULT,
    '2020-12-08T11:50:38.000Z',
    DEFAULT,
    DEFAULT,
    '2020-07-23T06:52:10.000Z',
    DEFAULT,
    DEFAULT,
    '2020-09-09T20:45:19.000Z',
    DEFAULT,
    '2020-04-20T15:23:08.000Z',
    DEFAULT,
    '2020-08-16T08:03:39.000Z'
  ),
  (
    '47426b20-8b30-5113-83dc-6bfc02dc1c6c',
    'b1f5062a-09b6-5dc1-b18c-3800c5930eab',
    'Es ere desid potius quem, partitia consed allictorum si tamquam.',
    'Eas victi sapiens cum effecta, quos placet quisquam circo ant.',
    'Erwin.Douglas32000@simplistic-bulldozer.com',
    'Quibus verum ut excepere sit detracta.',
    '2020-11-03T10:26:36.000Z',
    '2020-06-06T17:31:39.000Z',
    'Multa utus nihil iisque vocet suspicio posset.',
    '2020-09-13T20:17:11.000Z',
    'Hoc vult vix dolorat quod susciplinguam sit dolordiamur.',
    '2020-05-13T04:44:39.000Z',
    'Dolorum per dolore aliosae et.',
    'Copulsa meliorum quis es saepe eorumquam inscientiam, te vero cum etiam adquiescerte sapiens desid possimis.',
    '2020-11-15T22:57:47.000Z',
    '2020-04-08T15:30:17.000Z',
    '{"Facet":"Abitur et"}',
    '{"Sensu":"Repellere stoicosopho"}',
    't',
    '2022-05-09T17:03:55.000Z',
    '2020-12-28T11:17:59.000Z',
    DEFAULT,
    '2020-10-06T10:01:38.000Z',
    DEFAULT,
    DEFAULT,
    '2020-07-23T18:47:30.000Z',
    DEFAULT,
    DEFAULT,
    '2020-06-02T17:55:35.000Z',
    DEFAULT,
    '2020-03-27T02:29:07.000Z',
    DEFAULT,
    '2020-11-19T11:00:25.000Z'
  ),
  (
    '889fd86a-2c28-5cd2-a928-d17e625532c3',
    '77a4350f-d747-5a7f-9e73-17fbb4cc41df',
    'De aut alique aut diffici nobis.',
    'Vel natur non exedunt etur numendum, philosit tur a si nihilii sit.',
    'Robyn_Marquardt70515@anxious-ladybug.com',
    'Animi municari culta malore ere sequamus mediocrium quae, malis voluptas ident metu quidem im.',
    '2020-03-27T14:54:18.000Z',
    '2020-12-04T12:08:09.000Z',
    'Continis sine terrogarum tem autem.',
    '2020-04-16T03:57:40.000Z',
    'Ignoratem modo ent duxit quid statuerin.',
    '2020-01-21T12:23:04.000Z',
    'Autem res quibus romante non, praeteraret es m mediocrisque ad pulchraeque.',
    'Vitae est mune entur voluptat velimum.',
    '2020-02-10T01:14:40.000Z',
    '2020-07-11T18:35:18.000Z',
    '{"Nec":"Feram ea manus"}',
    '{"Natur":"Num sine macedicium"}',
    'f',
    '2022-05-05T04:42:32.000Z',
    '2020-01-05T00:24:53.000Z',
    DEFAULT,
    '2020-03-23T14:43:51.000Z',
    DEFAULT,
    DEFAULT,
    '2020-04-16T04:00:00.000Z',
    DEFAULT,
    DEFAULT,
    '2020-11-27T10:56:21.000Z',
    DEFAULT,
    '2020-12-12T23:45:20.000Z',
    DEFAULT,
    '2020-04-20T03:59:22.000Z'
  );

INSERT INTO
  public.freelancers (
    id,
    user_id,
    headline,
    is_active,
    created_at,
    updated_at,
    hourly_rate,
    experience_years,
    bio
  )
VALUES
  (
    'ff5c75bd-1ccd-5b3b-aac3-34a31bfbd6fe',
    NULL,
    'Quid satis il nulla eo conscientia, magna disputo tolliturum scripta est.',
    DEFAULT,
    DEFAULT,
    DEFAULT,
    12,
    163,
    'Platone es cum exissemper opho.'
  ),
  (
    '90034ff5-b85c-596f-891f-53836ee764c6',
    NULL,
    'Maiorest non tamensibus rem plus proboribus me, adhibuitur num arendi non cognitat ad oporesse.',
    DEFAULT,
    DEFAULT,
    DEFAULT,
    84,
    187,
    'Quo id haec probitum aut suas sollicebit.'
  ),
  (
    'b0074e1b-9c92-5734-bb59-e8ab743e45bb',
    NULL,
    'Doceat praeteratum ipsa negaret vitae e.',
    DEFAULT,
    DEFAULT,
    DEFAULT,
    74,
    45,
    'Illa ex naturo ilem iditates esque periora singulos escere sapiena, in cursionissim ferri se quod nec.'
  );

UPDATE
  public.freelancers
SET
  user_id = 'e3e85881-afe0-52f7-9c33-a1d0f58836e7'
WHERE
  id = 'ff5c75bd-1ccd-5b3b-aac3-34a31bfbd6fe';

UPDATE
  public.freelancers
SET
  user_id = 'b1f5062a-09b6-5dc1-b18c-3800c5930eab'
WHERE
  id = '90034ff5-b85c-596f-891f-53836ee764c6';

UPDATE
  public.freelancers
SET
  user_id = '77a4350f-d747-5a7f-9e73-17fbb4cc41df'
WHERE
  id = 'b0074e1b-9c92-5734-bb59-e8ab743e45bb';