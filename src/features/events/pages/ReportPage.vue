<script setup>
import { computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { formatMonthYear } from "../../../helpers/toolsHelper.js";
import AsyncState from "../../common/components/AsyncState.vue";
import { countByCategory, countByMonth } from "../helpers/eventStats.js";
import { useEventsStore } from "../states/eventsStore.js";

const store = useEventsStore();
const { events, isLoading, errorMessage } = storeToRefs(store);

const categoryRows = computed(() => countByCategory(events.value));
const monthRows = computed(() => countByMonth(events.value));

onMounted(() => store.fetchEvents());
</script>

<template>
  <h1 class="font-display text-3xl font-bold">Laporan kegiatan</h1>

  <div class="mt-6">
    <AsyncState :is-loading="isLoading" :error-message="errorMessage" :is-empty="events.length === 0" empty-text="Belum ada data kegiatan.">
      <div class="grid gap-8 md:grid-cols-2">
        <div class="overflow-x-auto">
          <table class="w-full rounded-xl bg-white text-left shadow-sm ring-1 ring-slate-200">
            <caption class="mb-2 text-left font-display text-xl font-semibold">Per kategori</caption>
            <thead>
              <tr class="border-b border-slate-200">
                <th scope="col" class="p-3">Kategori</th>
                <th scope="col" class="p-3 text-right">Jumlah</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in categoryRows" :key="row.value" class="border-b border-slate-100 last:border-0">
                <th scope="row" class="p-3 font-normal">{{ row.label }}</th>
                <td class="p-3 text-right">{{ row.total }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full rounded-xl bg-white text-left shadow-sm ring-1 ring-slate-200">
            <caption class="mb-2 text-left font-display text-xl font-semibold">Per bulan</caption>
            <thead>
              <tr class="border-b border-slate-200">
                <th scope="col" class="p-3">Bulan</th>
                <th scope="col" class="p-3 text-right">Jumlah</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in monthRows" :key="row.month" class="border-b border-slate-100 last:border-0">
                <th scope="row" class="p-3 font-normal">{{ formatMonthYear(row.month) }}</th>
                <td class="p-3 text-right">{{ row.total }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </AsyncState>
  </div>
</template>
