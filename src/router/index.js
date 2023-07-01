import { createWebHistory, createRouter } from "vue-router";
import MyPage from '../components/MyPage.vue'


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
    component: MyPage
  },
  {
    path: "/",
    name: "main",
    component: MyPage
  },
  {
    path: "/user",
    name: "userPage",
    component: MyPage
  },
  {
    path: "/purchase",
    name: "purchasePage",
    component: MyPage
  },
  {
    path: "/chat",
    name: "chatPage",
    component: MyPage
  },
  {
    path: "/cscenter",
    name: "csCenterPage",
    component: MyPage
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;