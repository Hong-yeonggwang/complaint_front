import { createWebHistory, createRouter } from "vue-router";
import mainHeader from '../components/mainHeader.vue'
import userPage from '../components/Maintest.vue'
import buyPage from '../components/Buy.vue'


const routes = [
  {
    path: "/",
    name: "main",
    component: mainHeader
  },
  {
    path: "/home",
    name: "home",
    component: mainHeader
  },
  {
    path: "/test",
    name: "test",
    component: userPage
  },
  {
    path: "/buy",
    name: "buy",
    component: buyPage
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;