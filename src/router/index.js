import { createWebHistory, createRouter } from "vue-router";
import { defineComponent } from 'vue'
import MyPage from '../components/MyPage.vue'

import ChatRoomListPage from '../components/ChatRoomList.vue'
// import ChatRoom from '../components/ChatRoom.vue'

import ChatTest from '../components/ChatTest.vue'
// import CreateChatTest from '../components/CreateChatTest.vue'

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
      authorization: ["ROLE_USER"]
    },
  },
  {
    path: "/user",
    name: "userPage",
    component: MyPage,
    meta: {
      authorization: ["ROLE_USER"]
    },
  },
  {
    path: "/buy",
    name: "buyPage",
    component: BuyPage,
    meta: {
      authorization: ["ROLE_USER"]
    },
  },
  {
    path: "/chat",
    name: "chatPage", // 여기 수정하면 고장나는데 이유를 모르겠음
    component: ChatRoomListPage,
    meta: {
      authorization: ["ROLE_USER"]
    },
  },
  
  
  {
    path: "/chat/:chatRoomId",
    name: "ChatTest", //"chatRoom",
    component: ChatTest,
    meta: {
      authorization: ["ROLE_USER"]
    },
    mode: 'history' // URL에서 해시(#)를 사용하지 않고 깔끔한 URL을 사용하도록 지정
  },



  {
    path: "/cscenter",
    name: "csCenterPage",
    component: CscenterPage,
    meta: {
      authorization: ["ROLE_USER"]
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
      authorization: ["ROLE_USER"]
    },
  },
  {
    path:"/complete",
    name:"completePage",
    component: CompletePage,
    meta: {
      authorization: ["ROLE_USER"]
    },
  },
  {
    path: '/:catchAll(.*)+',
    name:'notFound',
    component: NotFound,
    meta:{
      authorization: ["ROLE_ADMIN",undefined,"ROLE_USER","ROLE_OPERATOR"]
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
      authorization: ["ROLE_ADMIN"]
    },
  },
  {
    path:"/admin/management",
    name:"AdminManagement",
    component: AdminManagement,
    meta: {
      requiresAuth: true, 
      authorization: ["ROLE_ADMIN"]
    },
  },
  {
    path:"/admin/cscenter",
    name:"AdminCScenter",
    component: AdminCScenter,
    meta: {
      requiresAuth: true, 
      authorization: ["ROLE_ADMIN"]
      
    },
  },


  //Operator단
  {
    path:"/operator",
    name:"OperatorMain",
    component: OperatorMain,
    meta: {
      requiresAuth: true, 
      authorization: ["ROLE_OPERATOR"]
    },
  },
  {
    path:"/operator/cscenter",
    name:"OperatorCScenter",
    component: OperatorCScenter,
    meta: {
      requiresAuth: true, 
      authorization: ["ROLE_OPERATOR"]
    },
  },
  {
    path:"/operator/status",
    name:"OperatorStatus",
    component: OperatorStatus,
    meta: {
      requiresAuth: true, 
      authorization: ["ROLE_OPERATOR"]
    },
  },
  {
    path:"/qrcode",
    name:"qr",
    component: QRcodeReader,
    meta: {
      authorization: ["ROLE_OPERATOR"]
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

  const authenticationState = store.getters['auth/isLoggedIn']
  const { authorization } = to.meta;

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