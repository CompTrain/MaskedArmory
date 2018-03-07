import Vue from 'vue'
import router from './router';

Vue.config.devtools = true;

new Vue({
    el: '#app',
    router
});

// import Vue from 'vue';
// import store from './store';
// import router from './router';
// import Helper from './helper';
//
//
//
// Vue.http.interceptors.push(function(request, next) {
//     // set the auth header when making a call to the microservice API
//     if (request.url.indexOf(localStorage.getItem('microserviceUri')) !== -1) {
//         let authHeader = 'Bearer: ' + localStorage.getItem('authJwt');
//         request.headers.set('Authorization', authHeader);
//     }
//
//     // continue to next interceptor
//     next();
// });
//
// const ctAdminModel = new Vue({
//     el: '#app',
//     store,
//     router,
//     created() {
//         Helper.getObjectDataByName('users');
//         Helper.getObjectDataByName('queues');
//         Helper.getEmails();
//         Helper.getFeatureFlags();
//         store.commit('clearCurrentWorkflow');
//         store.commit('clearWorkflows');
//
//         // they have selected a page and refreshed, so re-load the workflows
//         if (typeof this.$route.params.formId !== 'undefined') {
//             let formId = this.$route.params.formId;
//
//             Vue.http.post(window.location.href,
//                 Helper.getFormData({
//                     'ajax_controller': 'CaseTracker/Admin',
//                     'ajax_method': 'getWorkflowDefinition',
//                     'formId': formId
//                 })).then( response => {
//                 if (response.body.status == 'success') {
//                     let workflows = Helper.loadWorkflow(response.body, formId);
//
//                     Helper.storeWorkflows(workflows);
//
//                     if (typeof this.$route.params.stageNum !== 'undefined') {
//                         store.commit('storeCurrentWorkflow', this.$route.params.stageNum);
//                     }
//                 }
//             });
//         }
//     }
// });