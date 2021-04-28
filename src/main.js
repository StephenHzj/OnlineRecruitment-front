import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import axios from "axios";


Vue.config.productionTip = false
Vue.prototype.$axios = axios

//给axios添加请求拦截器
axios.interceptors.request.use(
    //  function (config) {
    config => {
      // Do something before request is sent
      if (localStorage.getItem('token')) {
        // 如果令牌存在 将令牌添加到请求头部中 key值为token
        config.headers.token = localStorage.getItem('token');
      }
      return config;
    },
    error => {
      // Do something with request error
      return Promise.reject(error);
    });


Vue.use(ElementUI);

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
