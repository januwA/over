<template>
    <div class="">
      <div 
          class="bg-danger w-100" 
          :style="bgStyle"
          >
           <div class="row text-center">
               <div class="col-3 btn btn-link" @click="closeDetail">返回</div>
               <div class="col-7 px-0 align-self-center text-warning">{{  title }}</div>
           </div>
    </div>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex'
    export default{
        props:{
            data:{
                type: null,
                default: ''
            }
        },
        computed:{
            title(){
              return this.data.data.singer_name;
            },
            baImg(){
              return 'https://y.gtimg.cn/music/photo_new/T001R300x300M000'+this.data.data.list[0].musicData.singer[0].mid+'.jpg' 
            },
            bgStyle(){
                return `height: 14rem;background-image:url(${this.baImg});background-repeat:no-repeat; background-position-x:center; background-position-y :center; background-size:100%;`
            }
        },
        methods:{
            ...mapActions([
                'closeDetail'
            ])
        },
    }
</script>
<style>
</style>