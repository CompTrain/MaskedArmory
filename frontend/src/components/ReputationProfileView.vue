<template>
    <div class="content-rep">
        <div class="col2-rep">
            <div class="item-content">
                <div v-for="rep of reputationsSorted" class="clear">
                    <div class="rep_col1 highlight">
                        {{ rep.name }}
                    </div>
                    <div class="rep_col2">
                        <div class="meter">
                            <span > {{ rep.value }} / {{ rep.max }}</span>
                            <div class="meter_progress" :class="buildMeterProgressClass(rep.lowerStandingName)" :style="buildMeterProgressBar(rep)"></div>
                        </div>
                    </div>
                    <div class="rep_col3" :class="rep.lowerStandingName">{{ rep.standingName }}</div>
                </div>
            </div>
        </div>
        <div class="clear"></div>
    </div>
</template>

<script>
    export default {
        props: ['character'],

        data() {
            return {
                reputationsSorted: ''
            }
        },

        created() {
            this.reputationsSorted = this.reputationSortAndStanding(this.character.armory.reputation);

            console.log(this.reputationsSorted);
        },

        methods: {
            buildMeterProgressClass(standingName) {
                return "meter_progress_" + standingName;
            },

            buildMeterProgressBar(reputation) {
                let reputationBarWidth = (reputation.value / reputation.max) * 100;
                let reputationBarWidthString = reputationBarWidth.toString() + '%';
                return "width: " + reputationBarWidthString;
            },

            reputationSortAndStanding(reputations) {
                reputations.sort(this.sortByName);

                let arrayLength = reputations.length;
                for (let i = 0; i < arrayLength; i++) {

                    let standingName = this.getReputationStandingName(reputations[i].standing);

                    reputations[i].standingName = standingName;
                    reputations[i].lowerStandingName = standingName.toLowerCase();
                }

                return reputations;
            },

            getReputationStandingName(id) {
                let name = '';

                switch (id) {
                    case 0:
                        name = 'Hated';
                        break;
                    case 1:
                        name = 'Hostile';
                        break;
                    case 2:
                        name = 'Unfriendly';
                        break;
                    case 3:
                        name = 'Neutral';
                        break;
                    case 4:
                        name = 'Friendly';
                        break;
                    case 5:
                        name = 'Honored';
                        break;
                    case 6:
                        name = 'Revered';
                        break;
                    case 7:
                        name = 'Exalted';
                        break;
                }

                return name;
            },

            sortByName(a, b) {
                a = a['name'];
                b = b['name'];
                return a == b ? 0 : (a < b ? -1 : 1)
            },
        }
    }
</script>