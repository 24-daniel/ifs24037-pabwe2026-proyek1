import { onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { debounce } from "../../../helpers/toolsHelper.js";
import { useEventsStore } from "../states/eventsStore.js";

const SEARCH_DELAY_MS = 300;

/** Daftar kegiatan dengan pencarian dan filter kategori, dipakai halaman Jadwal dan Kelola. */
export function useEventList() {
  const store = useEventsStore();
  const { events, isLoading, errorMessage } = storeToRefs(store);
  const search = ref("");
  const category = ref("");

  const loadEvents = () => store.fetchEvents({ search: search.value, category: category.value });

  watch(search, debounce(loadEvents, SEARCH_DELAY_MS));
  watch(category, loadEvents);
  onMounted(loadEvents);

  return { events, isLoading, errorMessage, search, category, loadEvents };
}
