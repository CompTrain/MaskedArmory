import Vue from 'vue'
import router from './router';
import VModal from 'vue-js-modal';

Vue.config.devtools = false;
Vue.config.productionTip = false;

Vue.use(VModal, { dialog: true });

requireAll(require.context('./assets/images/', true));

new Vue({
    el: '#app',
    router
});

function requireAll(r) {
    r.keys().forEach(r);
}
