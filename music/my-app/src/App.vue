<template>
  <div id="app">
    <Myhead></Myhead>
    <Mytab></Mytab>
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
