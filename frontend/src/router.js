import Vue from 'vue';
import Router from 'vue-router';
import CreateProfile from './components/CreateProfile.vue';
import ArmoryContainer from './components/ArmoryContainer.vue';


Vue.use(Router);

const routes = [
    {
        path: '/',
        component: CreateProfile,
        name: '/'
    },
    {
        path: '/armory/wow/profile/:profileId/:subRoute?',
        component: ArmoryContainer,
        name: 'armoryContainer'
    }
];

export default new Router({
    routes
});