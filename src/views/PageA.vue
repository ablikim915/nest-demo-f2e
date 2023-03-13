<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to PageA" />
    <el-button>click</el-button>
    <!-- <div>HelloWorld msg="Welcome to Your Vue.js App" /import HelloWorld from '@/components/HelloWorld.vue'HelloWorld</div> -->
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "PageA",
  components: {
    HelloWorld,
    // HelloWorld: () => import(/* webpackChunkName: "HelloWorldComp" */"@/components/HelloWorld.vue"),
  },
};
</script>
