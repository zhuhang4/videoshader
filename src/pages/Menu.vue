<template>
  <div class="Menu">
      <div class="head">
          <div :ref="'icon'+i" :class="['iconpiece',(i==currentIdx)?'iconActive':'iconDeactive']" v-for="(e,i) in list" :key="i" @click="chooseHandler(i)">
              <i :class="e.icon_class"></i>
              <p >{{e.name}}</p>
          </div>
      </div>
      <shader-filter></shader-filter>
  </div>
</template>
<script>
import ShaderFilter from './Filter.vue';
export default {
  data() {
    return {
        list:[
            {id:'0',name:'滤镜',icon_class:'el-icon-magic-stick'},
            {id:'0',name:'文字',icon_class:'el-icon-edit'},
            {id:'0',name:'贴纸',icon_class:'el-icon-picture-outline-round'},
            {id:'0',name:'声音',icon_class:'el-icon-microphone'},
            {id:'0',name:'剪辑',icon_class:'el-icon-scissors'},
        ],
        currentIdx:-1,
    };
  },
  mounted() {
      this.currentIdx=0;
  },
  components: {
      ShaderFilter
  },
  methods: {
      chooseHandler(idx)
      {
          this.currentIdx=idx;
      }
  },
};
</script>
<style lang='scss' scoped>
@import "../style/mixin";
.Menu {
}
.head{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    cursor: pointer;
}
.iconpiece{
    display: inline-block;
    font-size: 12px;
    margin: 10px;
    text-align: center;
}
.iconpiece p{
    // text-align: center;
    font-size: 16px;
    margin: 0;
}
.iconpiece i{
    font-size: 25px;
    margin-bottom: 5px;
}
.iconActive{
    color: yellow;
}
.iconDeactive{
    color: white;
}
</style>