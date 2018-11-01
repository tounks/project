// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
// import Promise from 'es6-promise'
// Promise.polyfill()

import $ from 'jQuery'
import Vue from 'vue'
import App from './App'
import router from './router'
import './style/style.css'

import qs from 'qs'
import store from './store'

import axios from 'axios'


axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.baseURL = '/gw/bos';
axios.defaults.baseURL = '/smartmoney-report';
axios.defaults.withCredentials = true;
// axios.defaults.responseType = 'json';

// if(!localStorage.getItem("ngStorage-loan")){
//   window.location.href = '/'
// }

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
    store.dispatch('netWorkError',res.data.msg);
    return Promise.reject(res);
  }
  return res;
}, (error) => {
  return Promise.reject(error);
});

Vue.prototype.$http = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
