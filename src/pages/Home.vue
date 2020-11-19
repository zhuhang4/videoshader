<template>
  <div class="home">
    <my-canvas class="canvaspage"></my-canvas>
    <setting class="settingpage"></setting>
  </div>
</template>
<script>
import MyCanvas from "../cvs/MyCanvas.vue";
import Setting from "./Setting.vue";
export default {
  data() {
    return {};
  },
  mounted() {},
  components: {
      MyCanvas,
      Setting
  },
  methods: {}
};
</script>
<style lang='scss' scoped>
@import "../style/mixin";
.home{
  display:flex;
  flex-direction: columns;
  width: 100%;
  height: 100%;
}
.canvaspage{
  flex: 1;
  height: 100%;
}
.settingpage{
  flex: 0 1 400px;
}
</style>