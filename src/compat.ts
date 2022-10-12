import { Express } from "./Express";

/**
 * Legacy factory function for Express.
 */
export function express(): Express {
  return new Express();
}
