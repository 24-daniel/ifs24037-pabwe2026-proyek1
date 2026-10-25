import { apiRequest } from "../../../helpers/apiHelper.js";

export const registerApi = (payload) => apiRequest("/auth/register", { method: "POST", body: payload });
export const loginApi = (credentials) => apiRequest("/auth/login", { method: "POST", body: credentials });
