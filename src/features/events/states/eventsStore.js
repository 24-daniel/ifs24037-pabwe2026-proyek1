import { ref } from "vue";
import { defineStore } from "pinia";
import { createEventApi, deleteEventApi, fetchEventApi, fetchEventsApi, updateEventApi } from "../api/eventApi.js";

export const useEventsStore = defineStore("events", () => {
  const events = ref([]);
  const event = ref(null);
  const isLoading = ref(false);
  const errorMessage = ref("");

  /** Untuk pembacaan data: error disimpan sebagai pesan agar ditampilkan di halaman. */
  async function load(task) {
    isLoading.value = true;
    errorMessage.value = "";
    try {
      await task();
    } catch (error) {
      errorMessage.value = error.message;
    } finally {
      isLoading.value = false;
    }
  }

  const fetchEvents = (filters) =>
    load(async () => {
      events.value = await fetchEventsApi(filters);
    });

  const fetchEvent = (id) =>
    load(async () => {
      event.value = null;
      event.value = await fetchEventApi(id);
    });

  /** Untuk perubahan data: error dilempar ulang agar form bisa menampilkan detailnya. */
  const saveEvent = (payload, id = null) => (id ? updateEventApi(id, payload) : createEventApi(payload));
  const removeEvent = (id) => deleteEventApi(id);

  return { events, event, isLoading, errorMessage, fetchEvents, fetchEvent, saveEvent, removeEvent };
});
