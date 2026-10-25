<script setup>
import { Pencil, Trash2, MapPin, Clock } from "lucide-vue-next";
import { CATEGORY_STYLES } from "../constants.js";
import { formatDay, formatMonthShort, formatTime } from "../../../helpers/toolsHelper.js";
import CategoryBadge from "./CategoryBadge.vue";

defineProps({
  event: { type: Object, required: true },
  showActions: { type: Boolean, default: false },
});
defineEmits(["edit", "delete"]);
</script>

<template>
  <article class="flex gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
    <time
      :datetime="event.eventDate"
      class="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-lg text-white"
      :class="CATEGORY_STYLES[event.category]?.block"
    >
      <span class="font-display text-2xl font-bold leading-none">{{ formatDay(event.eventDate) }}</span>
      <span class="text-sm">{{ formatMonthShort(event.eventDate) }}</span>
    </time>

    <div class="min-w-0 flex-1">
      <CategoryBadge :category="event.category" />
      <h3 class="mt-1 font-display text-lg font-semibold">
        <RouterLink :to="{ name: 'event-detail', params: { eventId: event.id } }" class="hover:underline">
          {{ event.title }}
        </RouterLink>
      </h3>
      <p class="mt-1 flex items-center gap-1.5 text-sm text-slate-700">
        <Clock class="size-4" aria-hidden="true" /> {{ formatTime(event.startTime) }}
      </p>
      <p class="flex items-center gap-1.5 text-sm text-slate-700">
        <MapPin class="size-4" aria-hidden="true" /> {{ event.location }}
      </p>
    </div>

    <div v-if="showActions" class="flex shrink-0 flex-col gap-2">
      <button
        type="button"
        class="rounded-lg p-2 text-slate-700 hover:bg-slate-100"
        :aria-label="`Ubah ${event.title}`"
        @click="$emit('edit', event)"
      >
        <Pencil class="size-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        class="rounded-lg p-2 text-red-700 hover:bg-red-50"
        :aria-label="`Hapus ${event.title}`"
        @click="$emit('delete', event)"
      >
        <Trash2 class="size-5" aria-hidden="true" />
      </button>
    </div>
  </article>
</template>
