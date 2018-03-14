<template>
    <div class="content-mountspets">
        <div class="item-content-pets-mounts scrollable">
            <div v-for="mount of character.armory.mounts.collected" class="pets_thumb_outer">
                <a class="pets_thumb" :class="buildQualityId(mount.qualityId)" :href="buildMountLink(mount.spellId)">
                    <img :src="buildMountImage(mount.creatureId)" alt="thumb" height="100px" width="100px" />
                </a>
                {{ mount.name }}
            </div>
        </div>
        <div class="clear"></div>
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

            buildMountLink(mountSpellId) {
                return 'https://wowhead.com/?spell=' + mountSpellId;
            },

            buildMountImage(creatureId) {
                return'http://media.blizzard.com/wow/renders/npcs/zoom/creature' + creatureId + '.jpg';
            }
        }
    }
</script>