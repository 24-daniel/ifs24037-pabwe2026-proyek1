<script setup>
import { ref } from "vue";
import { useInput } from "../../../hooks/useInput.js";
import { CATEGORY_OPTIONS, EMPTY_EVENT_FORM } from "../constants.js";
import FormField from "../../common/components/FormField.vue";

defineProps({
  errors: { type: Object, default: () => ({}) },
  isSaving: Boolean,
});
const emit = defineEmits(["submit"]);

const dialogRef = ref(null);
const editingId = ref(null);
const { values, reset } = useInput(EMPTY_EVENT_FORM);

const pickFormFields = (event) =>
  Object.fromEntries(Object.keys(EMPTY_EVENT_FORM).map((key) => [key, event[key] ?? ""]));

function open(event = null) {
  editingId.value = event?.id ?? null;
  reset(event ? pickFormFields(event) : {});
  dialogRef.value.showModal();
}

const close = () => dialogRef.value.close();
const submit = () => emit("submit", { id: editingId.value, payload: { ...values } });

defineExpose({ open, close });
</script>

<template>
  <dialog
    ref="dialogRef"
    aria-labelledby="event-form-title"
    class="m-auto w-full max-w-lg rounded-xl p-0 shadow-xl backdrop:bg-slate-900/60"
  >
    <form class="grid gap-4 p-6" @submit.prevent="submit">
      <h2 id="event-form-title" class="font-display text-xl font-semibold">
        {{ editingId ? "Ubah kegiatan" : "Tambah kegiatan" }}
      </h2>

      <FormField v-model="values.title" label="Judul kegiatan" :error="errors.title" required />
      <FormField v-model="values.category" as="select" label="Kategori" :error="errors.category" required>
        <option v-for="option in CATEGORY_OPTIONS" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </FormField>
      <div class="grid gap-4 sm:grid-cols-2">
        <FormField v-model="values.eventDate" type="date" label="Tanggal" :error="errors.eventDate" required />
        <FormField v-model="values.startTime" type="time" label="Jam mulai" :error="errors.startTime" required />
      </div>
      <FormField v-model="values.location" label="Lokasi" :error="errors.location" required />
      <FormField v-model="values.leader" label="Penanggung jawab" :error="errors.leader" />
      <FormField v-model="values.description" as="textarea" label="Keterangan" :error="errors.description" />

      <div class="flex justify-end gap-3">
        <button type="button" class="rounded-lg px-4 py-2 font-medium hover:bg-slate-100" @click="close">Batal</button>
        <button
          type="submit"
          :disabled="isSaving"
          class="rounded-lg bg-indigo-800 px-4 py-2 font-medium text-white hover:bg-indigo-900 disabled:opacity-60"
        >
          {{ isSaving ? "Menyimpan…" : "Simpan" }}
        </button>
      </div>
    </form>
  </dialog>
</template>
