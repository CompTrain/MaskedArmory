<template>

    <!--<require from="resources/value-converters/race-name"></require>-->
    <!--<require from="resources/value-converters/class-name"></require>-->
    <!--<require from="resources/value-converters/gender-name"></require>-->

    <div class="content-titles">
        <div class="col2-titles">
            <div class="item-content scrollable">
                <p>Copy paste these into forums to easily link to your character:</p>
                <p class="highlight underline">Forums (EpicNPC, OwnedCore, phpBB, vBulletin):</p>
                <p class="code">
                    [url=https://legion.maskedarmory.com/armory/wow/profile/${profileId}] Anonymous Level ${character.armory.level} ${character.armory.race | raceName} ${character.armory.class | className} WoW Profile | Masked Armory[/url]
                </p>
                <p class="highlight underline">Direct URI</p>
                <p class="code">
                    https://legion.maskedarmory.com/armory/wow/profile/${profileId}
                </p>
            </div>
        </div>
    </div>
</template>