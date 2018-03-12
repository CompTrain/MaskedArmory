<template>
    <input
            ref="awesomplete"
            v-model="model"
            class="form-control"
            type="text"
    />
</template>

<script>
    import Vue from 'vue';
    import Awesomplete from 'awesomplete';

    export default {
        name: 'awesompleteEuServerList',
        data () {
            return {
                awesomplete: {},
                model: ''
            }
        },
        props: {
            serverList: { required: true}
        },
        mounted () {
            let self = this;
            this.$nextTick(() => {
                self.awesomplete = new Awesomplete(self.$refs.awesomplete, {
                    minChars: 3,
                    maxItems: 5,
                    list: self.serverList
                });
            });
        },
    }
</script>
