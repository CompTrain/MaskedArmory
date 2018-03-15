import Vue from 'vue'
import router from './router';

Vue.config.devtools = true;
Vue.config.productionTip = false;

// load assets
function requireAll(r) { r.keys().forEach(r); }
requireAll(require.context('./assets/images/', true));

new Vue({
    el: '#app',
    router
});
