<template>
   <div class="">
    <div class="index2">
        <scroll 
           style="height:100%;overflow:hidden"
           :data="singerLists"
           ref="listScroll"
           :listenScroll="true"
           :probeType = "3"
        >
            <div class="">
                <div class="container">
                    <div 
                       class="row" v-for="(group, index) of singerLists" ref="lists">
                        <h5 class="col text-dark bg-secondary py-1 mb-0">{{group.title}}</h5>
                        <div class="w-100"></div>
                        <div class="col">
                            <div class="row py-2" v-for="(item,index) of group.items">
                                <div class="col-3 align-self-center">
                                    <img class="img-fluid rounded-circle" v-lazy="item.src" alt="">
                                </div>
                                <div class="col align-self-center">
                                    <span class="text-muted">{{item.name}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            <div class="fixed-top" style="top: 5rem;" v-show="fixedText" ref="fixed">
                    <h5 class="col text-dark bg-secondary py-1 mb-0">{{fixedText}}</h5>
                </div>
            <!--right sidebar -->
            <div class="text-center" 
               @touchstart="touch_Rbar" 
               @touchmove.stop.prevent="touchmove_Rbar" 
               style="position: absolute; top: 50%; right: 3px; transform: translate(0,-50%);"
            >
                <ul class="list-unstyled py-5 text-danger" ref="ulBox">
                    <li 
                       v-for="(item, index) of rightBar" 
                       class="" 
                       :data-index="index" 
                       style="width: 13px; height: 18px;"
                       :class="{'text-warning': currrentIndex === index}"
                    >
                        {{item}}
                    </li>
                </ul>
            </div>
        </scroll>
        
    </div>
    </div>
</template>


<script>
    import {mapGetters, mapActions} from 'vuex'
    import scroll from '@/base/scroll.vue'
    
    export default {
        data () {
            return {
            }
        },
        computed: mapGetters([
            'singerLists',
            'rightBar',
            'currrentIndex',
            'fixedText',
            'diff'
        ]),
        methods: {
             ...mapActions([
                'callThis',
                'getSingers',
                'touch_Rbar',
                'touchmove_Rbar'
             ])
        },
        watch:{
            diff(newVal) {
                let fixedTop = (newVal > 0 && newVal < 28) 
                    ? newVal - 28 
                    : 0;
                if (this.fixedTop === fixedTop) {
                  return
                }
                this.fixedTop = fixedTop
                this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
              }
        },
        components:{
            scroll
        },
        beforeMount() {
            this.getSingers();
        },
        mounted () {
          this.callThis(this);
        }
    }
</script>
<style scoped="">
    .index2 {
        position: absolute;
        left: 0;
        top: 5rem;
        bottom: 0;
    }
</style>