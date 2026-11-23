import { randomUUID } from "node:crypto";

/**
 * Every identifier a test creates is tagged and uses a reserved domain, so generated data is
 * always recognisable and safe to bulk-clean — and a suite run a thousand times never floods
 * the target application with plausible-looking junk.
 */
const TAG = "qa-tesbo";

/** The reserved domain, used unless the application under test requires a specific one. */
export const DEFAULT_EMAIL_DOMAIN = "test-domain.example";

/**
 * Pass a `domain` when the application only accepts addresses at a particular one — a signup
 * form that rejects unknown domains, or a flow whose whole point is a specific mail provider.
 * Whichever domain is used, the local part stays tagged, so the data is still disposable.
 */
export function uniqueEmail(domain = DEFAULT_EMAIL_DOMAIN, prefix = TAG): string {
  return `${prefix}-${randomUUID().slice(0, 8)}@${domain}`;
}

export function uniquePassword(): string {
  return `Tesbo!${randomUUID().slice(0, 8)}A1`;
}

/** For applications that reject symbols in passwords — plenty of them do. */
export function uniqueAlphanumericPassword(): string {
  return `Tesbo${randomUUID().slice(0, 8)}A1`;
}

export function uniqueName(label: string): string {
  return `${TAG}-${label}-${randomUUID().slice(0, 6)}`;
}

export function newUser(domain = DEFAULT_EMAIL_DOMAIN): { email: string; password: string } {
  return { email: uniqueEmail(domain), password: uniquePassword() };
}
