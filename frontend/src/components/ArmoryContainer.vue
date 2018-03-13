<template>
    <div class="wrapper">
        <nav id="sidebar">
            <div class="sidebar-header">
                <div>
                    <img class="sidebar-logo" src="../../static/images/logo.png" alt="Logo" />
                </div>
            </div>

            <ul class="list-unstyled components">
                <p>Armory Navigation</p>
                <li>
                    <router-link :to="buildNavLink('main')">Main</router-link>
                </li>
                <li>
                    <router-link :to="buildNavLink('titles')">Titles</router-link>
                </li>
                <li>
                    <router-link :to="buildNavLink('mounts')">Mounts</router-link>
                </li>
                <li>
                    <router-link :to="buildNavLink('pets')">Pets</router-link>
                </li>
                <li>
                    <router-link :to="buildNavLink('reputations')">Reputations</router-link>
                </li>
                <li>
                    <router-link :to="buildNavLink('achievements')">Achievements</router-link>
                </li>
                <li>
                    <router-link :to="buildNavLink('share')">Share</router-link>
                </li>
            </ul>

            <ul class="list-unstyled CTAs">
                <li><router-link to="/donate" class="donate">Want to Donate?</router-link></li>
                <li><router-link to="/" class="misc">Create New Profile</router-link></li>
                <li><router-link to="/reportBug" class="misc">Report Bug</router-link></li>
            </ul>
        </nav>
        <div class="container-fluid" v-show="showSpinner">
            <div class="row">
                <div class="col-md-12">
                    <div class="logo">
                        <img src="../../static/images/logo.png" alt="Logo" />
                    </div>
                </div>
            </div>

            <div class="spinner"></div>
        </div>

        <div class="container-fluid" v-show="!showSpinner">
            <div class="row row-bottom-pad">
                <div class="col-md-12">
                    <div class="page_title">
                        <h1 class="txt_center">Level {{ character.armory.level }} {{ getRaceName(character.armory.race) }} {{ getClassName(character.armory.class) }}</h1>
                    </div>
                </div>
            </div>

            <div class="row row-bottom-pad">
                <div class="col-md-12">
                    <router-view :character="character"></router-view>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import Vue from 'vue';
    import router from '../router';
    import axios from 'axios';
    import numeral from 'numeral';

    import MainProfileView from './MainProfileView.vue';
    import TitleProfileView from './TitleProfileView.vue';
    import MountProfileView from './MountProfileView.vue';
    import PetProfileView from './PetProfileView.vue';
    import ReputationProfileView from './ReputationProfileView.vue';
    import AchievementProfileView from './AchievementProfileView.vue';

    export default {

        components: { MainProfileView, TitleProfileView, MountProfileView, PetProfileView, ReputationProfileView, AchievementProfileView},

        data() {
            return {
                apiUrl: 'http://localhost:5000',
                profileId: '',
                showSpinner: false,
                character: ''
            };
        },

        created() {
            this.showSpinner = true;
            this.profileId = this.$route.params.profileId;

            this.getArmoryData();
        },

        methods: {

            buildNavLink(subRoute) {
                return "/armory/wow/profile/" + this.profileId + "/" + subRoute;
            },

            getArmoryData() {
                let self = this;

                axios.get(this.apiUrl + "/armory/find/" + this.profileId).then(response => {
                    self.character = response.data;
                    self.showSpinner = false;
                });
            },

            getRaceName(raceId) {
                let raceName = '';

                switch (raceId) {
                    case 1:
                        raceName = 'Human';
                        break;
                    case 2:
                        raceName = 'Orc';
                        break;
                    case 3:
                        raceName = 'Dwarf';
                        break;
                    case 4:
                        raceName = 'Night Elf';
                        break;
                    case 5:
                        raceName = 'Undead';
                        break;
                    case 6:
                        raceName = 'Tauren';
                        break;
                    case 7:
                        raceName = 'Gnome';
                        break;
                    case 8:
                        raceName = 'Troll';
                        break;
                    case 9:
                        raceName = 'Goblin';
                        break;
                    case 10:
                        raceName = 'Blood Elf';
                        break;
                    case 11:
                        raceName = 'Draenei';
                        break;
                    case 22:
                        raceName = 'Worgen';
                        break;
                    case 24:
                        raceName = 'Pandaren';
                        break;
                    case 25:
                        raceName = 'Pandaren';
                        break;
                    case 26:
                        raceName = 'Pandaren';
                        break;
                    case 27:
                        raceName = 'Nightborne';
                        break;
                    case 28:
                        raceName = 'Highmountain Tauren';
                        break;
                    case 29:
                        raceName = 'Void Elf';
                        break;
                    case 30:
                        raceName = 'Lightforged Draenei';
                        break;
                }

                return raceName;
            },

            getClassName(classId) {
                let className = '';

                switch (classId) {
                    case 1:
                        className = 'Warrior';
                        break;
                    case 2:
                        className = 'Paladin';
                        break;
                    case 3:
                        className = 'Hunter';
                        break;
                    case 4:
                        className = 'Rogue';
                        break;
                    case 5:
                        className = 'Priest';
                        break;
                    case 6:
                        className = 'Death Knight';
                        break;
                    case 7:
                        className = 'Shaman';
                        break;
                    case 8:
                        className = 'Mage';
                        break;
                    case 9:
                        className = 'Warlock';
                        break;
                    case 10:
                        className = 'Monk';
                        break;
                    case 11:
                        className = 'Druid';
                        break;
                    case 12:
                        className = 'Demon Hunter';
                }

                return className;
            }
        }
    }
