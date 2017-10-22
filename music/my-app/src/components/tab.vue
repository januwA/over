<template>
    <div class="">
        <div class="row text-center bg-dark text-muted py-1" >
                <router-link 
                      v-for="(item, index) of info" 
                      tag="div" 
                      class="col" 
                      :to="item.to" 
                      key="no" 
                      active-class="text-warning"
                    >
                   {{item.text}}
                </router-link>

        </div>
        
    </div>
</template>


<script>
    export default {
        data () {
            return {
                info: [
                    {text: '推荐', to: '/index1'},
                    {text: '歌手', to: '/index2'},
                    {text: '排行', to: '/index3'},
                    {text: '搜索', to: '/index4'}
                ]
            }
        },
        methods: {
            changeColor (index) {
                this.info.forEach( (item, i) => {
                    item.klass = "col";
                })
              this.info[index].klass = "col text-warning"
            }
        }
    }
</script>
<style scoped="">
    .hoverStyle:hover {
        color: #ffc107;
    }
</style>