import { createWebHistory, createRouter } from "vue-router";
import MyPage from '../components/MyPage.vue'
import chatPage from '../components/Chat.vue'
import CscenterPage from '../components/CscenterPage.vue'
import BuyPage from '../components/Buy.vue'
import UserLogin from '../components/UserLogin.vue'
import UserJoin from '../components/UserJoin.vue'
import FindPassword from '../components/FindPassword.vue'
import FindId from '../components/FindId.vue'
import PayPage from '../components/Pay.vue'
import CompletePage from '../components/Complete.vue'

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
    path: "/buy",
    name: "buyPage",
    component: BuyPage
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
  {
    path:"/login",
    name:"UserLogin",
    component: UserLogin
  },
  {
    path:"/join",
    name:"UserJoin",
    component: UserJoin
  },
  {
    path:"/findid",
    name:"FindId",
    component: FindId
  },
  {
    path:"/findpassword",
    name:"FindPassword",
    component: FindPassword
  },
  {
    path:"/pay",
    name:"payPage",
    component: PayPage
  },
  {
    path:"/complete",
    name:"completePage",
    component: CompletePage
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
