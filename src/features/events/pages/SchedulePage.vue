<script setup>
import AsyncState from "../../common/components/AsyncState.vue";
import EventCard from "../components/EventCard.vue";
import EventFilters from "../components/EventFilters.vue";
import { useEventList } from "../hooks/useEventList.js";

const { events, isLoading, errorMessage, search, category } = useEventList();
</script>

<template>
  <h1 class="font-display text-3xl font-bold">Jadwal kegiatan</h1>

  <div class="mt-6"><EventFilters v-model:search="search" v-model:category="category" /></div>

  <div class="mt-6" aria-live="polite">
    <AsyncState
      :is-loading="isLoading"
      :error-message="errorMessage"
      :is-empty="events.length === 0"
      empty-text="Tidak ada kegiatan yang cocok dengan pencarianmu."
    >
      <ul class="grid gap-3">
        <li v-for="event in events" :key="event.id"><EventCard :event="event" /></li>
      </ul>
    </AsyncState>
  </div>
</template>
