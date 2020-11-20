<template>
  <div class="Shape">
    <div
      :ref="'icon' + i"
      :class="[
        'iconpiece',
        i == currentPageIdx ? 'iconActive' : 'iconDeactive',
      ]"
      v-for="(e, i) in list"
      :key="i"
      @click="chooseHandler(i)"
    >
      <i :class="e.icon_class"></i>
      <p>{{ e.name }}</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        { name: "矩形", icon: "" },
        { name: "三角", icon: "" },
        { name: "圆", icon: "" },
        { name: "线", icon: "" },
        { name: "文字", icon: "" },
        { name: "贴纸", icon: "" },
      ],
      currentPageIdx: 0,
    };
  },
  mounted() {},
  components: {},
  methods: {
    chooseHandler(i) {
      this.currentPageIdx = i;
      // YR.Mediator.getInstance().fire("Filter_Change", { name: e });
    },
  },
};
</script>
<style lang='scss' scoped>
@import "../style/mixin";
.Shape {
  display: flex;
  flex-direction: row;
}
.iconpiece {
  width: 50px;
  height: 50px;
  border: 1px solid white;
  border-radius: 2px;
  cursor: pointer;
}
.iconpiece p {
  font-size: 16px;
  text-align: center;
}
.iconActive {
  color: yellow;
}
.iconDeactive {
  color: white;
}
</style>