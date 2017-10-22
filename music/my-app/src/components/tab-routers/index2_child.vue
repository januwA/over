<template>
    <div class="animated fixed-detai bg-white">
            <detailList
                :data="detailData"
            ></detailList>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import detailList from '@/base/detailList.vue'
    export default {
        computed:{
            ...mapGetters([
                'detailData'
            ]),
        },
        components:{
            detailList
        },
        mounted(){
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