import { z } from "zod";

export const changeUserRoleSchema = z.object({
  userId: z.string(),
  teamId: z.string(),
  role: z.enum(["owner", "member"]),
  revalidatePath: z.string().optional(),
});

export const deleteTeamMemberSchema = z.object({
  userId: z.string(),
  teamId: z.string(),
  revalidatePath: z.string().optional(),
});

export const leaveTeamSchema = z.object({
  teamId: z.string(),
  redirectTo: z.string().optional(),
  role: z.enum(["owner", "member"]),
  revalidatePath: z.string().optional(),
});

export const inviteTeamMembersSchema = z.object({
  invites: z.array(
    z.object({
      email: z.string().email().optional(),
      role: z.enum(["owner", "member"]),
    }),
  ),
  redirectTo: z.string().optional(),
  revalidatePath: z.string().optional(),
});

export type InviteTeamMembersFormValues = z.infer<
  typeof inviteTeamMembersSchema
>;

export const deleteInviteSchema = z.object({
  id: z.string(),
  revalidatePath: z.string().optional(),
});
