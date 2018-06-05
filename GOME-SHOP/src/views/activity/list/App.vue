<template>
  <div id="app">
    <expired-activity class="no-content" :url='url'></expired-activity>
  </div>
</template>

<script>
    import offlineActivity from '@/components/OfflineActivity';
    import expiredActivity from '@/components/ExpiredActivity';
    export default {
        data(){
          return {
            url:'http://www.baidu.com'
          }
        },
        name: 'app',
        components:{
            expiredActivity
        },
        methods:{

        }
    }
</script>
<style type="text/css">
  html,body{
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
</style>
<style lang='scss' rel="stylesheet/scss" type="text/css" scoped>
  #app {
    width:100%;
    height:100%;
    position:relative;
    .no-content{
      position: absolute;
      width: 100%;
      top: 0;
      bottom: 0;
    }
  }

</style>
