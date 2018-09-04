<template>
    <div>
      <div class="home-header">
        <headerpage></headerpage>
      </div>
      <div class="home-navmenu">
        <navmenu></navmenu>
      </div>
      <div class="content">
        <router-view/>
      </div>
    </div>
</template>

<script>
    export default {
        name: '',
        data () {
            return {}
        },
        components: {},
        methods: {}
    }
</script>

<style>

  .home-header,.home-navmenu{
    top: 0;
    position:fixed;

  }
  .home-header{
    height: 39px;
    z-index: 2000;
    width: 100%;
  }
  .home-navmenu{
    height: 94%;
    width: 15%;

  }
  .content{
    overflow: auto;
    min-height:95%;
    background: #fff;
    width: 83%;
    margin: 50px 1% 1% 16%;
  }
</style>
