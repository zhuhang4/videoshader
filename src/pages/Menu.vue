<template>
  <div class="Menu">
    <div class="head">
      <div
        :ref="'icon' + i"
        :class="['iconpiece', i == currentPageIdx ? 'iconActive' : 'iconDeactive']"
        v-for="(e, i) in list"
        :key="i"
        @click="chooseHandler(i)"
      >
        <i :class="e.icon_class"></i>
        <p>{{ e.name }}</p>
      </div>
    </div>
    <shader-filter v-show="currentPageIdx == 0"></shader-filter>
    <shape v-show="currentPageIdx == 1"></shape>
  </div>
</template>
<script>
import ShaderFilter from "./Filter.vue";
import shape from "./Shape.vue";
import { mapState,mapGetters } from "vuex";
export default {
  data() {
    return {
      // list:[
      //     {idx:'0',name:'滤镜',icon_class:'el-icon-magic-stick'},
      //     {idx:'1',name:'图形',icon_class:'el-icon-edit'},
      //     {idx:'2',name:'贴纸',icon_class:'el-icon-picture-outline-round'},
      //     {idx:'3',name:'声音',icon_class:'el-icon-microphone'},
      //     {idx:'4',name:'剪辑',icon_class:'el-icon-scissors'},
      // ],
    };
  },
  computed:{
    ...mapState({
                
        list(state) { 
            return state.menu.list
        },
    }),
    ...mapGetters('menu', [
      'currentPageIdx',
    ])
  },

  mounted() {
    this.$store.commit("menu/changepage",1);
  },
  components: {
    ShaderFilter,
    shape,
  },
  methods: {
    chooseHandler(idx) {
      let pageidx = this.list.find((e) => {
        return e.idx == idx;
      }).idx;
      this.$store.commit("menu/changepage",idx);
    },
  },
};
</script>
<style lang='scss' scoped>
@import "../style/mixin";
.Menu {
}
.head {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
}
.iconpiece {
  display: inline-block;
  font-size: 12px;
  margin: 10px;
  text-align: center;
}
.iconpiece p {
  // text-align: center;
  font-size: 16px;
  margin: 0;
}
.iconpiece i {
  font-size: 25px;
  margin-bottom: 5px;
}
.iconActive {
  color: yellow;
}
.iconDeactive {
  color: white;
}
</style>