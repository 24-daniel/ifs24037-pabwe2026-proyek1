<script setup>
import { computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { todayIso } from "../../../helpers/toolsHelper.js";
import { useAuthStore } from "../../auth/states/authStore.js";
import AsyncState from "../../common/components/AsyncState.vue";
import EventCard from "../components/EventCard.vue";
import { filterUpcoming } from "../helpers/eventStats.js";
import { useEventsStore } from "../states/eventsStore.js";

const NEXT_EVENTS_LIMIT = 3;

const auth = useAuthStore();
const store = useEventsStore();
const { events, isLoading, errorMessage } = storeToRefs(store);

const upcoming = computed(() => filterUpcoming(events.value, todayIso()));
const summary = computed(() => [
  { label: "Total kegiatan", value: events.value.length },
  { label: "Kegiatan mendatang", value: upcoming.value.length },
]);

onMounted(() => store.fetchEvents());
</script>

<template>
  <h1 class="font-display text-3xl font-bold">Dashboard</h1>
  <p class="mt-2 text-slate-700">Halo, {{ auth.user?.username }}. Berikut ringkasan jadwal saat ini.</p>

  <div class="mt-6">
    <AsyncState :is-loading="isLoading" :error-message="errorMessage">
      <dl class="grid gap-4 sm:grid-cols-2">
        <div v-for="item in summary" :key="item.label" class="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <dt class="text-sm text-slate-700">{{ item.label }}</dt>
          <dd class="mt-1 font-display text-4xl font-bold">{{ item.value }}</dd>
        </div>
      </dl>

      <section aria-labelledby="next-events-title" class="mt-8">
        <div class="mb-4 flex items-baseline justify-between">
          <h2 id="next-events-title" class="font-display text-xl font-semibold">Kegiatan terdekat</h2>
          <RouterLink :to="{ name: 'manage' }" class="font-medium text-indigo-800 underline">Kelola kegiatan</RouterLink>
        </div>
        <p v-if="upcoming.length === 0" class="text-slate-700">Belum ada kegiatan mendatang.</p>
        <ul v-else class="grid gap-3">
          <li v-for="event in upcoming.slice(0, NEXT_EVENTS_LIMIT)" :key="event.id"><EventCard :event="event" /></li>
        </ul>
      </section>
    </AsyncState>
  </div>
</template>
