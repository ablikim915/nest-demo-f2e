<template>
  <div class="about">
    <h1>This is PageB</h1>
    <el-button @click="click">show input</el-button>
    <el-input v-if="show" />
    <HelloWorld v-if="show" msg="Welcome to PageB" />

    <el-button @click="handleDownload">下载图片</el-button>
  </div>
</template>

<script>

import HelloWorld from '@/components/HelloWorld.vue'
// import {  
//   Input 
// } from "element-ui";


const downloadImg = async (url) => {
  const res = await fetch(url).then(res => res.arrayBuffer());
  const blob = new Blob([res])
  console.log('--blob--', blob);
  const Url = URL.createObjectURL(blob);
  console.log('--Url--', Url);
  // const a = document.createElement('a');
  // a.href = Url;
  // a.download = 'legolas.zip';
  // a.click();
}

export default {
  name: "PageB",
  components: {
    HelloWorld,
    // ElInput: Input
    // HelloWorld: () => import(/* webpackChunkName: "HelloWorldComp" */"@/components/HelloWorld.vue"),
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    click() {

      this.show = true;
    },
    handleDownload() {
      downloadImg('http://localhost:8008/upload/stream')
    }
  }
};
</script>
