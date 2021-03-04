import Vue from 'vue'
import App from './App'
import store from '@/store/store.js'
import { $http } from '@escook/request-miniprogram'
uni.$http = $http
$http.baseUrl= 'https://www.uinav.com'
$http.beforeRequest=function(options) {
   uni.showLoading({
     title:"数据加载中..."
   })
   if (options.url.indexOf('/my/') !== -1) {
       // 为请求头添加身份认证字段
       options.header = {
         // 字段的值可以直接从 vuex 中进行获取
         Authorization: store.state.m_user.token,
       }
     }
}
$http.afterRequest = function () {
  uni.hideLoading()
}
uni.$showMsg = function(title='数据请求失败！', duration=1500) {
  uni.showToast({
    title,
    duration,
    icon: 'none'
  })
}
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
    store
})
app.$mount()
