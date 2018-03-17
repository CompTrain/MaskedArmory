<template>
    <div>
        <div class="container">
            <div class="container-home">
                <div class="row">
                    <div class="col-md-12">
                        <div class="logo">
                            <img src="../assets/images/logo.png" alt="Logo" />
                        </div>
                    </div>
                </div>

                <div class="row row-bottom-pad">
                    <div class="col-md-12">
                        <div class="profile-creation-box">
                            <div class="box-padding">
                                <span class="news">3/14/2018 Update :: Masked Armory has gone through a UX/UI update to help to add more content support at a later date, depending on what Battle for Azeroth introduces.  There have been some upgrades on the server side as well to constantly keep the achievements and server lists up to date.  Those will run as nightly jobs to ensure things stay as up-to-date as possible.  Also, when you select a region below you will ONLY see the server list for that region.  There will be no more crossover or duplicate servers in the list.</span><br/><br/>
                                <strong>Masked Armory</strong> is the most well known anonymous World of Warcraft (WoW) profile source in the Real Money Trading (RMT) market.  We hide your character and server name so that you can be protected when you are attempting to buy, sell, or trade a WoW account!  Come create your Masked Armory profile today in just a matter of seconds!
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="armoryError" class="row row-bottom-pad">
                    <div class="col-md-12">
                        <div class="error-box">
                            <div class="error-box-padding">
                                <div v-if="armoryError == 'server'">
                                    Please enter in your server name.
                                </div>
                                <div v-if="armoryError == 'character'">
                                    Please enter in your character name.
                                </div>
                                <div v-if="armoryError == 'armoryCreateFailed'">
                                    There was an error creating your profile.  This is due to a issue with the Battle.net API.
                                    Please try again in 10-15 minutes.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12 container-bottom-pad">
                        <div class="profile-creation-box">
                            <div class="box-padding">
                                <form class="form-horizontal" role="form">
                                    <div class="form-group">
                                        <label class="col-sm-12 control-label text-center font-weight-bold">Select Your Region</label>
                                        <div class="row text-center">
                                            <div class="col-sm-6">
                                                    <div class="flag-container" style="margin-left: 75px;" @click="setForm('us')">
                                                        <img
                                                                src="https://lipis.github.io/flag-icon-css/flags/4x3/us.svg"
                                                                alt="United States"
                                                                class="image"
                                                                height="80px"
                                                                width="100px"
                                                                :class="{ 'flag-selected': usFlagActive }"
                                                        />
                                                        <div class="overlay">
                                                            <div class="text">United States</div>
                                                        </div>
                                                    </div>
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="flag-container" style="margin-left: -10px;" @click="setForm('eu')">
                                                    <img
                                                            src="https://lipis.github.io/flag-icon-css/flags/4x3/eu.svg"
                                                            alt="Europe"
                                                            class="image"
                                                            height="80px"
                                                            width="100px"
                                                            :class="{ 'flag-selected': euFlagActive }"
                                                    />
                                                    <div class="overlay">
                                                        <div class="text">Europe</div>
                                                    </div>
                                                </div>
                                            </div>
                                            </div>
                                    </div>
                                    <template v-if="region">
                                        <div class="form-group" v-show="region == 'us'">
                                            <div class="col-sm-12">
                                                <awesomplete-us-server-list
                                                        ref="usServerName"
                                                        class="form-control"
                                                        style="width: 340px;"
                                                        id="usServerName"
                                                        name="usServerName"
                                                        placeholder="Your Server Name"
                                                        :serverList="usServerList"
                                                ></awesomplete-us-server-list>
                                            </div>
                                        </div>

                                        <div class="form-group" v-show="region == 'eu'">
                                            <div class="col-sm-12">
                                                <awesomplete-eu-server-list
                                                        ref="euServerName"
                                                        class="form-control"
                                                        style="width: 340px;"
                                                        id="euServerName"
                                                        name="euServerName"
                                                        placeholder="Your Server Name"
                                                        :serverList="euServerList"
                                                ></awesomplete-eu-server-list>
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <div class="col-sm-12">
                                                <input
                                                        type="text"
                                                        class="form-control"
                                                        id="characterName"
                                                        name="characterName"
                                                        placeholder="Your Character Name"
                                                />
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="col-sm-12 text-center">
                                                <button
                                                        type="submit"
                                                        class="btn create-profile-button"
                                                        id="createProfile"
                                                        @click="createArmoryProfile"
                                                >
                                                    Create Armory Profile
                                                </button>
                                            </div>
                                        </div>
                                    </template>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import Vue from 'vue';
    import router from '../router';
    import axios from 'axios';
    import AwesompleteUsServerList from './AwesompleteUsServerList.vue';
    import AwesompleteEuServerList from './AwesompleteEuServerList.vue';

    export default {
        components: { AwesompleteUsServerList, AwesompleteEuServerList },
        data() {
            return {
                region: '',
                usServerList: [],
                euServerList: [],
                usFlagActive: false,
                euFlagActive: false,
                armoryError: '',
                apiUrl: 'https://api.legion.maskedarmory.com'
            }
        },

        created() {
            let self = this;

            axios.get(`${this.apiUrl}/server/us/list`)
                .then((response) => {
                  let usServers = response.data.usServers;

                   self.usServerList = usServers.map((server) => {
                       return server.name;
                   });
                }).catch((error) => {
                    console.log(error);
                });

            axios.get(`${this.apiUrl}/server/eu/list`)
                .then((response) => {
                    let euServers = response.data.euServers;

                    self.euServerList = euServers.map((server) => {
                        return server.name;
                    });
                }).catch((error) => {
                    console.log(error);
                });
        },

        methods: {
            createArmoryProfile(event) {
                event.preventDefault();

                let serverName = '';

                if (this.region == 'us') {
                    serverName = $('#usServerName').val();
                } else if (this.region == 'eu') {
                    serverName = $('#euServerName').val();
                }

                let characterName = $('#characterName').val();

                if (!serverName) {
                    this.armoryError = 'server';
                } else if (!characterName) {
                    this.armoryError = 'character';
                } else {

                    let createProfileButton = $('#createProfile');

                    createProfileButton.prop("disabled", true);
                    createProfileButton.text("Building Profile...");

                    let postData = {
                        region: this.region,
                        characterName: characterName,
                        serverName: serverName
                    };

                    this.armoryError = '';
                    axios.post(`${this.apiUrl}/armory/create`, postData).then((response) => {
                        let data = response.data;
                        router.push({ name: 'main', params: { profileId: data.profileId }});
                    }).catch((err) => {
                        this.armoryError = 'armoryCreateFailed';

                        createProfileButton.prop("disabled", false);
                        createProfileButton.text("Create Armory Profile");
                    });
                }
            },

            setForm (region) {
                // Doing this check to ensure that that the ref is set,
                // so we don't get an undefined error when select a different region.
                if (this.$refs.usServerName) {
                    this.$refs.usServerName.awesomplete.input.value = '';
                }

                if (this.$refs.euServerName) {
                    this.$refs.euServerName.awesomplete.input.value = '';
                }

                this.serverName = '';
                this.characterName = '';
                this.region = region;

                if (region == 'us') {
                    this.usFlagActive = true;
                    this.euFlagActive = false;
                } else if (region == 'eu') {
                    this.usFlagActive = false;
                    this.euFlagActive = true;
                }
            }
        }
    }

</script>

<style>

    .flag-container {
        position: relative;
        width: 100px;
        height: 80px;
        cursor: pointer;
        padding: 0px;
    }

    .flag-container .image {
        border: black 3px solid;
    }

    .flag-container .overlay {
        position: absolute;
        bottom: 100%;
        left: 0;
        right: 0;
        background-color: #3a893a;
        overflow: hidden;
        width: 100%;
        height:0;
        transition: .5s ease;
    }

    .flag-container:hover .overlay {
        bottom: 0;
        height: 100%;
    }

    .flag-container .text {
        color: white;
        font-size: 14px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        text-align: center;
    }

    .flag-selected {
        border: #3a893a 3px solid !important;
    }
</style>