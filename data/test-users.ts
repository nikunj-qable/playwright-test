/**
 * Long-lived accounts come from the environment — never commit real credentials (spec §7.1).
 * Data the tests create themselves is generated instead; see utils/test-data.factory.
 */
export interface TestUser {
  email: string;
  password: string;
}

export const credentials: Record<"standard" | "admin", TestUser> = {
  standard: {
    email: process.env.STANDARD_USER_EMAIL ?? "",
    password: process.env.STANDARD_USER_PASSWORD ?? "",
  },
  admin: {
    email: process.env.ADMIN_USER_EMAIL ?? "",
    password: process.env.ADMIN_USER_PASSWORD ?? "",
  },
};
