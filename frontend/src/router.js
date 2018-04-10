import Vue from 'vue';
import Router from 'vue-router';
import CreateProfile from './components/CreateProfile.vue';
import ArmoryContainer from './components/ArmoryContainer.vue';
import MainProfileView from './components/MainProfileView.vue';
import TitleProfileView from './components/TitleProfileView.vue';
import MountProfileView from './components/MountProfileView.vue';
import PetProfileView from './components/PetProfileView.vue';
import ReputationProfileView from './components/ReputationProfileView.vue';
import AchievementProfileView from './components/AchievementProfileView.vue';
import ShareProfileView from './components/ShareProfileView.vue';

Vue.use(Router);

const routes = [
    {
        path: '/',
        component: CreateProfile,
        name: '/'
    },
    {
        path: '/armory/wow/profile/',
        component: ArmoryContainer,
        name: 'armoryContainer',
        props: true,
        children: [
            {
                path: ':profileId/main',
                component: MainProfileView,
                name: 'main',
                props: true
            },
            {
                path: ':profileId/titles',
                component: TitleProfileView,
                name: 'titles',
                props: true
            },
            {
                path: ':profileId/mounts',
                component: MountProfileView,
                name: 'mounts',
                props: true
            },
            {
                path: ':profileId/pets',
                component: PetProfileView,
                name: 'pets',
                props: true
            },
            {
                path: ':profileId/reputations',
                component: ReputationProfileView,
                name: 'reputations',
                props: true
            },
            {
                path: ':profileId/achievements',
                component: AchievementProfileView,
                name: 'achievements',
                props: true
            },
            {
                path: ':profileId/share',
                component: ShareProfileView,
                name: 'share',
                props: true
            },
            {
                path: ':profileId',
                component: MainProfileView,
                name: 'main',
                props: true
            },
        ]
    }
];

export default new Router({
    mode: 'history',
    routes
});