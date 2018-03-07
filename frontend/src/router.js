import Vue from 'vue';
import VueRouter from 'vue-router';
import CreateProfile from './components/CreateProfile.vue';
import MainProfileView from './components/MainProfileView.vue';
import TitleProfileView from './components/TitleProfileView.vue';
import MountProfileView from './components/MountProfileView.vue';
import PetProfileView from './components/PetProfileView.vue';
import ReputationProfileView from './components/ReputationProfileView.vue';
import AchievementProfileView from './components/AchievementProfileView.vue';
import ShareProfileView from './components/ShareProfileView.vue';
import ReportBug from './components/ReportBug.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: CreateProfile,
        name: '/'
    },
    {
        path: '/armory/wow/profile/:armoryId',
        component: MainProfileView,
        name: 'main'
    },
    {
        path: '/armory/wow/profile/:armoryId/titles',
        component: TitleProfileView,
        name: 'titles'
    },
    {
        path: '/armory/wow/profile/:armoryId/mounts',
        component: MountProfileView,
        name: 'mounts'
    },
    {
        path: '/armory/wow/profile/:armoryId/pets',
        component: PetProfileView,
        name: 'mounts'
    },
    {
        path: '/armory/wow/profile/:armoryId/reputations',
        component: ReputationProfileView,
        name: 'mounts'
    },
    {
        path: '/armory/wow/profile/:armoryId/achievements',
        component: AchievementProfileView,
        name: 'mounts'
    },
    {
        path: '/armory/wow/profile/:armoryId/share',
        component: ShareProfileView,
        name: 'share'
    },
    {
        path: '/report/bug',
        component: ReportBug,
        name: 'report-bug'
    },
];

export default new VueRouter({
    routes,
    mode: 'history',
    base: '/'
});