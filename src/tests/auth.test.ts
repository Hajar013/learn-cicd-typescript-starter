import { describe, expect, test } from "vitest";
import { getAPIKey } from "../api/auth";
import type { IncomingHttpHeaders } from "http";

describe("getAPIKey", () => {
  test("returns the API key when authorization header is valid", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey my-secret-key",
    };
expect(getAPIKey(headers)).toBe("my-secret-key");

  });

  test("returns null when authorization header is missing", () => {
    const headers: IncomingHttpHeaders = {};

    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns null when authorization header uses wrong scheme", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "Bearer my-secret-key",
    };

    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns null when authorization header has no key", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey",
    };

    expect(getAPIKey(headers)).toBeNull();
  });
});
