<template>
  <div class="hello">
    <button @click="test">click</button>
    <p v-for="(item, index, key) of data">{{ item}}--{{index}}---{{key}}</p>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      data: [],
      data2:[
        {name:"a", age:'22'},
        {name:"b", age:'1'},
        {name:"c", age:'2'}
      ]
    }
  },
  methods:{
    test(){
 /*     $.ajax({
        url: "http://localhost:1995/",
        dataType: 'json',
        data: {
          name: 'ajanuw'
        },
        success: (res)=>{
          console.log( res)
        },
        error: (err)=>{
          console.log( err.status)
        }
      })*/
      $.getJSON('http://localhost:1995/',(data)=>{
        this.data = data.msg;
        console.log( this.data)
      })
    }
  },
 beforeMount: function(){
    let that = this;
    $.getJSON('http://localhost:1995/',(data)=>{
        that.data =  data.msg
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
