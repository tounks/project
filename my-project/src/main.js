// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import _ from 'lodash'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import axios from 'axios'
import qs from 'qs'
import 'swiper/dist/css/swiper.css'
import store from './store'
import fastclick from 'fastclick'
require('babel-polyfill')


if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    fastclick.attach(document.body);
  }, false);
}

Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper)
window._ = _

axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.baseURL = '/gun';
//axios.defaults.baseURL = '';
axios.defaults.withCredentials = true;
axios.defaults.responseType = 'json';

if(!localStorage.getItem("ngStorage-user")){
  window.location.href = '/dl.html?returnurl=little.html'
}

axios.interceptors.request.use((config) => {
  if(config.method  === 'post'){
    config.data.version = "1.0.0";
    config.data.channel = 3;
    config.data = qs.stringify(config.data);
  }
  return config;
},(error) =>{
  return Promise.reject(error);
});

axios.interceptors.response.use((res) =>{
  if(!res.data.success){

    if(res.data.errorCode == '9998'){
      store.dispatch('netWorkCode','9998');
    }else {
      store.dispatch('showDialog',true);
      store.dispatch('netWorkCode',res.data.code);
    }
    store.dispatch('netWorkError',res.data.errorMsg);

    return Promise.reject(res);
  }
  return res;
}, (error) => {
  console.log('错误')
  return Promise.reject(error);
});

Vue.prototype.axios = axios

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
