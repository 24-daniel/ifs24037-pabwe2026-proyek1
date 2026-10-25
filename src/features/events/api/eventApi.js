import { apiRequest } from "../../../helpers/apiHelper.js";

export const fetchEventsApi = (params) => apiRequest("/events", { params });
export const fetchEventApi = (id) => apiRequest(`/events/${id}`);
export const createEventApi = (payload) => apiRequest("/events", { method: "POST", body: payload });
export const updateEventApi = (id, payload) => apiRequest(`/events/${id}`, { method: "PUT", body: payload });
export const deleteEventApi = (id) => apiRequest(`/events/${id}`, { method: "DELETE" });
