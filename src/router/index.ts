import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/views/Login.vue";
import LandingPage from "@/views/LandingPage.vue";
import CatalogPage from "@/views/CatalogPage.vue";
import TrailerPage from "@/views/TrailerPage.vue";
import NotFound from "@/views/NotFound.vue";
import Cinema from "@/views/Cinema.vue";
import SeancesPage from "@/views/SeancesPage.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage
    },
    {
      path: '/cinema',
      name: 'Cinema',
      component: Cinema
    },
    {
      path: '/trailer-page/:link',
      name: 'TrailerPage',
      component: TrailerPage
    },
    {
      path: '/seances/:cinema',
      name: 'SeancesPage',
      component: SeancesPage
    },


    {
      path: "/catalog-page",
      name: "CatalogPage",
      component: CatalogPage,
    },
  
    {
      path: "/landing-page",
      name: "LandingPage",
      component: LandingPage,
    },
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: NotFound,
    },
    {
      path: "/login-page",
      name: "LoginPage",
      component: Login,
    },

   
  
  ]
})

export default router
