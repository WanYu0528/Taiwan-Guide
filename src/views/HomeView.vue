<template lang="pug">
div(class="p-8 w-full")
  div(class="relative w-full min-h-[300px] bg-[url('@/assets/images/banner_Home.png')] bg-no-repeat bg-right-bottom bg-contain bg-white rounded-2xl shadow-lg")
    h1(class="absolute top-[60%] left-[5%] text-5xl translate-y-[-50%]")
      div(class="font-bold mb-4") {{ ranSlogan[0] }}
      div(class="font-bold") {{ ranSlogan[1] }}
</template>

<script setup>
// import { ref } from "vue";
import { sloganLib } from "../lib.js";
const random = Math.floor(Math.random() * sloganLib.length);
const ranSlogan = sloganLib[random];
</script>
