import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createEventApi, deleteEventApi, fetchEventApi, fetchEventsApi, updateEventApi } from "../api/eventApi.js";
import { useEventsStore } from "./eventsStore.js";

vi.mock("../api/eventApi.js", () => ({
  fetchEventsApi: vi.fn(),
  fetchEventApi: vi.fn(),
  createEventApi: vi.fn(),
  updateEventApi: vi.fn(),
  deleteEventApi: vi.fn(),
}));

describe("eventsStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it("fetchEvents mengisi daftar kegiatan", async () => {
    fetchEventsApi.mockResolvedValue([{ id: 1 }, { id: 2 }]);
    const store = useEventsStore();

    await store.fetchEvents({ search: "doa" });

    expect(fetchEventsApi).toHaveBeenCalledWith({ search: "doa" });
    expect(store.events).toEqual([{ id: 1 }, { id: 2 }]);
    expect(store.isLoading).toBe(false);
    expect(store.errorMessage).toBe("");
  });

  it("fetchEvents menyimpan pesan error saat gagal", async () => {
    fetchEventsApi.mockRejectedValue(new Error("Server mati"));
    const store = useEventsStore();

    await store.fetchEvents();

    expect(store.errorMessage).toBe("Server mati");
    expect(store.isLoading).toBe(false);
  });

  it("fetchEvent mengisi detail kegiatan", async () => {
    fetchEventApi.mockResolvedValue({ id: 7, title: "Rapat" });
    const store = useEventsStore();

    await store.fetchEvent(7);

    expect(store.event).toEqual({ id: 7, title: "Rapat" });
  });

  it("saveEvent membuat kegiatan baru bila tanpa id dan mengubah bila ada id", async () => {
    const store = useEventsStore();
    const payload = { title: "Ibadah" };

    await store.saveEvent(payload);
    await store.saveEvent(payload, 3);

    expect(createEventApi).toHaveBeenCalledWith(payload);
    expect(updateEventApi).toHaveBeenCalledWith(3, payload);
  });

  it("saveEvent melempar ulang error agar form bisa menampilkannya", async () => {
    createEventApi.mockRejectedValue(new Error("Tidak valid"));
    const store = useEventsStore();

    await expect(store.saveEvent({})).rejects.toThrow("Tidak valid");
  });

  it("removeEvent menghapus kegiatan lewat API", async () => {
    const store = useEventsStore();
    await store.removeEvent(9);
    expect(deleteEventApi).toHaveBeenCalledWith(9);
  });
});