<template>
    <div>
        <div class="headline">
            <h6>Pet Collection</h6>
        </div>

        <div class="content-mountspets">
            <div class="item-content-pets-mounts scrollable">
                <div v-for="pet of character.armory.pets.collected" class="pets_thumb_outer">
                    <a class="pets_thumb" :class="buildQualityId(pet.qualityId)" :href="buildPetLink(pet.spellId)">
                        <img :src="buildPetImage(pet.creatureId)" alt="thumb" height="100px" width="100px" />
                    </a>
                    {{ pet.name }}
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
            buildQualityId(qualityId) {
                return "quality-" + qualityId;
            },

            buildPetLink(mountSpellId) {
                return 'https://wowhead.com/?spell=' + mountSpellId;
            },

            buildPetImage(creatureId) {
                return'http://media.blizzard.com/wow/renders/npcs/zoom/creature' + creatureId + '.jpg';
            },
        }
    }
</script>