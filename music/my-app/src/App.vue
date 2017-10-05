<template>
  <div id="app">
  
    <Myhead></Myhead>
    <Mytab></Mytab>
    
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
    import Myhead from '@comp/myHead.vue'
    import Mytab from '@comp/tab.vue'
export default {
  name: 'app',
  components: {
      Myhead,
      Mytab
  }
}
</script>

<style scoped>

</style>
