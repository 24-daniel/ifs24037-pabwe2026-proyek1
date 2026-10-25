import { beforeEach, describe, expect, it, vi } from "vitest";
import { apiRequest } from "../../../helpers/apiHelper.js";
import { loginApi, registerApi } from "./authApi.js";

vi.mock("../../../helpers/apiHelper.js", () => ({ apiRequest: vi.fn() }));

describe("authApi", () => {
  beforeEach(() => vi.clearAllMocks());

  it("registerApi mengirim POST ke /auth/register", async () => {
    const payload = { username: "daniel" };
    await registerApi(payload);
    expect(apiRequest).toHaveBeenCalledWith("/auth/register", { method: "POST", body: payload });
  });

  it("loginApi mengirim POST ke /auth/login", async () => {
    const credentials = { email: "a@b.co", password: "12345678" };
    await loginApi(credentials);
    expect(apiRequest).toHaveBeenCalledWith("/auth/login", { method: "POST", body: credentials });
  });
});