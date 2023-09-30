import { createWebHistory, createRouter } from "vue-router";
import { defineComponent } from 'vue'
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
import QRcodeReader from '../components/QRcodeReader.vue'
import UserService from "@/Service/UserService";

const NotFound = defineComponent({
  template: '<div>Not Found</div>',
})

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
  },
  {
    path:"/join",
    name:"UserJoin",
    component: UserJoin,
  },
  {
    path:"/findid",
    name:"FindId",
    component: FindId,
  },
  {
    path:"/findpassword",
    name:"FindPassword",
    component: FindPassword,
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
  {
    path:"/qrcode",
    name:"qr",
    component: QRcodeReader,
    meta: {
      requiresAuth: true, 
    },
  },
  {
    path: '/:catchAll(.*)+',
    component: NotFound
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

  router.beforeEach( async (to, from, next) => {
  console.log("beforeEach 실행")
  const token = await UserService.getAuth()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth); // meta에 requiresAuth가 달려있는지 확인 (type:bool)
  if (requiresAuth && !token) {
    // 인증정보가 필요하고 인증정보가 없는 경우는 로그인 페이지로 
    next("/login");
  } else if(!requiresAuth && token){
    // 인증이 필요하지않고 인증정보가 존재하면 다음페이지로 이동
    next("/");
  }
  else{
    next();
  }
  }
);

export default router;
