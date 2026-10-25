import { createPinia } from "pinia";
import { createApp, nextTick } from "vue";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { fetchEventsApi } from "../api/eventApi.js";
import { useEventList } from "./useEventList.js";

vi.mock("../api/eventApi.js", () => ({
  fetchEventsApi: vi.fn(),
  fetchEventApi: vi.fn(),
  createEventApi: vi.fn(),
  updateEventApi: vi.fn(),
  deleteEventApi: vi.fn(),
}));

/** Menjalankan composable di dalam komponen sungguhan agar onMounted dan watch aktif. */
function mountComposable() {
  let result;
  const app = createApp({
    setup() {
      result = useEventList();
      return () => null;
    },
  });
  app.use(createPinia());
  app.mount(document.createElement("div"));
  return result;
}

describe("useEventList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    fetchEventsApi.mockResolvedValue([{ id: 1 }]);
  });

  it("memuat kegiatan saat dipasang", async () => {
    const list = mountComposable();
    await nextTick();
    expect(fetchEventsApi).toHaveBeenCalledWith({ search: "", category: "" });
    await vi.waitFor(() => expect(list.events.value).toEqual([{ id: 1 }]));
  });

  it("memuat ulang saat kategori berubah", async () => {
    const list = mountComposable();
    await nextTick();
    list.category.value = "doa";
    await nextTick();
    expect(fetchEventsApi).toHaveBeenLastCalledWith({ search: "", category: "doa" });
  });
});