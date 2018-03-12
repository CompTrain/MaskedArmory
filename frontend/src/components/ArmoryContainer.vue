<template>
    <div>
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
            <div class="row">
                <div class="col-md-12">
                    <div class="logo">
                        <img src="../../static/images/logo.png" alt="Logo" />
                    </div>
                </div>
            </div>

            <div class="row row-bottom-pad">
                <div class="col-md-12">
                    <div class="page_title">
                        <h1 class="txt_center">Level {{ character.armory.level }} {{ getRaceName(character.armory.race) }} {{ getClassName(character.armory.class) }}</h1>
                    </div>
                </div>
            </div>

            <div class="row row-bottom-pad">
                <div class="col-md-12" v-show="subRoute == 'main' || subRoute == ''">
                    <main-profile-view :character="character"></main-profile-view>
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
                character: '',
                subRoute: ''
            };
        },

        created() {
            this.showSpinner = true;
            this.profileId = this.$route.params.profileId;

            if (this.$route.params.subRoute) {
                this.subRoute = this.$route.params.subRoute;
            }

            this.getArmoryData();
        },

        methods: {
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