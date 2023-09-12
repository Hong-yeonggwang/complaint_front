import { createWebHistory, createRouter } from "vue-router";
import MyPage from '../components/MyPage.vue'
import chatPage from '../components/Chat.vue'
import ChatRoom from '../components/ChatRoom.vue'
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
    path: "/",
    name: "main",
    component: MyPage,
    meta: {
      requiresAuth: true, // Set this to true for routes that require authentication
    },
  },
  {
    path: "/user",
    name: "userPage",
    component: MyPage,
    meta: {
      requiresAuth: true, // Set this to true for routes that require authentication
    },
  },
  {
    path: "/buy",
    name: "buyPage",
    component: BuyPage,
    meta: {
      requiresAuth: true, // Set this to true for routes that require authentication
    },
  },
  {
    path: "/chat",
    name: "chatPage",
    component: chatPage,
    meta: {
      requiresAuth: true, // Set this to true for routes that require authentication
    },
  },
  {
    path: "/chat/:room",
    name: "chatRoomPage",
    component: ChatRoom,
    meta: {
      requiresAuth: true, // Set this to true for routes that require authentication
    },
  },
  {
    path: "/cscenter",
    name: "csCenterPage",
    component: CscenterPage,
    meta: {
      requiresAuth: true, // Set this to true for routes that require authentication
    },
  },
  {
    path:"/login",
    name:"UserLogin",
    component: UserLogin
  },
  {
    path:"/join",
    name:"UserJoin",
    component: UserJoin,
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

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("user");
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !token) {
    // 토큰이 있을 경우 인증 통과
    next("/login");
  } else {
    // 토큰이 없을 경우 로그인 페이지로 이동
    next();
  }
});

export default router;
