import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'
import echarts from 'echarts'
import headerpage from './components/headerpage'
import Mheader from './components/Mheader'
import navmenu from './components/navmenu'
import requestutil from '../src/util/requestutil.js'
import dateutil from '../src/util/dateutil.js'
import datautil from '../src/util/datautil.js'
import cookieutil from '../src/util/cookieutil.js'
import uploadfileutil from '../src/util/uploadfileutil.js'
import stores from '../src/store/store.js'
import $ from 'jquery'
import routerutil from '../src/util/routerutil.js'
import axios from 'axios'
/*import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.min.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.min.js'*/
import { AlertPlugin, ToastPlugin} from 'vux'

axios.defaults.withCredentials=true;
Vue.use(ElementUI,{locale});
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.config.productionTip = false
Vue.component('headerpage', headerpage)
Vue.component('Mheader', Mheader)
Vue.component('navmenu', navmenu)
let store = new Vuex.Store(stores)
Vue.prototype.requestutil = requestutil;
Vue.prototype.$echarts = echarts
Vue.prototype.cookieutil = cookieutil;
Vue.prototype.uploadfileutil = uploadfileutil;
Vue.prototype.dateutil = dateutil;
Vue.prototype.datautil = datautil;
Vue.prototype.routerutil = routerutil;
Vue.prototype.$http = axios;


Vue.prototype.$goRoute = function (index,query) {
  this.$router.push({path:index,query: query})
}


var vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
