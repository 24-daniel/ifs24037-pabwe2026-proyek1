<script setup>
import { useId } from "vue";

defineProps({
  label: { type: String, required: true },
  error: { type: String, default: "" },
  as: { type: String, default: "input" },
  type: { type: String, default: "text" },
  required: Boolean,
  name: { type: String, default: undefined },
  autocomplete: { type: String, default: undefined },
});

const model = defineModel({ type: String, default: "" });
const id = useId();
</script>

<template>
  <div>
    <label :for="id" class="mb-1 block text-sm font-medium">
      {{ label }}<span v-if="required" aria-hidden="true" class="text-red-700"> *</span>
    </label>
    <component
      :is="as"
      :id="id"
      :value="model"
      :type="as === 'input' ? type : undefined"
      :required="required"
      :name="name"
      :autocomplete="autocomplete"
      :aria-invalid="Boolean(error)"
      :aria-describedby="error ? `${id}-error` : undefined"
      class="w-full rounded-lg border border-slate-400 bg-white px-3 py-2"
      @input="model = $event.target.value"
    >
      <slot />
    </component>
    <p v-if="error" :id="`${id}-error`" role="alert" class="mt-1 text-sm text-red-700">{{ error }}</p>
  </div>
</template>
