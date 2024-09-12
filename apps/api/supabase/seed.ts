import { copycat } from "@snaplet/copycat";
import {
  SeedClient,
  createSeedClient,
  type freelancersChildInputs,
} from "@snaplet/seed";

async function main() {
  const seed = await createSeedClient({ dryRun: true });

  const numberOfUsers = 3; // Adjust this number as needed

  const users = Array.from({ length: numberOfUsers }, (_, index) => ({
    id: copycat.uuid(`user-${index}`),
    email: copycat.email(`user-${index}`),
    full_name: copycat.fullName(`user-${index}`),
    created_at: copycat.dateString(`user-${index}`, {
      minYear: 2022,
      maxYear: 2023,
    }),
  }));

  await seed.auth_users(users);

  const freelancers: freelancersChildInputs = users.map((user) => ({
    user_id: user.id,
    bio: copycat.sentence(`freelancer-bio-${user.id}`, { maxWords: 10 }),
  }));

  await seed.freelancers(freelancers);

  process.exit();
}

main();
