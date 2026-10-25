<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { ArrowLeft } from "lucide-vue-next";
import { formatDate, formatTime } from "../../../helpers/toolsHelper.js";
import AsyncState from "../../common/components/AsyncState.vue";
import CategoryBadge from "../components/CategoryBadge.vue";
import { useEventsStore } from "../states/eventsStore.js";

const route = useRoute();
const store = useEventsStore();
const { event, isLoading, errorMessage } = storeToRefs(store);

onMounted(() => store.fetchEvent(route.params.eventId));
</script>

<template>
  <RouterLink :to="{ name: 'schedule' }" class="mb-6 inline-flex items-center gap-1 font-medium text-indigo-800 underline">
    <ArrowLeft class="size-4" aria-hidden="true" /> Kembali ke jadwal
  </RouterLink>

  <AsyncState :is-loading="isLoading" :error-message="errorMessage" :is-empty="!event">
    <article v-if="event" class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
      <CategoryBadge :category="event.category" />
      <h1 class="mt-2 font-display text-3xl font-bold">{{ event.title }}</h1>
      <dl class="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <dt class="text-sm text-slate-700">Tanggal</dt>
          <dd class="font-medium">{{ formatDate(event.eventDate) }}</dd>
        </div>
        <div>
          <dt class="text-sm text-slate-700">Jam</dt>
          <dd class="font-medium">{{ formatTime(event.startTime) }}</dd>
        </div>
        <div>
          <dt class="text-sm text-slate-700">Lokasi</dt>
          <dd class="font-medium">{{ event.location }}</dd>
        </div>
        <div v-if="event.leader">
          <dt class="text-sm text-slate-700">Penanggung jawab</dt>
          <dd class="font-medium">{{ event.leader }}</dd>
        </div>
      </dl>
      <p v-if="event.description" class="mt-6 max-w-prose leading-relaxed text-slate-800">{{ event.description }}</p>
    </article>
  </AsyncState>
</template>