</script>

<style>
    @import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";

    body {
        font-family: 'Poppins', sans-serif;
    }

    p {
        font-family: 'Poppins', sans-serif;
        font-size: 1.1em;
        font-weight: 300;
        line-height: 1.7em;
        color: #999;
    }

    a, a:hover, a:focus {
        color: inherit;
        text-decoration: none;
        transition: all 0.3s;
    }

    .wrapper {
        margin-top: 50px;
        display: flex;
        align-items: stretch;
    }

    #sidebar {
        min-width: 250px;
        max-width: 250px;
        background: #202020;
        color: #979797;
        transition: all 0.3s;
        height: 100%;
    }

    .sidebar-logo {
        height: 80px;
        width: 100%;
    }

    #sidebar.active {
        margin-left: -250px;
    }

    #sidebar .sidebar-header {
        padding: 20px;
        background: #202020;
    }

    #sidebar ul.components {
        padding: 20px 0;
        border-bottom: 1px solid #979797;
    }

    #sidebar ul p {
        color: #fff;
        padding-top: 10px;
        padding-left: 10px;
        padding-right: 10px;
    }

    #sidebar ul li a {
        padding: 10px;
        font-size: 1.1em;
        display: block;
    }
    #sidebar ul li a:hover {
        color: #fff;
        background: #40bf40;
    }

    #sidebar ul li.active > a, a[aria-expanded="true"] {
        color: #fff;
        background: #40bf40;
    }


    a[data-toggle="collapse"] {
        position: relative;
    }

    a[aria-expanded="false"]::before, a[aria-expanded="true"]::before {
        content: '\e259';
        display: block;
        position: absolute;
        right: 20px;
        font-family: 'Glyphicons Halflings';
        font-size: 0.6em;
    }
    a[aria-expanded="true"]::before {
        content: '\e260';
    }


    ul ul a {
        font-size: 0.9em !important;
        padding-left: 30px !important;
        background: #6d7fcc;
    }

    ul.CTAs {
        padding: 20px;
    }

    ul.CTAs a {
        text-align: center;
        font-size: 0.9em !important;
        display: block;
        border-radius: 5px;
        margin-bottom: 5px;
    }

    a.donate {
        background: #40bf40;
        color: #fff;
    }

    a.donate:hover {
        background: #fff !important;
        color: #40bf40 !important;
    }

    a.misc {
        background: #979797 !important;
        color: #fff !important;
    }

    a.misc:hover {
        background: #fff !important;
        color: #40bf40 !important;
    }



</style>