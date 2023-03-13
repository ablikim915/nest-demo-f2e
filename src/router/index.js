import Vue from "vue";
import VueRouter from "vue-router";
// import PageA from "../views/PageA.vue";
// import PageB from "../views/PageB.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/a",
    name: "PageA",
    // component: PageA,
    component: () => import(/* webpackChunkName: "PageA" */"../views/PageA.vue"),
  },
  {
    path: "/b",
    name: "PageB",
    // component: PageB,
    component: () => import(/* webpackChunkName: "PageB" */ "../views/PageB.vue"),
  },
  {
    path: "/c",
    name: "PageC",
    component: () => import(/* webpackChunkName: "PageC" */ "../views/PageC.vue"),
  },
  {
    path: "/d",
    name: "PageD",
    component: () => import(/* webpackChunkName: "PageD" */ "../views/PageD.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
