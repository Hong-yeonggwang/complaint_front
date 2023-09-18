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
    component: UserLogin,
    meta: {
      loginStaus: true, // Set this to true for routes that require authentication
    },
  },
  {
    path:"/join",
    name:"UserJoin",
    component: UserJoin,
    meta: {
      loginStaus: true, // Set this to true for routes that require authentication
    },
  },
  {
    path:"/findid",
    name:"FindId",
    component: FindId,
    meta: {
      loginStaus: true, // Set this to true for routes that require authentication
    },
  },
  {
    path:"/findpassword",
    name:"FindPassword",
    component: FindPassword,
    meta: {
      loginStaus: true, // Set this to true for routes that require authentication
    },
  },
  {
    path:"/pay",
    name:"payPage",
    component: PayPage,
    meta: {
      requiresAuth: true, // Set this to true for routes that require authentication
    },
  },
  {
    path:"/complete",
    name:"completePage",
    component: CompletePage,
    meta: {
      requiresAuth: true, // Set this to true for routes that require authentication
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("user");
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth); // meta에 requiresAuth가 달려있는지 확인 (type:bool)
  const loginStaus = to.matched.some(record => record.meta.loginStaus); // 현재 로그인이 되어있는 확인하는 메서드
  console.log(loginStaus);
  if (requiresAuth && !token) {
    // 토큰이 없을 경우 로그인 페이지로 이동
    next("/login");
  } else {
    // 토큰이 있을 경우 인증 통과
    if(loginStaus){
      next("/");
    }
    else{
      next();
    }
  }
});

export default router;
