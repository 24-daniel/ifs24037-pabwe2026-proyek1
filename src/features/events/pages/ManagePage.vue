<script setup>
import { ref } from "vue";
import { Plus } from "lucide-vue-next";
import { showConfirmDialog, showErrorDialog, showSuccessDialog } from "../../../helpers/toolsHelper.js";
import AsyncState from "../../common/components/AsyncState.vue";
import EventCard from "../components/EventCard.vue";
import EventFilters from "../components/EventFilters.vue";
import { useEventList } from "../hooks/useEventList.js";
import EventFormModal from "../modals/EventFormModal.vue";
import { useEventsStore } from "../states/eventsStore.js";

const VALIDATION_ERROR_STATUS = 422;

const store = useEventsStore();
const { events, isLoading, errorMessage, search, category, loadEvents } = useEventList();

const modalRef = ref(null);
const formErrors = ref({});
const isSaving = ref(false);

function openForm(event = null) {
  formErrors.value = {};
  modalRef.value.open(event);
}

async function handleSubmit({ id, payload }) {
  isSaving.value = true;
  formErrors.value = {};
  try {
    await store.saveEvent(payload, id);
    modalRef.value.close();
    await showSuccessDialog(id ? "Kegiatan diperbarui" : "Kegiatan ditambahkan");
    await loadEvents();
  } catch (error) {
    if (error.status === VALIDATION_ERROR_STATUS) formErrors.value = error.errors;
    else await showErrorDialog(error.message);
  } finally {
    isSaving.value = false;
  }
}

async function handleDelete(event) {
  const confirmed = await showConfirmDialog(`Hapus "${event.title}"?`, "Kegiatan yang dihapus tidak bisa dikembalikan.");
  if (!confirmed) return;

  try {
    await store.removeEvent(event.id);
    await showSuccessDialog("Kegiatan dihapus");
    await loadEvents();
  } catch (error) {
    await showErrorDialog(error.message);
  }
}
</script>

<template>
  <div class="flex flex-wrap items-center justify-between gap-3">
    <h1 class="font-display text-3xl font-bold">Kelola kegiatan</h1>
    <button
      type="button"
      class="flex items-center gap-2 rounded-lg bg-indigo-800 px-4 py-2 font-medium text-white hover:bg-indigo-900"
      @click="openForm()"
    >
      <Plus class="size-5" aria-hidden="true" /> Tambah kegiatan
    </button>
  </div>

  <div class="mt-6"><EventFilters v-model:search="search" v-model:category="category" /></div>

  <div class="mt-6" aria-live="polite">
    <AsyncState
      :is-loading="isLoading"
      :error-message="errorMessage"
      :is-empty="events.length === 0"
      empty-text="Tidak ada kegiatan yang cocok dengan pencarianmu."
    >
      <ul class="grid gap-3">
        <li v-for="event in events" :key="event.id">
          <EventCard :event="event" show-actions @edit="openForm" @delete="handleDelete" />
        </li>
      </ul>
    </AsyncState>
  </div>

  <EventFormModal ref="modalRef" :errors="formErrors" :is-saving="isSaving" @submit="handleSubmit" />
</template>
