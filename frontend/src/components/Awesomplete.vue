<template>
    <input ref="awesomplete"
           v-model="model"
           class="form-control"
           :placeholder="placeholder"
           :class="classes"
           type="text"
    />
</template>

<script>
    import Vue from 'vue';
    import Awesomplete from 'awesomplete';

    export default {
        name: 'awesomplete',
        data () {
            return {
                model: '',
                awesomplete: {}
            }
        },
        props: {
            placeholder: { default: '', type: String, required: false },
            list: { default: '', type: Array, required: true },
            classes: { default: String, type: String, required: false }
        },
        mounted () {
            let self = this;
            this.$nextTick(() => {
                self.awesomplete = new Awesomplete(self.$refs.awesomplete, {
                    minChars: 3,
                    maxItems: 5,
                    list: self.list
                });

                self.$refs.awesomplete.focus();
            });
        },
//        updated () {
//            let self = this;
//            this.$nextTick(() => {
//                self.awesomplete = new Awesomplete(self.$refs.awesomplete, {
//                    minChars: 3,
//                    maxItems: 5,
//                    list: self.list
//                });
//
//
//                console.log(self.awesomplete);
//
//                self.$refs.awesomplete.focus();
//            });
//        }
    }
</script>
