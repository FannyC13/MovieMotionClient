import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/views/Login.vue";
import LandingPage from "@/views/LandingPage.vue";
import CatalogPage from "@/views/CatalogPage.vue";
import TrailerPage from "@/views/TrailerPage.vue";
import NotFound from "@/views/NotFound.vue";
import Cinema from "@/views/Cinema.vue";
import SeancesPage from "@/views/SeancesPage.vue";
import Admin from "@/views/Admin.vue";
import ContactPage from "@/views/Contact.vue";
import { isAuthenticatedUser } from './auth';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage
    },
    {
      path: '/Admin',
      name: 'Admin',
      component: Admin,
   
    },
    {
      path: '/cinema/:token?',
      name: 'Cinema',
      component: Cinema
    },
    {
      path: '/trailer-page/:link',
      name: 'TrailerPage',
      component: TrailerPage
    },
    {
      path: '/contact/:token?',
      name: 'ContactPage',
      component: ContactPage
    },
    {
      path: '/seances/:cinema/:token?',
      name: 'SeancesPage',
      component: SeancesPage
    },


    {
      path: "/catalog-page/:token?",
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

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticatedUser()) {
    next({ name: 'CatalogPage' });
  } else {
    next();
  }
  
});

export default router;