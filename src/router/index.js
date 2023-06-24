import { createWebHistory, createRouter } from "vue-router";
import userPage from '../components/Maintest.vue'
import mainHeader from '../components/mainHeader.vue'


const routes = [
  {
    path: "/test",
    name: "test",
    component: userPage
  },
  {
    path: "/",
    name: "main",
    component: mainHeader
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;