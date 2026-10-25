import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { useAuthStore } from "./features/auth/states/authStore.js";
import { onUnauthorized } from "./helpers/apiHelper.js";
import { router } from "./router.js";
import "./index.css";

const app = createApp(App).use(createPinia()).use(router);

// Token ditolak server (mis. kedaluwarsa): keluarkan pengguna dan arahkan ke halaman login.
onUnauthorized(() => {
  useAuthStore().logout();
  router.push({ name: "login" });
});

app.mount("#app");
