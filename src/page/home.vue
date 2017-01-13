<template>
   <div id="app">
    <div class="app_header">
      <head-view></head-view>
    </div>
    <div class="app_content">
        <left-view></left-view>
    </div>
      <div class="app_right">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>
<script>
    import headView from './common/head';
    import leftView from './common/left';
    export default {
        data() {
            return {
                pathName: ''
            }
        },
        components: {
            headView,
            leftView
        },
        watch: {
            '$route': function() {
                this.pathName = this.$route.name;
            }
        }
    }
</script>
<style>
    #app {
        height: 100vh;
    }
    
    .app_header {
        position: fixed;
        width: 100vw;
        z-index: 100;
    }
    
    .app_header .title {
        margin-left: 16px;
        color: #fff;
    }
    
    .app_content {
        position: fixed;
        box-sizing: border-box;
        width: 15vw;
        top: 0;
        padding-top: 60px;
        background-color: #eff2f7;
        height: 100vh;
    }
    
    .app_right {
        position: absolute;
        box-sizing: border-box;
        right: 0;
        top: 0;
        padding-top: 80px;
        width: 83vw;
        height: 100vh;
    }
</style>