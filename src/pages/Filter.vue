<template>
  <div class="Filter">
    <el-select
      class="select"
      ref="select"
      v-model="value"
      placeholder="请选择"
      @change="changeHandler"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <div class="slidepiece" v-for="(e, i) in current_uniform" :key="i">
      <p v-if="e.editable">{{ e.name }}</p>
      <el-slider
        v-if="e.editable"
        class="sliderbar"
        input-size="mini"
        v-model="e.value"
        :max="e.max"
        :min="e.min"
        :step="(e.max - e.min) / 20"
        show-input
        @input="slideChangeHandler(e, 'value', $event)"
      >
      </el-slider>
    </div>
  </div>
</template>
<script>
import * as YR from "@/YR.js";
export default {
  data() {
    return {
      current_uniform: {
        time: {
          name: "速度",
          value: 1.0,
        },
      },
      options: [
        {
          value: "Standard",
          label: "无",
        },
        {
          value: "Shake",
          label: "震惊了",
        },
        {
          value: "GlitchRGB",
          label: "故障纹效果1",
        },
        {
          value: "GlitchRGBPOW",
          label: "故障纹效果2",
        },
      ],
      value: "Shake",
    };
  },
  mounted() {
      console.log('mounted')
    YR.Mediator.getInstance().add("Filter_UpdateParams", (e) => {
      this.current_uniform = e.data;
    });
    this.changeHandler(this.options[1].value);
  },
  updated(){
      console.log('update::',this.data);
  },
  destroyed(){
      console.log('destroyed');
  },
  components: {},
  methods: {
    changeHandler(e) {
      console.log("更换滤镜：：：：：", e);
      YR.Mediator.getInstance().fire("Filter_Change", { name: e });
    },
    slideChangeHandler(obj, key, e) {
    },
  },
};
</script>
<style lang='scss' scoped>
@import "../style/mixin";
.Filter {
  display: flex;
  flex-direction: column;
}
.select {
  margin-left: 5px;
  margin-bottom: 5px;
  width: 95%;
  border-top: 1px solid white;
  padding-top: 5px;
  margin: 10px auto;
}
.slidepiece {
  font-size: 16px;
}
.sliderbar {
  margin: 0 10px;
}
.slidepiece p {
  color: black;
  font-size: 14px;
  padding: 2px 2px 2px 5px;
  margin: 0 auto;
  width: 92%;
  border-radius: 5px;
  background-color: rgb(255, 153, 0);
}
</style>