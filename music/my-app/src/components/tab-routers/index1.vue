<template>
<div class="index1">
     <scroll 
        style="height:100%;overflow:hidden"
        :data="hotSongs"
    >
         <div class="">
         
          <div class="row">
           <div class="col swiper-box bg-danger">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                      <div v-for="(item, index) of swiperImgs" class="swiper-slide" v-if="index < 6">
                          <a :href="item.link">
                              <img  :src="item.src" width="100%" height="100%">
                          </a>
                      </div>
                    </div>
                    <div class="swiper-pagination"></div>
                </div>
            </div>
            </div>
           
           <div class="row bg-dark text-warning">
                <div class="col text-center pt-2">热门歌单推荐</div>
            </div>
            <div class="" style="position: relative">
                <div class="row load-container" v-if="!hotSongs.length">
                    <div class="col text-center">
                        <img class="img-fluid align-self-center" src="../../assets/load.png" width="40%">
                    <div class="text-white text-center">正在加载.....</div>
                    </div>
                </div>
                
            <a class="row py-2" v-for="(item, index) of hotSongs" :href="item.link">
                <div class="col-4 align-self-center">
                    <img v-lazy="item.src" class="img-fluid" />
                </div>
                <div class="col pl-0">
                    <span class='text-white h6' v-html="item.title"></span>
                <p class='text-muted'>播放量：{{(item.listen_num / 10000).toFixed(1) }}万</p>
                </div>
            </a>
            </div>
        </div>
    </scroll>
</div>
</template>


<script>
    import {mapGetters, mapActions} from 'vuex'
    import Swiper from '@static/js/swiper.min.js'
    import scroll from '@/base/scroll.vue'
    
    export default {
        data () {
            return {
            }
        },
        computed: mapGetters([
            'swiperImgs',
            'hotSongs'
        ]),
        methods: mapActions([
            'getImgs'
        ]),
        beforeMount: function () {
            this.getImgs();
        },
        mounted: function () {
            
            let self = this;
              var mySwiper = new Swiper ('.swiper-container', {
                observer:true,
                observeParents:true,
                loop: true,
                pagination: '.swiper-pagination',
                autoplay : 2000,
                autoplayDisableOnInteraction : false,
              }) 
           
        },
        components: {
            scroll
        }
        
        
        
        

    /*end*/}
</script>
<style scoped="">
    .index1{
        position: absolute;
        width: 100%;
        top: 5rem;
        left: 0;
        bottom: 0;
    }
    .swiper-box {
        width: 100%;
        height: 9rem;
    }
    .swiper-container {
        width:100%;
        height: 100%;
    }
    .load-container {
        position: absolute;
        left: 50%;
        top: 0;
        transform: translate(-40%,0);
    }
    
    .load-container img {
        animation: myfirst 2s linear infinite;
    }
    @keyframes myfirst{
        0%   {
            transform: rotate(-1deg)
        }

        100% {
             transform: rotate(360deg)
        }
    }

    @-webkit-keyframes myfirst /* Safari 与 Chrome */{
         0%   {
            transform: rotate(-1deg)
        }
        100% {
             transform: rotate(360deg)
        }
    }
</style>