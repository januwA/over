<template>
<div class="">
       <div class="swiper-box bg-danger">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                  <div v-for="(item, index) of swiperImgs" class="swiper-slide" v-if="index < 6">
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
       <!--热门歌单列表-->
        <a class="row p-2" v-for="(item, index) of hotSongs" :href="item.link">
           <!-- 图片-->
            <div class="col-4 align-self-center">
                <img :src="item.src" class="img-fluid" />
            </div>
            <!-- title-->
            <div class="col pl-0">
                <span class='text-white h6' v-html="item.title"></span>
                <p class='text-muted'>播放量：{{(item.listen_num / 10000).toFixed(1)}}万</p>
            </div>
        </a>
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