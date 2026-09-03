import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";
import { user, ac, admin, superAdmin } from "./permissions";
export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [
    adminClient({
      ac,
      roles: {
        user,
        admin,
        superAdmin,
      },
    }),
  ],
});
