<template>
<div class="">
       <div class="swiper-box bg-danger">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                  <div v-for="(item, index) of imgs" class="swiper-slide" v-if="index < 6">
                      <a :href="item.link">
                          <img  :src="item.src" width="100%" height="100%">
                      </a>
                  </div>
                </div>
                <!-- 如果需要分页器 -->
                <div class="swiper-pagination"></div>
            </div>
        </div>
        <div class="row bg-dark">
          <div class="col text-center py-2">
              <small class="text-warning">热门歌单推荐</small>
          </div>
      </div>
</div>
</template>


<script>
    import {mapGetters, mapActions} from 'vuex'
    import Swiper from '@static/js/swiper.min.js'
    export default {
        data () {
            return {
                
            }
        },
        computed: mapGetters([
            'imgs'
        ]),
        methods: mapActions([
            'getImgs'
        ]),
        beforeMount: function () {
        
            this.getImgs();
        },
        mounted: function () {
              var mySwiper = new Swiper ('.swiper-container', {
                observer:true,
                observeParents:true,
                loop: true,
                pagination: '.swiper-pagination',
                autoplay : 2000,
                autoplayDisableOnInteraction : false,
              })   
        }
        
        
        
        

    /*end*/}
</script>
<style scoped="">
    .swiper-box {
        width: 100%;
        height: 12rem;
    }
    .swiper-container {
        width:100%;
        height: 100%;
    }
</style>