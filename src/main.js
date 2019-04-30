import Vue from 'vue'
import App from './App.vue'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';

Vue.use(Mint);

import VueResource from 'vue-resource'
Vue.use(VueResource);

import storage from './model/storage';
var roomid = window.location.hash.split('=')[1];
if (!roomid) {
  roomid = "gqf123";
}
storage.set('roomid', roomid);


//Vue.use(VueSocketio, 'http://a.itying.com?roomid='+config.uid);
import SocketIO from 'socket.io-client';
import VueSocketIO from 'vue-socket.io'

const options = {
  path: ''
}; //Options object to pass into SocketIO

Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO('http://a.itying.com?roomid=' + roomid, options), //options object is Optional
}));

import VueRouter from 'vue-router'
Vue.use(VueRouter);

//创建组建 引入
import Start from './components/Start.vue'
import Home from './components/Home.vue'
import Hot from './components/Hot.vue'
import Cart from './components/Cart.vue'
import Order from './components/Order.vue'
import Pcontent from './components/Pcontent.vue'
import Search from './components/Search.vue'
import EditPeopleInfo from './components/EditPeopleInfo.vue'


//配置路由
const routes = [{
    path: '/start',
    component: Start
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/hot',
    component: Hot
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/order',
    component: Order
  },
  {
    path: '/pcontent/:id',
    component: Pcontent
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/editpeopleinfo',
    component: EditPeopleInfo
  },
  {
    path: '/*',
    redirect: '/start'
  },
]

//实例化
const router = new VueRouter({
  routes
})

//挂载


Vue.config.productionTip = false

new Vue({
  router,
  sockets: {
    connect: function () {
      //console.log('socket connected')
    }
  },
  render: h => h(App),
}).$mount('#app')

//router-view 放在跟组建