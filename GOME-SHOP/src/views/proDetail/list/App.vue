<template>
  <div id="app">
    <product></product>
  </div>
</template>

<script>
    import product from '../components/product'; // 引入header
    export default {
        name: 'app',
        components:{
            product,
        },
        methods:{

        }
    }
</script>

<style lang='scss' rel="stylesheet/scss" type="text/css" scoped>
  #app {
    width:100%;
    height:100%;
    position:relative;
  }
</style>
