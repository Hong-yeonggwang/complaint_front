import { createWebHistory, createRouter } from "vue-router";

import MainPage from '../components/MainPage.vue'

import MyPage from '../components/MyPage.vue'
import QRcodeLog from '../components/QRcodeLog.vue'
import ChatRoomListPage from '../components/ChatRoomList.vue'
import ChatRoom from '../components/ChatRoom.vue'
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
import UserPost from '../components/UserPost.vue'

import AdminMain from "../components/Admin/AdminMain.vue"
import AdminCScenter from "../components/Admin/AdminCScenter.vue"
import AdminManagement from "../components/Admin/AdminManagement.vue"
import AdminCategory from "../components/Admin/AdminCategory.vue"
import AdminUser from "../components/Admin/AdminUser.vue"
import ServiceStatus from "../components/Admin/ServiceStatus.vue"
import CouponLog from "../components/Admin/CouponLog.vue"

import OperatorMain from "../components/Operator/OperatorMain.vue"
import OperatorCScenter from "../components/Operator/OperatorCScenter.vue"
import OperatorStatus from "../components/Operator/OperatorStatus.vue"

import NotFound from "../components/NotFound.vue"

// post
import AdminPost from "../components/Admin/AdminPost.vue"


import store from '../store/index.js';

const routes = [

  {
    path: "/",
    name: "main",
    component: MainPage,
    meta: {
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
    path: "/user/qrcode/log",
    name: "qrcodeLog",
    component: QRcodeLog,
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
    name: "chatPage", 
    component: ChatRoomListPage,
    meta: {
      authorization: ["ROLE_USER"]
    },
  },
  
  
  {
    path: "/chat/:chatRoomId",
    name: "ChatRoom",
    component: ChatRoom,
    meta: {
      authorization: ["ROLE_USER"]
    },
    mode: 'history' 
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
    path:"/userPost/:postSeq",
    name:"userPost",
    component: UserPost,
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
  {
    path:"/admin/category",
    name:"AdminCategory",
    component: AdminCategory,
    meta: {
      requiresAuth: true, 
      authorization: ["ROLE_ADMIN"]
      
    },
  },
  {
    path:"/admin/user",
    name:"AdminUser",
    component: AdminUser,
    meta: {
      requiresAuth: true, 
      authorization: ["ROLE_ADMIN"]
      
    },
  },

  // post  
  {
    path:"/admin/post/:postSeq",
    name:"AdminPost",
    component: AdminPost,
    meta: {
      requiresAuth: true, 
      authorization: ["ROLE_ADMIN"]
      
    },
  },
  // couponLog
  {
    path:"/admin/couponLog",
    name:"couponLog",
    component: CouponLog,
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
  mode: 'history',
  history: createWebHistory(),
  routes,
});

  router.beforeEach( async (to, from, next) => {

  const authenticationState = store.getters['auth/isLoggedIn']
  const { authorization } = to.meta;

    if (authorization){
      if (!authenticationState) {
        return next("/login");
      }
      if (
        authorization.length &&
        !authorization.includes(store.getters['auth/getLevel'])
      ) {// 빈배열의 길이가 조건문으로 들어가면 0이기 떄문에 거짓이다. 인증을 하고 싶지 않은 페이지는 meta에 authorization에 빈 배열 넣으면됌.
        return next("/notFound"); // notfound가 뜨는 경우는 이상한 주소이거나 권한이 없는 페이지 메인화면으로 이동하거나 로그인창으로 이동하는 버튼생성하기로
      }
    }
  next();
  }
);


export default router;