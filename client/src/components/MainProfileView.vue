<template>
    <div>
        <div class="headline">
            <h6>Main Profile</h6>
        </div>

        <div class="profile_picture_container">
            <div class="profile_picture">
                <div class="picture" :style="profilePictureCreation">
                    <div class="col1">
                        <a v-if="character.armory.items.head"
                           class="item-image"
                           :class="getItemQualityClassName('head')"
                           :href="getItemLink('head')"
                           :rel="getItemRelationships('head')">
                            <img height="45"
                                 width="45"
                                 :src="getItemImage('head')"
                                 class="gear"/>
                        </a>

                        <a v-else-if="!character.armory.items.head"
                           class="item-image item-image-gray">
                            <img height="45"
                                 width="45"
                                 src=../assets/images/emptyslots/head.gif"
                                 class="gear"/>
                        </a>

                        <a v-if="character.armory.items.neck"
                           class="item-image"
                           :class="getItemQualityClassName('neck')"
                           :href="getItemLink('neck')"
                           :rel="getItemRelationships('neck')">
                            <img height="45"
                                 width="45"
                                 :src="getItemImage('neck')"
                                 class="gear"/>
                        </a>

                        <a v-else-if="!character.armory.items.neck"
                           class="item-image item-image-gray">
                            <img height="45"
                                 width="45"
                                 src="../assets/images/emptyslots/neck.gif"
                                 class="gear"/>
                        </a>

                        <a v-if="character.armory.items.shoulder"
                           class="item-image"
                           :class="getItemQualityClassName('shoulder')"
                           :href="getItemLink('shoulder')"
                           :rel="getItemRelationships('shoulder')">
                            <img height="45"
                                 width="45"
                                 :src="getItemImage('shoulder')"
                                 class="gear"/>
                        </a>

                        <a v-else-if="!character.armory.items.shoulder"
                           class="item-image item-image-gray">
                            <img height="45"
                                 width="45"
                                 src="../assets/images/emptyslots/shoulder.gif"
                                 class="gear"/>
                        </a>

                        <a v-if="character.armory.items.back"
                           class="item-image"
                           :class="getItemQualityClassName('back')"
                           :href="getItemLink('back')"
                           :rel="getItemRelationships('back')">
                            <img height="45"
                                 width="45"
                                 :src="getItemImage('back')"
                                 class="gear"/>
                        </a>

                        <a v-else-if="!character.armory.items.back"
                           class="item-image item-image-gray">
                            <img height="45"
                                 width="45"
                                 src="../assets/images/emptyslots/back.gif"
                                 class="gear"/>
                        </a>


                        <a v-if="character.armory.items.chest"
                           class="item-image"
                           :class="getItemQualityClassName('chest')"
                           :href="getItemLink('chest')"
                           :rel="getItemRelationships('chest')">
                            <img height="45"
                                 width="45"
                                 :src="getItemImage('chest')"
                                 class="gear"/>
                        </a>

                        <a v-else-if="!character.armory.items.chest"
                           class="item-image item-image-gray">
                            <img height="45"
                                 width="45"
                                 src="../assets/images/emptyslots/chest.gif"
                                 class="gear"/>
                        </a>

                        <a v-if="character.armory.items.shirt"
                           class="item-image"
                           :class="getItemQualityClassName('shirt')"
                           :href="getItemLink('shirt')"
                           :rel="getItemRelationships('shirt')">
                            <img height="45"
                                 width="45"
                                 :src="getItemImage('shirt')"
                                 class="gear"/>
                        </a>

                        <a v-else-if="!character.armory.items.shirt"
                           class="item-image item-image-gray">
                            <img height="45"
                                 width="45"
                                 src="../assets/images/emptyslots/shirt.gif"
                                 class="gear"/>
                        </a>

                        <a v-if="character.armory.items.tabard"
                           class="item-image"
                           :class="getItemQualityClassName('tabard')"
                           :href="getItemLink('tabard')"
                           :rel="getItemRelationships('tabard')">
                            <img height="45"
                                 width="45"
                                 :src="getItemImage('tabard')"
                                 class="gear"/>
                        </a>

                        <a v-else-if="!character.armory.items.tabard"
                           class="item-image item-image-gray">
                            <img height="45"
                                 width="45"
                                 src="../assets/images/emptyslots/tabard.gif"
                                 class="gear"/>
                        </a>

                        <a v-if="character.armory.items.wrist"
                           class="item-image"
                           :class="getItemQualityClassName('wrist')"
                           :href="getItemLink('wrist')"
                           :rel="getItemRelationships('wrist')">
                            <img height="45"
                                 width="45"
                                 :src="getItemImage('wrist')"
                                 class="gear"/>
                        </a>

                        <a v-else-if="!character.armory.items.wrist"
                           class="item-image item-image-gray">
                            <img height="45"
                                 width="45"
                                 src="../assets/images/emptyslots/wrists.gif"
                                 class="gear"/>
                        </a>

                    </div>

                    <div class="col2 item-footer">
                        <div class="item-footer">

                            <a v-if="character.armory.items.mainHand"
                               class="item-image"
                               :class="getItemQualityClassName('mainHand')"
                               :href="getItemLink('mainHand')"
                               :rel="getItemRelationships('mainHand')">
                                <img height="45"
                                     width="45"
                                     :src="getItemImage('mainHand')"
                                     class="gear"/>
                            </a>

                            <a v-else-if="!character.armory.items.mainHand"
                               class="item-image item-image-gray">
                                <img height="45"
                                     width="45"
                                     src="../assets/images/emptyslots/mainhand.gif"
                                     class="gear"/>
                            </a>

                            <a v-if="character.armory.items.offHand"
                               class="item-image"
                               :class="getItemQualityClassName('offHand')"
                               :href="getItemLink('offHand')"
                               :rel="getItemRelationships('offHand')">
                                <img height="45"
                                     width="45"
                                     :src="getItemImage('offHand')"
                                     class="gear"/>
                            </a>

                            <a v-else-if="!character.armory.items.offHand"
                               class="item-image item-image-gray">
                                <img height="45"
                                     width="45"
                                     src="../assets/images/emptyslots/secondhand.gif"
                                     class="gear"/>
                            </a>
                        </div>
                    </div>

                    <div class="col3">

                        <a v-if="character.armory.items.hands"
                           class="item-image"
                           :class="getItemQualityClassName('hands')"
                           :href="getItemLink('hands')"
                           :rel="getItemRelationships('hands')">
                            <img height="45"
                                 width="45"
                                 :src="getItemImage('hands')"
                                 class="gear"/>
                        </a>

                        <a v-else-if="!character.armory.items.hands"
                           class="item-image item-image-gray">
                            <img height="45"
                                 width="45"
                                 src="../assets/images/emptyslots/hands.gif"
                                 class="gear"/>
                        </a>

                        <a v-if="character.armory.items.waist"
                           class="item-image"
                           :class="getItemQualityClassName('waist')"
                           :href="getItemLink('waist')"
                           :rel="getItemRelationships('waist')">
                            <img height="45"
                                 width="45"
                                 :src="getItemImage('waist')"
                                 class="gear"/>
                        </a>

                        <a v-else-if="!character.armory.items.waist"
                           class="item-image item-image-gray">
                            <img height="45"
                                 width="45"
                                 src="../assets/images/emptyslots/waist.gif"
                                 class="gear"/>
                        </a>

                        <a v-if="character.armory.items.legs"
                           class="item-image"
                           :class="getItemQualityClassName('legs')"
                           :href="getItemLink('legs')"
                           :rel="getItemRelationships('legs')">
                            <img height="45"
                                 width="45"
                                 :src="getItemImage('legs')"
                                 class="gear"/>
                        </a>

                        <a v-else-if="!character.armory.items.legs"
                           class="item-image item-image-gray">
                            <img height="45"
                                 width="45"
                                 src="../assets/images/emptyslots/legs.gif"
                                 class="gear"/>
                        </a>

                        <a v-if="character.armory.items.feet"
                           class="item-image"
                           :class="getItemQualityClassName('feet')"
                           :href="getItemLink('feet')"
                           :rel="getItemRelationships('feet')">
                            <img height="45"
                                 width="45"
                                 :src="getItemImage('feet')"
                                 class="gear"/>
                        </a>

                        <a v-else-if="!character.armory.items.feet"
                           class="item-image item-image-gray">
                            <img height="45"
                                 width="45"
                                 src="../assets/images/emptyslots/feet.gif"
                                 class="gear"/>
                        </a>

                        <a v-if="character.armory.items.finger1"
                           class="item-image"
                           :class="getItemQualityClassName('finger1')"
                           :href="getItemLink('finger1')"
                           :rel="getItemRelationships('finger1')">
                            <img height="45"
                                 width="45"
                                 :src="getItemImage('finger1')"
                                 class="gear"/>
                        </a>

                        <a v-else-if="!character.armory.items.finger1"
                           class="item-image item-image-gray">
                            <img height="45"
                                 width="45"
                                 src="../assets/images/emptyslots/ring.gif"
                                 class="gear"/>
                        </a>

                        <a v-if="character.armory.items.finger2"
                           class="item-image"
                           :class="getItemQualityClassName('finger2')"
                           :href="getItemLink('finger2')"
                           :rel="getItemRelationships('finger2')">
                            <img height="45"
                                 width="45"
                                 :src="getItemImage('finger2')"
                                 class="gear"/>
                        </a>

                        <a v-else-if="!character.armory.items.finger2"
                           class="item-image item-image-gray">
                            <img height="45"
                                 width="45"
                                 src="../assets/images/emptyslots/ring.gif"
                                 class="gear"/>
                        </a>

                        <a v-if="character.armory.items.trinket1"
                           class="item-image"
                           :class="getItemQualityClassName('trinket1')"
                           :href="getItemLink('trinket1')"
                           :rel="getItemRelationships('trinket1')">
                            <img height="45"
                                 width="45"
                                 :src="getItemImage('trinket1')"
                                 class="gear"/>
                        </a>

                        <a v-else-if="!character.armory.items.trinket1"
                           class="item-image item-image-gray">
                            <img height="45"
                                 width="45"
                                 src="../assets/images/emptyslots/trinket.gif"
                                 class="gear"/>
                        </a>


                        <a v-if="character.armory.items.trinket2"
                           class="item-image"
                           :class="getItemQualityClassName('trinket2')"
                           :href="getItemLink('trinket2')"
                           :rel="getItemRelationships('trinket2')">
                            <img height="45"
                                 width="45"
                                 :src="getItemImage('trinket2')"
                                 class="gear"/>
                        </a>

                        <a v-else-if="!character.armory.items.trinket2"
                           class="item-image item-image-gray">
                            <img height="45"
                                 width="45"
                                 src="../assets/images/emptyslots/trinket.gif"
                                 class="gear"/>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="widget_left">
                <h4 class="widget_title">Total Achievements Points:</h4>
                <div class="widget_content">
                    <span class="highlight">Achievement Points:</span> {{ character.armory.achievementPoints }}
                </div>
                <div class="widget_content_divider"></div>
                <h4 class="widget_title">Item Levels:</h4>
                <div class="widget_content">
                    <span class="highlight">Item Level (Total):</span> {{ character.armory.items.averageItemLevel }}<br/>
                    <span class="highlight">Item Level (Equipped):</span> {{ character.armory.items.averageItemLevelEquipped }}
                </div>
                <div class="widget_content_divider"></div>
                <h4 class="widget_title">PRIMARY PROFESSIONS:</h4>
                <div class="widget_content">

                    <div class="profession_float" v-show="!character.armory.professions.primary[0].name">
                        <img src="../assets/images/professions/None.gif" alt="None">

                        <span class="highlight">No Profession</span>
                        <br/>
                        <span class="profession_number_indent">0 / 0</span>
                        <br/>
                    </div>

                    <div class="profession_float" v-if="character.armory.professions.primary[0]">
                        <img :src="getProfessionImage(character.armory.professions.primary[0].name)">

                        <span class="highlight">{{ character.armory.professions.primary[0].name }}</span>
                        <br/>
                        <span class="profession_number_indent">{{ character.armory.professions.primary[0].rank }} / {{ character.armory.professions.primary[0].max }}</span>
                        <br/>
                    </div>

                    <div class="profession_float" v-show="!character.armory.professions.primary[1]">
                        <img src="../assets/images/professions/None.gif" alt="None">

                        <span class="highlight">No Profession</span>
                        <br/>
                        <span class="profession_number_indent">0 / 0</span>
                        <br/>
                    </div>

                    <div class="profession_float" v-if="character.armory.professions.primary[1]">
                        <img :src="getProfessionImage(character.armory.professions.primary[1].name)">

                        <span class="highlight">{{ character.armory.professions.primary[1].name }} </span>
                        <br/>
                        <span class="profession_number_indent">{{ character.armory.professions.primary[1].rank }} / {{character.armory.professions.primary[1].max }}</span>
                        <br/>
                    </div>

                </div>
            </div>

            <div class="widget_right">
                <h4 class="widget_title">Stat Summary:</h4>
                <div class="stat_column" style="border-right: 2px solid #161616;">
                    <h4>Attributes</h4>
                    <ul>
                        <li>
                            <span class="name">Strength</span>
                            <span class="value">{{ character.armory.stats.str }}</span>
                            <span class="clear"></span>
                        </li>
                        <li>
                            <span class="name">Agility</span>
                            <span class="value">{{ character.armory.stats.agi }}</span>
                            <span class="clear"></span>
                        </li>
                        <li>
                            <span class="name">Intellect</span>
                            <span class="value">{{ character.armory.stats.int }}</span>
                            <span class="clear"></span>
                        </li>
                        <li>
                            <span class="name">Stamina</span>
                            <span class="value">{{ character.armory.stats.sta }}</span>
                            <span class="clear"></span>
                        </li>
                    </ul>
                    <h4>Attack</h4>
                    <ul v-show="character.armory.stats.rangedDmgMin < 0">
                        <li>
                            <span class="name">Damage</span>
                            <span class="value">{{ character.armory.stats.mainHandDmgMin }} - {{ character.armory.stats.mainHandDmgMax }}</span>
                            <span class="clear"></span>
                        </li>
                        <li>
                            <span class="name">Speed</span>
                            <span class="value">{{ formatNumber(character.armory.stats.mainHandSpeed, '0.00') }}</span>
                            <span class="clear"></span>
                        </li>
                    </ul>
                    <ul v-show="character.armory.stats.rangedDmgMin > 0">
                        <li>
                            <span class="name">Damage</span>
                            <span class="value">{{ character.armory.stats.rangedDmgMin }} - {{ character.armory.stats.rangedDmgMax }}</span>
                            <span class="clear"></span>
                        </li>
                        <li>
                            <span class="name">Speed</span>
                            <span class="value">{{ formatNumber(character.armory.stats.rangedSpeed, '0.00') }}</span>
                            <span class="clear"></span>
                        </li>
                    </ul>

                    <h4 v-show="character.armory.stats.mana5 > 0">Spell</h4>
                    <ul v-show="character.armory.stats.mana5 > 0">
                        <li>
                            <span class="name">Mana Regen</span>
                            <span class="value">{{ character.armory.stats.mana5 }}</span>
                            <span class="clear"></span>
                        </li>
                    </ul>
                </div>

                <div class="stat_column">
                    <h4>Defense</h4>
                    <ul>
                        <li>
                            <span class="name">Armor</span>
                            <span class="value">{{ character.armory.stats.armor }}</span>
                            <span class="clear"></span>
                        </li>
                        <li>
                            <span class="name">Dodge</span>
                            <span class="value">{{ formatNumber(character.armory.stats.dodge, '0.00') }}%</span>
                            <span class="clear"></span>
                        </li>
                        <li>
                            <span class="name">Parry</span>
                            <span class="value">{{ formatNumber(character.armory.stats.parry, '0.00') }}%</span>
                            <span class="clear"></span>
                        </li>
                        <li>
                            <span class="name">Block</span>
                            <span class="value">{{ formatNumber(character.armory.stats.block, '0.00') }}%</span>
                            <span class="clear"></span>
                        </li>
                    </ul>
                    <h4>Enhancements</h4>
                    <ul>

                        <li>
                            <span class="name">Crit</span>
                            <span class="value">{{ formatNumber(character.armory.stats.crit, '0.00') }}%</span>
                            <span class="clear"></span>
                        </li>
                        <li>
                            <span class="name">Haste</span>
                            <span class="value">{{ formatNumber(character.armory.stats.haste, '0.00') }}%</span>
                            <span class="clear"></span>
                        </li>
                        <li>
                            <span class="name">Mastery</span>
                            <span class="value">{{ formatNumber(character.armory.stats.mastery, '0.00') }}%</span>
                            <span class="clear"></span>
                        </li>
                        <li>
                            <span class="name">Leech:</span>
                            <span class="value">{{ formatNumber(character.armory.stats.leech, '0.00') }}%</span>
                            <span class="clear"></span>
                        </li>
                        <li>
                            <span class="name">Versatility:</span>
                            <span class="value">{{ formatNumber(character.armory.stats.versatilityDamageDoneBonus, '0.00') }}%</span>
                            <span class="clear"></span>
                        </li>
                        <li>
                            <span class="name">Avoidance:</span>

                            <span class="value">{{ formatNumber(character.armory.stats.avoidanceRating, '0.00') }}%</span>
                            <span class="clear"></span>
                        </li>
                    </ul>
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

    export default {
        name: 'mainProfileView',
        props: ['character'],

        data() {
            return {
                profilePicture: '',
            };
        },

        mounted() {
            this.profilePicture = this.buildProfilePictureLink(this.character.armory.thumbnail, this.character.armory.origin);
            let showSpinner = false;
            this.$emit('interface', showSpinner);
        },

        computed: {
            profilePictureCreation() {
                return `background: url(${this.profilePicture}) no-repeat center/cover; height: 500px`;
            },
        },

        methods: {
            getProfessionImage(professionName) {
                return "/src/assets/images/professions/" + professionName + ".gif";
            },

            getItemQualityClassName(slot) {
                return "item-image-" + this.getQualityName(this.character.armory.items[slot].quality);
            },

            getItemLink(slot) {
                return `https://wod.wowhead.com/item=${this.character.armory.items[slot].id}`;
            },

            getItemRelationships(slot) {
                let relationshipArray = [];

                if (this.character.armory.items[slot].tooltipParams.gem0 != null) {
                    relationshipArray.push("gems=" + this.character.armory.items[slot].tooltipParams.gem0);
                }

                if (this.character.armory.items[slot].tooltipParams.enchant != null) {
                    relationshipArray.push("ench=" + this.character.armory.items[slot].tooltipParams.enchant);
                }

                if (this.character.armory.items[slot].upgrade != null) {
                    relationshipArray.push("upgd=" + this.character.armory.items[slot].upgrade);
                }

                if (this.character.armory.items[slot].tooltipParams.set != null) {
                    relationshipArray.push("pcs=" + this.getItemBonus(this.character.armory.items[slot].tooltipParams.set));
                }

                if (this.getItemBonus(this.character.armory.items[slot].bonusLists) != null) {
                    relationshipArray.push("bonus=" + this.getItemBonus(this.character.armory.items[slot].bonusLists));
                }

                return relationshipArray.join('&amp;');
            },

            getItemImage(slot) {
                return `https://wod.wowhead.com/images/wow/icons/large/${this.character.armory.items[slot].icon}.jpg`
            },

            buildProfilePictureLink(thumbnail, origin) {
                let profilePicture;

                if (typeof thumbnail !== 'undefined') {
                    let profilePictureBase = thumbnail.replace('-avatar.jpg', '');
                    profilePicture = 'https://render-' + origin + '.worldofwarcraft.com/character/' + profilePictureBase + '-main.jpg';
                } else {
                    profilePicture = '';
                }

                return profilePicture;
            },

            formatNumber(value, format) {
                return numeral(value).format(format);
            },

            getQualityName(qualityId) {
                let qualityName = '';

                switch (qualityId){
                    case 0:
                        qualityName = 'grey';
                        break;
                    case 1:
                        qualityName = 'white';
                        break;
                    case 2:
                        qualityName = 'green';
                        break;
                    case 3:
                        qualityName = 'blue';
                        break;
                    case 4:
                        qualityName = 'violet';
                        break;
                    case 5:
                        qualityName = 'orange';
                        break;
                    case 6:
                        qualityName = 'artifact';
                        break;
                    case 7:
                        qualityName = 'heirloom';
                        break;
                }

                return qualityName;
            },

            getItemBonus(bonusArray) {
                if (typeof bonusArray !== 'undefined') {
                    return bonusArray.join(':');
                } else {
                    return '';
                }
            }
        }
    }
</script>