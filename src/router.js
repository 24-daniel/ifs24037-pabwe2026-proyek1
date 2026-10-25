import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "./features/common/layouts/MainLayout.vue";

const APP_NAME = "JadwalIbadah";

export const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "", name: "home", component: () => import("./features/events/pages/HomePage.vue"), meta: { title: "Kegiatan terdekat" } },
      { path: "jadwal", name: "schedule", component: () => import("./features/events/pages/SchedulePage.vue"), meta: { title: "Jadwal kegiatan" } },
      { path: "jadwal/:eventId", name: "event-detail", component: () => import("./features/events/pages/DetailPage.vue"), meta: { title: "Detail kegiatan" } },
      { path: "tentang", name: "about", component: () => import("./features/common/pages/AboutPage.vue"), meta: { title: "Tentang" } },
      { path: ":pathMatch(.*)*", name: "not-found", component: () => import("./features/common/pages/NotFoundPage.vue"), meta: { title: "Halaman tidak ditemukan" } },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} | ${APP_NAME}` : APP_NAME;
});
