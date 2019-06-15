import Vue from 'vue';
import App from './App.vue';
import 'styles/index.scss';
import 'filters';
import 'directives';
import eventBus from './event-bus.js';
import router from 'router';
import store from 'store';
import 'api/interceptor';

const isDev = process.env.NODE_ENV === 'development';

Vue.prototype.$eventBus = eventBus;
Vue.config.productionTip = false;
Vue.config.performance = isDev;
window.App = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
