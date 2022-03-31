<template>
  <!-- <IconAlipayFill color="red" /> -->
  <div style="background: #f1f2f3">
    <Component
      v-for="icon in icons"
      :is="icon.name"
      :key="icon.name"
      style="font-size: 50px"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import * as Icons from "./index.js";

const icons = ref(Icons);
// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
