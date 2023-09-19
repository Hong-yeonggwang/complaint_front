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
      requiresAuth: true, 
    },
  },
  {
    path: "/user",
    name: "userPage",
    component: MyPage,
    meta: {
      requiresAuth: true, 
    },
  },
  {
    path: "/buy",
    name: "buyPage",
    component: BuyPage,
    meta: {
      requiresAuth: true, 
    },
  },
  {
    path: "/chat",
    name: "chatPage",
    component: chatPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/chat/:room",
    name: "chatRoomPage",
    component: ChatRoom,
    meta: {
      requiresAuth: true, 
    },
  },
  {
    path: "/cscenter",
    name: "csCenterPage",
    component: CscenterPage,
    meta: {
      requiresAuth: true, 
    },
  },
  {
    path:"/login",
    name:"UserLogin",
    component: UserLogin,
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem("user")) {
        next(); // 이동 허용
      } else {
        next('/'); // 메인 페이지로 이동
      }
    },
  },
  {
    path:"/join",
    name:"UserJoin",
    component: UserJoin,
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem("user")) {
        next(); // 이동 허용
      } else {
        next('/'); // 메인 페이지로 이동
      }
    },
  },
  {
    path:"/findid",
    name:"FindId",
    component: FindId,
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem("user")) {
        next(); // 이동 허용
      } else {
        next('/'); // 메인 페이지로 이동
      }
    },
  },
  {
    path:"/findpassword",
    name:"FindPassword",
    component: FindPassword,
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem("user")) {
        next(); // 이동 허용
      } else {
        next('/'); // 메인 페이지로 이동
      }
    },
  },
  {
    path:"/pay",
    name:"payPage",
    component: PayPage,
    meta: {
      requiresAuth: true, 
    },
  },
  {
    path:"/complete",
    name:"completePage",
    component: CompletePage,
    meta: {
      requiresAuth: true, 
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("user");
  console.log(!token)
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth); // meta에 requiresAuth가 달려있는지 확인 (type:bool)
  console.log(requiresAuth)
  // const loginStaus = to.matched.some(record => record.meta.loginStaus); // 현재 로그인이 되어있는 확인하는 메서드
  // console.log(loginStaus);
  if (requiresAuth && !token) {
    // 토큰이 없을 경우 로그인 페이지로 이동
    next("/login");
  } else {
      // // 토큰이 있을 경우 인증 통과
    //   if(loginStaus){
    //     next("/");
    //   }
    //   else{
        next();
    // }
  }
});

export default router;
