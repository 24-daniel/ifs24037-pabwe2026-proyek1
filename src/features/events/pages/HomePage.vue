<script setup>
import { computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { CalendarDays, Clock, MapPin } from "lucide-vue-next";
import { formatDate, formatTime, todayIso } from "../../../helpers/toolsHelper.js";
import AsyncState from "../../common/components/AsyncState.vue";
import CategoryBadge from "../components/CategoryBadge.vue";
import EventCard from "../components/EventCard.vue";
import { useEventsStore } from "../states/eventsStore.js";

const FOLLOWING_LIMIT = 3;

const store = useEventsStore();
const { events, isLoading, errorMessage } = storeToRefs(store);
const nextEvent = computed(() => events.value[0]);
const followingEvents = computed(() => events.value.slice(1, 1 + FOLLOWING_LIMIT));

onMounted(() => store.fetchEvents({ from: todayIso() }));
</script>

<template>
  <h1 class="sr-only">Kegiatan terdekat</h1>
  <AsyncState
    :is-loading="isLoading"
    :error-message="errorMessage"
    :is-empty="!nextEvent"
    empty-text="Belum ada kegiatan mendatang. Tambahkan kegiatan pertama di halaman Jadwal."
  >
    <section v-if="nextEvent" aria-labelledby="next-title" class="rounded-2xl bg-indigo-950 p-6 text-white sm:p-10">
      <p class="flex items-center gap-2 text-indigo-100">
        <CalendarDays class="size-5" aria-hidden="true" /> {{ formatDate(nextEvent.eventDate) }}
      </p>
      <h2 id="next-title" class="mt-3 font-display text-3xl font-bold sm:text-4xl">{{ nextEvent.title }}</h2>
      <div class="mt-3"><CategoryBadge :category="nextEvent.category" /></div>
      <p class="mt-4 flex items-center gap-2"><Clock class="size-5" aria-hidden="true" /> {{ formatTime(nextEvent.startTime) }}</p>
      <p class="mt-1 flex items-center gap-2"><MapPin class="size-5" aria-hidden="true" /> {{ nextEvent.location }}</p>
      <RouterLink
        :to="{ name: 'event-detail', params: { eventId: nextEvent.id } }"
        class="mt-6 inline-block rounded-lg bg-amber-400 px-4 py-2 font-semibold text-indigo-950 hover:bg-amber-300"
      >
        Lihat detail
      </RouterLink>
    </section>

    <section v-if="followingEvents.length" aria-labelledby="following-title" class="mt-10">
      <div class="mb-4 flex items-baseline justify-between">
        <h2 id="following-title" class="font-display text-xl font-semibold">Setelah itu</h2>
        <RouterLink :to="{ name: 'schedule' }" class="font-medium text-indigo-800 underline">Semua jadwal</RouterLink>
      </div>
      <div class="grid gap-3">
        <EventCard v-for="event in followingEvents" :key="event.id" :event="event" />
      </div>
    </section>
  </AsyncState>
</template>
