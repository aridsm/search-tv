import { createRouter, createWebHashHistory } from "vue-router";
function lazyLoad(view) {
  return () => import(`../views/${view}.vue`);
}

import { useLoginStore } from "@/store/login";
const routes = [
  {
    path: "/",
    name: "home",
    component: lazyLoad("HomeView"),
  },
  {
    path: "/login",
    name: "login",
    component: lazyLoad("LoginView"),
  },
  {
    path: "/movies/:movieId",
    name: "movie",
    component: lazyLoad("MovieView"),
    props: true,
  },
  {
    path: "/movies",
    name: "movies",
    component: lazyLoad("MoviesView"),
  },
  {
    path: "/account",
    name: "account",
    component: lazyLoad("AccountView"),
    meta: {
      needsAuth: true,
    },
  },
  { path: "/:null", redirect: "/" },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const loginStore = useLoginStore();
  if (to.meta.needsAuth) {
    if (loginStore.isLoggedIn) {
      next();
    } else {
      next("/login");
    }
  } else if (to.name === "login") {
    if (loginStore.isLoggedIn) {
      next("/account");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
