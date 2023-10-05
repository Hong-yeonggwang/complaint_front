import { createWebHistory, createRouter } from "vue-router";
import { defineComponent } from 'vue'
import MyPage from '../components/MyPage.vue'
// import chatPage from '../components/Chat.vue'
// import ChatRoom from '../components/ChatRoom.vue'
import ChatTest from '../components/ChatTest.vue'
import CscenterPage from '../components/CscenterPage.vue'
import BuyPage from '../components/Buy.vue'
import UserLogin from '../components/UserLogin.vue'
import UserJoin from '../components/UserJoin.vue'
import FindPassword from '../components/FindPassword.vue'
import FindId from '../components/FindId.vue'
import PayPage from '../components/Pay.vue'
import CompletePage from '../components/Complete.vue'
import QRcodeReader from '../components/Operator/QRcodeReader.vue'

import AdminMain from "../components/Admin/AdminMain.vue"
import AdminCScenter from "../components/Admin/AdminCScenter.vue"
import AdminManagement from "../components/Admin/AdminManagement.vue"
import ServiceStatus from "../components/Admin/ServiceStatus.vue"

import OperatorMain from "../components/Operator/OperatorMain.vue"
import OperatorCScenter from "../components/Operator/OperatorCScenter.vue"
import OperatorStatus from "../components/Operator/OperatorStatus.vue"

import store from '../store/index.js';

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
      authorization: []
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
    component: ChatTest,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/chat/:room",
    name: "chatRoomPage",
    component: ChatTest,
    meta: {
      requiresAuth: true, 
    },
  },
  {
    path: "/ChatTest",
    name: "ChatTest",
    component: ChatTest,
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
    name:'notFound',
    component: NotFound,
    meta:{
      authorization: ["ROLE_ADMIN",undefined]
    }
  },

  // admin단
  {
    path:"/admin",
    name:"adminMain",
    component: AdminMain,
    meta: {
      requiresAuth: true, 
      authorization: ["ROLE_ADMIN"]
    },
  },
  {
    path:"/admin/service",
    name:"seviceStatus",
    component: ServiceStatus,
    meta: {
      requiresAuth: true, 
    },
  },
  {
    path:"/admin/management",
    name:"AdminManagement",
    component: AdminManagement,
    meta: {
      requiresAuth: true, 
    },
  },
  {
    path:"/admin/cscenter",
    name:"AdminCScenter",
    component: AdminCScenter,
    meta: {
      requiresAuth: true, 
      
    },
  },


  //Operator단
  {
    path:"/operator",
    name:"OperatorMain",
    component: OperatorMain,
    meta: {
      requiresAuth: true, 
    },
  },
  {
    path:"/operator/cscenter",
    name:"OperatorCScenter",
    component: OperatorCScenter,
    meta: {
      requiresAuth: true, 
      authorization: []
    },
  },
  {
    path:"/operator/status",
    name:"OperatorStatus",
    component: OperatorStatus,
    meta: {
      requiresAuth: true, 
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

  router.beforeEach( async (to, from, next) => {
  console.log("beforeEach 실행")
  console.log(to)
  // console.log(to.meta)
  // const { authorization } = to.meta;
  // console.log(authorization) // ['ROLE_ADMIN'] 배열 형태
  // const token = store.getters['auth/isLoggedIn']
  // const requiresAuth = to.matched.some(record => record.meta.requiresAuth); // meta에 requiresAuth가 달려있는지 확인 (type:bool)
  // if (requiresAuth && !token) {
  //   // 인증정보가 필요하고 인증정보가 없는 경우는 로그인 페이지로 
  //   next("/login");
  // } else if(!requiresAuth && token){
  //   // 인증이 필요하지않고 인증정보가 존재하면 다음페이지로 이동
  //   next("/");
  // }
  // else{
  //   next();
  // }
  const authenticationState = store.getters['auth/isLoggedIn']
  const { authorization } = to.meta;
  console.log(!authenticationState)
  console.log(authorization)

    if (authorization){

      if (!authenticationState) {
        console.log("로그인창으로")
        return next("/login");
      }

      if (
        authorization.length &&
        !authorization.includes(store.getters['auth/getLevel'])
      ) {// 빈배열의 길이가 조건문으로 들어가면 0이기 떄문에 거짓이다. 인증을 하고 싶지 않은 페이지는 meta에 authorization에 빈 배열 넣으면됌.
        return next("/notFound");
      }
    }
  next();
  }
);

export default router;
