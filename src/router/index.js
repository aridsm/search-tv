import { createRouter, createWebHashHistory } from "vue-router";
function lazyLoad(view) {
  return () => import(`../views/${view}.vue`);
}

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
  { path: "/account", name: "account", component: lazyLoad("AccountView") },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

export default router;
