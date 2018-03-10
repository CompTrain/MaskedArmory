import Vue from 'vue'
import router from './router';

Vue.config.devtools = true;
Vue.config.productionTip = false

new Vue({
    el: '#app',
    router
});
