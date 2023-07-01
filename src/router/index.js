import { createWebHistory, createRouter } from "vue-router";
import MyPage from '../components/MyPage.vue'
import chatPage from '../components/Chat.vue'
import CscenterPage from '../components/CscenterPage.vue'
import PurchasePage from '../components/Purchase.vue'



const routes = [
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
    component: PurchasePage
  },
  {
    path: "/chat",
    name: "chatPage",
    component: chatPage
  },
  {
    path: "/cscenter",
    name: "csCenterPage",
    component: CscenterPage
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;