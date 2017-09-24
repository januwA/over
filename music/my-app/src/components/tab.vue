<template>
    <div class="">
        <div class="row text-center bg-dark text-muted py-2">
            <router-link tag="div" class="col" to="/index1">
                推荐
            </router-link>
            <router-link tag="div" class="col" to="/index2">
                歌手
            </router-link>
            <router-link tag="div" class="col" to="/index3">
                排行
            </router-link>
            <router-link tag="div" class="col" to="/index4">
                搜索
            </router-link>
        </div>
        <div class="">
            <router-view></router-view>
        </div>
    </div>
</template>


<script>
    export default {
        data () {
            return {
                
            }
        }
    }
</script>
<style scoped=""></style>