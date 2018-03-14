<template>
    <div class="content-ach" id="achievementContent">
        <div class="specialbox_outer">
            <div class="specialbox">
                <div class="col2-ach">
                    <div class="item-content-achievements">
                        <div class="meter">
                            <span>Completed: {{ character.armory.achievementCounts.Total.count }} / {{ character.armory.achievementCounts.Total.total }}</span>
                            <div class="meter_progress meter_progress_green" :style="buildMeterProgressBar(character.armory.achievementCounts.Total)">&nbsp;</div>
                        </div>

                        <div class="clear"></div>

                        <div class="ach_col1">
                            <div class="highlight pad-bottom5 pad-top5">General:</div>
                            <div class="meter">
                                <span>{{ character.armory.achievementCounts.General.count }} / {{ character.armory.achievementCounts.General.total }}</span>
                                <div class="meter_progress meter_progress_blue" :style="buildMeterProgressBar(character.armory.achievementCounts.General)">&nbsp;</div>
                            </div>
                        </div>
                        <div class="ach_col2">
                            <div class="highlight pad-bottom5 pad-top5">Quests:</div>
                            <div class="meter">
                                <span>{{ character.armory.achievementCounts.Quests.count }} / {{ character.armory.achievementCounts.Quests.total }}</span>
                                <div class="meter_progress meter_progress_blue" :style="buildMeterProgressBar(character.armory.achievementCounts.Quests)">&nbsp;</div>
                            </div>
                        </div>

                        <div class="clear"></div>

                        <div class="ach_col1">
                            <div class="highlight pad-bottom5 pad-top5">Exploration:</div>
                            <div class="meter">
                                <span>{{ character.armory.achievementCounts.Exploration.count }} / {{ character.armory.achievementCounts.Exploration.total }}</span>
                                <div class="meter_progress meter_progress_blue" :style="buildMeterProgressBar(character.armory.achievementCounts.Exploration)">&nbsp;</div>
                            </div>
                        </div>
                        <div class="ach_col2">
                            <div class="highlight pad-bottom5 pad-top5">Player vs. Player:</div>
                            <div class="meter">
                                <span>{{ character.armory.achievementCounts['Player vs Player'].count }} / {{ character.armory.achievementCounts['Player vs Player'].total }}</span>
                                <div class="meter_progress meter_progress_blue" :style="buildMeterProgressBar(character.armory.achievementCounts['Player vs Player'])">&nbsp;</div>
                            </div>
                        </div>

                        <div class="clear"></div>

                        <div class="ach_col1">
                            <div class="highlight pad-bottom5 pad-top5">Dungeons & Raids:</div>
                            <div class="meter">
                                <span>{{ character.armory.achievementCounts['Dungeons & Raids'].count }} / {{ character.armory.achievementCounts['Dungeons & Raids'].total }}</span>
                                <div class="meter_progress meter_progress_blue" :style="buildMeterProgressBar(character.armory.achievementCounts['Dungeons & Raids'])">&nbsp;</div>
                            </div>
                        </div>
                        <div class="ach_col2">
                            <div class="highlight pad-bottom5 pad-top5">Professions:</div>
                            <div class="meter">
                                <span>{{ character.armory.achievementCounts.Professions.count }} / {{ character.armory.achievementCounts.Professions.total }}</span>
                                <div class="meter_progress meter_progress_blue" :style="buildMeterProgressBar(character.armory.achievementCounts['Professions'])">&nbsp;</div>
                            </div>
                        </div>

                        <div class="clear"></div>

                        <div class="ach_col1">
                            <div class="highlight pad-bottom5 pad-top5">Reputation:</div>
                            <div class="meter">
                                <span>{{ character.armory.achievementCounts.Reputation.count }} / {{ character.armory.achievementCounts.Reputation.total }}</span>
                                <div class="meter_progress meter_progress_blue" :style="buildMeterProgressBar(character.armory.achievementCounts['Reputation'])">&nbsp;</div>
                            </div>
                        </div>
                        <div class="ach_col2">
                            <div class="highlight pad-bottom5 pad-top5">Scenarios:</div>
                            <div class="meter">
                                <span>{{ character.armory.achievementCounts.Scenarios.count }} / {{ character.armory.achievementCounts.Scenarios.total }}</span>
                                <div class="meter_progress meter_progress_blue" :style="buildMeterProgressBar(character.armory.achievementCounts.Scenarios)">&nbsp;</div>
                            </div>
                        </div>

                        <div class="clear"></div>

                        <div class="ach_col1">
                            <div class="highlight pad-bottom5 pad-top5">World Events:</div>
                            <div class="meter">
                                <span>{{ character.armory.achievementCounts['World Events'].count }} / {{ character.armory.achievementCounts['World Events'].total }}</span>
                                <div class="meter_progress meter_progress_blue" :style="buildMeterProgressBar(character.armory.achievementCounts['World Events'])">&nbsp;</div>
                            </div>
                        </div>
                        <div class="ach_col2">
                            <div class="highlight pad-bottom5 pad-top5">Pet Battles:</div>
                            <div class="meter">
                                <span>{{ character.armory.achievementCounts['Pet Battles'].count }} / {{ character.armory.achievementCounts['Pet Battles'].total }}</span>
                                <div class="meter_progress meter_progress_blue" :style="buildMeterProgressBar(character.armory.achievementCounts['Pet Battles'])">&nbsp;</div>
                            </div>
                        </div>

                        <div class="clear"></div>

                        <div class="ach_col1">
                            <div class="highlight pad-bottom5 pad-top5">Collections:</div>
                            <div class="meter">
                                <span>{{ character.armory.achievementCounts.Collections.count }} / {{ character.armory.achievementCounts.Collections.total }}</span>
                                <div class="meter_progress meter_progress_blue" :style="buildMeterProgressBar(character.armory.achievementCounts.Collections)">&nbsp;</div>
                            </div>
                        </div>
                        <div class="ach_col2">
                            <div class="highlight pad-bottom5 pad-top5">Draenor Garrison:</div>
                            <div class="meter">
                                <span>{{ character.armory.achievementCounts['Draenor Garrison'].count }} / {{ character.armory.achievementCounts['Draenor Garrison'].total }}</span>
                                <div class="meter_progress meter_progress_blue" :style="buildMeterProgressBar(character.armory.achievementCounts['Draenor Garrison'])"></div>
                            </div>
                        </div>

                        <div class="clear"></div>

                        <div class="ach_col1">
                            <div class="highlight pad-bottom5 pad-top5">Class Hall:</div>
                            <div class="meter">
                                <span>{{ character.armory.achievementCounts['Class Hall'].count }} / {{ character.armory.achievementCounts['Class Hall'].total }}</span>
                                <div class="meter_progress meter_progress_blue" :style="buildMeterProgressBar(character.armory.achievementCounts['Class Hall'])">&nbsp;</div>
                            </div>
                        </div>
                        <div class="ach_col2">
                            <div class="highlight pad-bottom5 pad-top5">Legacy:</div>
                            <div class="meter">
                                <span>{{ character.armory.achievementCounts.Legacy.count }}</span>
                                <div class="meter_progress meter_progress_blue" style="width: 0%;">&nbsp;</div>
                            </div>
                        </div>

                        <div class="clear"></div>

                        <div class="ach_col1">
                            <div class="highlight pad-bottom5 pad-top5">Feats of Strength:</div>
                            <div class="meter">
                                <span>{{ character.armory.achievementCounts['Feats of Strength'].count }}</span>
                                <div class="meter_progress meter_progress_blue" style="width: 0%;">&nbsp;</div>
                            </div>
                        </div>
                        <div class="ach_col2">
                            <div class="highlight pad-bottom5 pad-top5"></div>
                        </div>

                        <div class="clear"></div>
                    </div>
                </div>

                <div class="h10"></div>
                <div class="item-content achievements scrollable">
                    <h3>Feats of Strength:</h3>

                    <div v-for="feat of formatFeatsData(character.armory.achievementCounts['Feats of Strength'].achievements)" class="clear">
                        <a :href="buildAchievementLink(feat.id)" target="_blank">
                            <p class="highlight underline">{{ feat.title }}</p>
                        </a>
                        <p>{{ feat.description }}</p>
                    </div>
                </div>

                <div class="clear"></div>
                <div class="h10"></div>
                <div class="item-content achievements scrollable">
                    <h3>Legacy:</h3>

                    <div v-for="legacy of character.armory.achievementCounts.Legacy.achievements" class="clear">
                        <a :href="buildAchievementLink(legacy.id)" target="_blank">
                            <p class="highlight underline">{{ legacy.title }}</p>
                        </a>
                        <p> {{ legacy.description }}</p>
                    </div>
                </div>

            </div>
            <div class="clear"></div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['character'],

        mounted() {
            let showSpinner = false;
            this.$emit('interface', showSpinner);
        },

        methods: {
            buildAchievementLink(achievementId) {
                return `https://wowhead.com/?achievement=${achievementId}`;
            },

            buildMeterProgressBar(achievement) {
                let achievementBarWidth = (achievement.count / achievement.total) * 100;
                let achievementBarWidthString = achievementBarWidth.toString() + '%';
                return `width: ${achievementBarWidthString}`;
            },

            formatFeatsData(feats) {
                return feats.map((feat) => {
                    return feat;
                });
            }
        }
    }
</script>

