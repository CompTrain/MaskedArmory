<template>
    <div class="wrapper">
        <nav id="sidebar" v-show="!showSpinner">
            <div class="sidebar-header">
                <div>
                    <router-link to="/"><img class="sidebar-logo" src="../assets/images/logo-horizontal.png" alt="Logo" /></router-link>
                </div>
            </div>

            <ul class="list-unstyled components">
                <p class="side-menu-title">Armory Navigation</p>

                <li class="sidebar-link" :class="{'active': $route.name == 'main' }">
                    <router-link :to="buildNavLink('main')"><i class="fas fa-home fa-fw" style="margin-right: 10px;"></i>Main</router-link>
                </li>
                <li class="sidebar-link":class="{'active': $route.name == 'titles' }">
                    <router-link :to="buildNavLink('titles')"><i class="fas fa-list fa-fw" style="margin-right: 10px;"></i>Titles</router-link>
                </li>
                <!--<li v-show="character.armory.progression" class="sidebar-link" :class="{'active': $route.name == 'progression' }">-->
                  <!--<router-link :to="buildNavLink('raid-progression')"><i class="fas fa-clipboard-list fa-fw" style="margin-right: 10px;"></i>Legion Raid Progression</router-link>-->
                <!--</li>-->
                <!--<li v-show="character.armory.pvp" class="sidebar-link" :class="{'active': $route.name == 'pvp' }">-->
                  <!--<router-link :to="buildNavLink('player-vs-player')"><i class="fas fa-star fa-fw" style="margin-right: 10px;"></i>Player Vs. Player</router-link>-->
                <!--</li>-->
                <li class="sidebar-link" :class="{'active': $route.name == 'mounts' }">
                    <router-link :to="buildNavLink('mounts')"><i class="fab fa-sticker-mule fa-fw" style="margin-right: 10px;"></i>Mounts</router-link>
                </li>
                <li class="sidebar-link" :class="{'active': $route.name == 'pets' }">
                    <router-link :to="buildNavLink('pets')"><i class="fas fa-paw fa-fw" style="margin-right: 10px;"></i>Pets</router-link>
                </li>
                <li class="sidebar-link" :class="{'active': $route.name == 'reputations' }">
                    <router-link :to="buildNavLink('reputations')"><i class="fas fa-align-left fa-fw" style="margin-right: 10px;"></i>Reputations</router-link>
                </li>
                <li class="sidebar-link" :class="{'active': $route.name == 'achievements' }">
                    <router-link :to="buildNavLink('achievements')"><i class="fas fa-trophy fa-fw" style="margin-right: 10px;"></i>Achievements</router-link>
                </li>
                <li class="sidebar-link" :class="{'active': $route.name == 'share' }">
                    <router-link :to="buildNavLink('share')"><i class="fas fa-share fa-fw" style="margin-right: 10px;"></i>Share</router-link>
                </li>
            </ul>

            <ul class="list-unstyled components">
                <p class="side-menu-title">Site Navigation</p>

                <li><a href="#" @click="showDonateModal"><i class="fas fa-donate fa-fw" style="margin-right: 10px;"></i>Want to Donate?</a></li>
                <li><a href="#" @click="showReportBugDialog"><i class="fas fa-bug fa-fw" style="margin-right: 10px;"></i>Report Bug | Site Feedback</a></li>
                <li><a href="#" @click="showAboutModal"><i class="fas fa-info fa-fw" style="margin-right: 10px;"></i>About Masked Armory</a></li>
            </ul>

            <ul class="list-unstyled components">
                <p class="side-menu-title">Advertisements</p>

                <li><a href="https://www.khaccounts.net/" target="_blank"><i class="fas fa-external-link-alt fa-fw" style="margin-right: 10px;"></i>Buy Sell WoW Accounts</a></li>
                <li><a href="https://www.khaccounts.net/buy-wow-accounts" target="_blank"><i class="fas fa-external-link-alt fa-fw" style="margin-right: 10px;"></i>Buy High End WoW Accounts</a></li>
                <li><a href="https://www.khaccounts.net/sell-wow-accounts" target="_blank"><i class="fas fa-external-link-alt fa-fw" style="margin-right: 10px;"></i>Sell Elite WoW Accounts</a></li>
            </ul>

        </nav>
        <div class="container-fluid" v-show="showSpinner">
            <div class="spinner"></div>
        </div>

        <div class="container-fluid" v-show="!showSpinner">
            <div class="row">
                <div class="col-md-12">
                    <div class="page_title">
                        <h1 class="txt_center">Level {{ levelNumber }} {{ raceName }} {{ className }}</h1>
                    </div>
                </div>
            </div>

            <div class="row row-bottom-pad">
                <div class="col-md-12">
                    <div class="ad">
                        <a href="https://www.khaccounts.net" target="_blank">
                            <img src="../assets/images/khaccounts_legion.jpg" class="img-responsive center-block" width="700"/>
                        </a>
                    </div>
                </div>
            </div>

            <div class="row row-bottom-pad" v-if="containerLoaded">
                <div class="col-md-12">
                    <transition name="fade">
                        <router-view :character="character" :profileId="profileId" :className="className" :raceName="raceName" :levelNumber="levelNumber" @interface="showSpinner = $event"></router-view>
                    </transition>
                </div>
            </div>
        </div>

        <modal name="donate" height="auto" transition="fade">
            <div>
                <p>Since 2007, when Masked Armory was released, the site has operated without financial help.  It will continue to do so, but that doesn't mean that donations are not appreciated to cover the server costs and my own time to help to keep the site up to date!  Anything that you can donate would be truly appreciated!</p>
                <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
                    <input type="hidden" name="cmd" value="_s-xclick">
                    <input type="hidden" name="hosted_button_id" value="XRS7TYPSWYAEC">
                    <input class="paypal-btn" type="submit" name="submit" value="Donate to Masked Armory">
                    <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
                </form>
            </div>
        </modal>

        <modal name="report-bug" height="auto" transition="fade">
            <div>
                <p>If you have found a bug or would like to offer up feedback about how we can make this website better, please fill out the form below and send it over!</p>

                <p v-show="reportBugSuccess" class="alert alert-success">Report was successfully sent!</p>
                <p v-show="reportBugError" class="alert alert-danger">There was an error sending the report.  Please try again.</p>

                <form>
                    <div class="form-group">
                        <label for="reportBugName" class="formLabel">Your Name</label>
                        <input type="text" class="form-control" id="reportBugName" placeholder="" v-model="reportBugName">
                    </div>
                    <div class="form-group">
                        <label for="reportBugEmail" class="formLabel">Your E-mail</label>
                        <input type="text" class="form-control" id="reportBugEmail" placeholder="" v-model="reportBugEmail">
                    </div>
                    <div class="form-group">
                        <label for="reportBugExplanation" class="formLabel">Please explain the bug you found or let us know the feedback you have:</label>
                        <textarea class="form-control" id="reportBugExplanation" rows="3" v-model="reportBugExplanation"></textarea>
                    </div>
                </form>

                <p style="text-align: center;">
                    <a href="#" class="btn misc" @click="$modal.hide('report-bug')">Close</a>
                    <a href="#" class="btn donate" id="sendBugReport" @click="sendBugReport">Send Report</a>
                </p>
            </div>
        </modal>

        <modal name="about" height="auto" transition="fade">
            <div>
                <p><a href="https://www.maskedarmory.com" target="_blank" class="modal-link">Masked Armory</a> was originally created in the summer 2007 by <a href="https://www.linkedin.com/in/shanejeffery86/" target="_blank" class="modal-link">Shane Jeffery</a> out of a market need and has been maintained by him to-date.  Most of the options that existed at that time were very slow and didn't provide all of the information necessary to help to understand the value of the character / account.  As of April 2018, there have been over 3 MILLION profiles created.  That is quite a feat given that this website is used for the black market buying, selling, and trading of a single game, World of Warcraft.</p>
                <p>Insofar as the technology used to run this website, it was rebuilt about a month ago using Node.js and MongoDB on the backend and Vue.js on the frontend to serve up an SPA (single page application) experience.  The site runs on AWS.</p>
            </div>
        </modal>
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
    import PvpProfileView from './PvpProfileView.vue';
    import ProgressionProfileView from './ProgressionProfileView.vue';

    export default {

        components: { MainProfileView, TitleProfileView, MountProfileView, PetProfileView, ReputationProfileView, AchievementProfileView, PvpProfileView, ProgressionProfileView},

        data() {
            return {
                // apiUrl: 'https://api.legion.maskedarmory.com',
                apiUrl: 'http://localhost:5000',
                profileId: '',
                showSpinner: false,
                containerLoaded: false,
                character: '',
                levelNumber: null,
                raceName: '',
                className: '',
                reportBugName: '',
                reportBugEmail: '',
                reportBugExplanation: '',
                reportBugError: false,
                reportBugSuccess: false
            };
        },

        async mounted() {
            this.showSpinner = true;
            this.profileId = this.$route.params.profileId;
            await this.getArmoryData();
            this.containerLoaded = true;
        },

        methods: {
            showDonateModal() {
                this.$modal.show('donate');
            },

            showReportBugDialog() {
                this.$modal.show('report-bug');
            },

            showAboutModal() {
                this.$modal.show('about');
            },

            async sendBugReport() {
                let sendBugReportButton = $('#sendBugReport');

                sendBugReportButton.prop("disabled", true);
                sendBugReportButton.text("Sending Bug Report...");

                let postData = {
                    name: this.reportBugName,
                    email: this.reportBugEmail,
                    explanation: this.reportBugExplanation
                };

                this.armoryError = '';
                axios.post(`${this.apiUrl}/report-bug`, postData).then((response) => {
                    this.reportBugSuccess = true;
                    this.reportBugError = false;

                    this.reportBugName = '';
                    this.reportBugEmail = '';
                    this.reportBugExplanation = '';

                    sendBugReportButton.prop("disabled", false);
                    sendBugReportButton.text("Send Report");
                }).catch((err) => {
                    this.reportBugSuccess = false;
                    this.reportBugError = true;
                    sendBugReportButton.prop("disabled", false);
                    sendBugReportButton.text("Send Report");
                });
            },

            buildNavLink(subRoute) {
                return "/armory/wow/profile/" + this.profileId + "/" + subRoute;
            },

            async getArmoryData() {
                let self = this;

                let response = await axios.get(this.apiUrl + "/armory/find/" + this.profileId);

                console.log(response);

                self.character = response.data;
                self.levelNumber = self.character.armory.level;
                self.raceName = self.getRaceName(this.character.armory.race);
                self.className = self.getClassName(this.character.armory.class);
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
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        min-width: 260px;
        max-width: 260px;
        background: #202020;
        color: #979797;
        transition: all 0.3s;
        border-right: 1px #373737 solid;
        border-radius: 10px;
        overflow-y: scroll;
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
        padding: 0 !important;
        margin: 0 !important;

    }

    #sidebar ul p {

        padding-top: 10px;
        padding-left: 10px;
        padding-right: 10px;
    }

    #sidebar ul li a {
        padding: 10px;

        display: block;
        transition: all .15s ease;
        border-left: 0px solid #40bf40;
        font-size: 14px;
    }

    #sidebar ul li a:hover {
        border-left: 6px solid #40bf40;
        cursor: pointer;
        color: white;
    }

    #sidebar ul li > a:hover > svg {
        color: #40bf40;
    }

    #sidebar ul li.active > a, a[aria-expanded="true"] {
        color: #fff;
        border-left: 6px solid #40bf40;
        cursor: not-allowed;
    }

    #sidebar ul li.active > a > svg {
        color: #40bf40
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

    .fade-enter-active, .fade-leave-active {
        transition-property: opacity;
        transition-duration: .25s;
    }

    .fade-enter-active {
        transition-delay: .25s;
    }

    .fade-enter, .fade-leave-active {
        opacity: 0
    }

    .v--modal {
        background: black;
        border: 1px silver solid;
        padding: 25px;
    }

    .v--modal-overlay {
        background: rgba(0, 0, 0, 0.5);
    }

    .paypal-btn {
        display: inline-block;
        font-family: inherit;
        font-size: 14px;
        background: #40bf40;
        color: #fff;
        text-align: center;
        padding: 10px 14px;
        margin: 0;
        border: 0;
        cursor: pointer;
        outline: none;
    }

    .paypal-btn:hover {
        background: #fff;
        color: #40bf40
    }

    .modal-link {
        color: #40bf40;
    }

    .modal-link:hover {
        color: #40bf40;
        text-decoration: underline;
    }

    .formLabel {
        color: #40bf40;
    }

    /*.dropdown.dark .dropdown-item.active > a {*/
        /*color: #fff;*/
        /*border-left: 6px solid #40bf40;*/
    /*}*/
</style>
