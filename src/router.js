import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "./features/auth/states/authStore.js";
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
      { path: "auth/login", name: "login", component: () => import("./features/auth/pages/LoginPage.vue"), meta: { title: "Masuk", guestOnly: true } },
      { path: "auth/register", name: "register", component: () => import("./features/auth/pages/RegisterPage.vue"), meta: { title: "Daftar", guestOnly: true } },
      { path: "dashboard", name: "dashboard", component: () => import("./features/events/pages/DashboardPage.vue"), meta: { title: "Dashboard", requiresAuth: true } },
      { path: "kelola", name: "manage", component: () => import("./features/events/pages/ManagePage.vue"), meta: { title: "Kelola kegiatan", requiresAuth: true } },
      { path: "laporan", name: "report", component: () => import("./features/events/pages/ReportPage.vue"), meta: { title: "Laporan", requiresAuth: true } },
      { path: "profil", name: "profile", component: () => import("./features/auth/pages/ProfilePage.vue"), meta: { title: "Profil", requiresAuth: true } },
      { path: ":pathMatch(.*)*", name: "not-found", component: () => import("./features/common/pages/NotFoundPage.vue"), meta: { title: "Halaman tidak ditemukan" } },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});

router.beforeEach((to) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: "login", query: { redirect: to.fullPath } };
  }
  if (to.meta.guestOnly && auth.isAuthenticated) {
    return { name: "dashboard" };
  }
});

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} | ${APP_NAME}` : APP_NAME;
});
