import { beforeEach, describe, expect, it, vi } from "vitest";
import { apiRequest } from "../../../helpers/apiHelper.js";
import { createEventApi, deleteEventApi, fetchEventApi, fetchEventsApi, updateEventApi } from "./eventApi.js";

vi.mock("../../../helpers/apiHelper.js", () => ({ apiRequest: vi.fn() }));

describe("eventApi", () => {
  beforeEach(() => vi.clearAllMocks());

  it("mengambil daftar dan detail kegiatan", async () => {
    const params = { search: "doa" };
    await fetchEventsApi(params);
    await fetchEventApi("5");
    expect(apiRequest).toHaveBeenNthCalledWith(1, "/events", { params });
    expect(apiRequest).toHaveBeenNthCalledWith(2, "/events/5");
  });

  it("membuat, mengubah, dan menghapus kegiatan", async () => {
    const payload = { title: "Ibadah" };
    await createEventApi(payload);
    await updateEventApi("5", payload);
    await deleteEventApi("5");
    expect(apiRequest).toHaveBeenNthCalledWith(1, "/events", { method: "POST", body: payload });
    expect(apiRequest).toHaveBeenNthCalledWith(2, "/events/5", { method: "PUT", body: payload });
    expect(apiRequest).toHaveBeenNthCalledWith(3, "/events/5", { method: "DELETE" });
  });
});