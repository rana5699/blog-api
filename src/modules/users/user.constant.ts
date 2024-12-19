export const user_role = {
  user: 'user',
  admin: 'admin',
} as const;

export type TUserRole = keyof typeof user_role;
