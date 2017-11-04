<template>
    <div class="animated fixed-detai bg-white">
        <div class="container">
            <div class="row py-2 text-center">
                <div class="col-2" @click="closeDetail"><</div>
                <div class="col">周杰伦</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    export default {
        data () {
            return {
                
            }
        },
        methods:{
            ...mapActions([
                'closeDetail'
            ])
        }
    }
</script>

<style scoped>
    .fixed-detai{
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 1050;
    }
</style>