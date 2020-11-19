<template>
  <div ref="setting" class="setting">
    <my-menu></my-menu>
    <video
      id="video"
      ref="vd"
      class="vd"
      :style="{ width: vw, height: vh }"
      controls="controls"
      
    >
      <source :src="url" />
    </video>
  </div>
</template>
<script>
import MyMenu from './Menu.vue';
export default {
  data() {
    return {
      url: "static/medias/0.mp4",
      vw: 320,
      vh: 240,
    };
  },
  mounted() {
    this.initVideo();
  },
  components: {MyMenu},
  methods: {
    initVideo() {
      console.log(this.$refs["setting"].offsetWidth);
      let { offsetWidth, offsetHeight } = this.$refs["setting"];
      this.vw = offsetWidth + "px";
      this.vh = Math.floor((offsetWidth * 9) / 16) + "px";
    },
  },
};
</script>
<style lang='scss' scoped>
@import "../style/mixin";
.setting {
  background-color: black;
}
.vd {
  //   margin: 5px;
  background-color: black;
}
</style>