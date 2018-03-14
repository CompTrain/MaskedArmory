<template>
    <div class="content-titles">
        <div class="col2-titles">
            <div class="item-content-small scrollable">
                <p>Copy paste these into forums to easily link to your character:</p>
                <p class="highlight underline">Forums (EpicNPC, OwnedCore, phpBB, vBulletin):</p>
                <p class="code">
                    [url=https://legion.maskedarmory.com/armory/wow/profile/{{ profileId }}] Anonymous Level {{ levelNumber }} {{ raceName }} {{ className }} WoW Profile | Masked Armory[/url]
                </p>
                <p class="highlight underline">Direct URI</p>
                <p class="code">
                    https://legion.maskedarmory.com/armory/wow/profile/{{ profileId }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['levelNumber', 'raceName', 'className', 'profileId'],

        mounted() {
            let showSpinner = false;
            this.$emit('interface', showSpinner);
        },
    }
</script>