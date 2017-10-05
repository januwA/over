<template>
    <div class="">
        <div class="row text-center bg-dark text-muted py-1" >
                <router-link v-for="(item, index) of info" tag="div" :class="item.klass" :to="item.to" key="no" @click.native="changeColor(index)">
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
                    {text: '推荐', klass: 'col text-warning', to: '/index1'},
                    {text: '歌手', klass: 'col', to: '/index2'},
                    {text: '排行', klass: 'col', to: '/index3'},
                    {text: '搜索', klass: 'col', to: '/index4'}
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