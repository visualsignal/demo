import Vue from 'vue';
import Amplify, * as AmplifyModules from 'aws-amplify';
import { AmplifyPlugin } from 'aws-amplify-vue';
import App from './App.vue';
import router from './router';
import store from './store';

const config = require('./aws-exports').default;

Vue.config.productionTip = false;
Vue.config.devtools = true;
Amplify.configure(config);
Vue.use(AmplifyPlugin, AmplifyModules);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
