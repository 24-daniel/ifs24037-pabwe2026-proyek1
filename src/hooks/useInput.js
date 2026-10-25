import { reactive } from "vue";

/** Mengelola state form: `values` untuk v-model dan `reset` untuk mengisi ulang. */
export function useInput(initialValues = {}) {
  const values = reactive({ ...initialValues });

  function reset(nextValues = {}) {
    Object.assign(values, { ...initialValues, ...nextValues });
  }

  return { values, reset };
}
