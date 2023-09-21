import './plugins/axios'
import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router/index.js'
import { loadFonts } from './plugins/webfontloader'
import "./index.css"
import store from './store/index.js';

import axios from 'axios'

import apiInterceptors from './Service/apiInterceptor';


apiInterceptors(store);

loadFonts()
const app = createApp(App)

app.config.globalProperties.axios = axios;

app.use(vuetify)
  .use(router)
  .use(store)
  .mount('#app')


