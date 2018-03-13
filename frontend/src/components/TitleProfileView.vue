<template>
    <div class="content-titles">
        <div class="col2-titles">
            <div class="item-content">
                <p v-for="title of titlesSorted" class="title-padding">
                    <a :href="buildTitleLink(title.id)" target="_blank" class="highlight">{{ title.name }}</a>
                </p>
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
                titlesSorted: ''
            }
        },

        created() {
            this.titlesSorted = this.titleSort(this.character.armory.titles);
        },

        methods: {
            buildTitleLink(titleId) {
                return 'https://wowhead.com/?title=' + titleId;
            },

            titleSort(titles) {

                let arrayLength = titles.length;
                for (let i = 0; i < arrayLength; i++) {

                    let cleanTitle = titles[i].name.replace('%s', '');
                    cleanTitle = cleanTitle.replace(',', '');

                    titles[i].name = cleanTitle.trim();
                }

                titles.sort(this.sortByName);
                return titles;
            },

            sortByName(a, b) {
                a = a['name'];
                b = b['name'];
                return a == b ? 0 : (a < b ? -1 : 1)
            },
        }
    }
</script>