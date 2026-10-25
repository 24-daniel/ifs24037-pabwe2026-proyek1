<script setup>
import { computed } from "vue";
import { CATEGORY_STYLES } from "../constants.js";

const props = defineProps({ category: { type: String, required: true } });
const style = computed(() => CATEGORY_STYLES[props.category]);
</script>

<template>
  <span class="inline-block rounded-full px-2.5 py-0.5 text-sm font-medium" :class="style?.badge">
    {{ style?.label ?? category }}
  </span>
</template>
