import { createWebHistory, createRouter } from "vue-router";
import userPage from '../components/Maintest.vue'
// import mainHeader from '../components/mainHeader.vue'


const routes = [
  {
    path: "/test",
    name: "test",
    component: userPage
  },
  {
    path: "/",
    name: "main",
    component: userPage
  },
  {
    path: "/user",
    name: "userPage",
    component: userPage
  },
  {
    path: "/purchase",
    name: "purchasePage",
    component: userPage
  },
  {
    path: "/chat",
    name: "chatPage",
    component: userPage
  },
  {
    path: "/cscenter",
    name: "csCenterPage",
    component: userPage
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;