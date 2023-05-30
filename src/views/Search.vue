<template lang="pug">
div(class="p-8")
  div(class="relative w-full h-[min(300px,40vw)] bg-white rounded-2xl shadow-xl")
    img(
      class="h-full w-full object-left object-cover rounded-2xl"
      src="../assets/images/banner_ScenicSpot.png"
      alt="Taiwan-Guide"
      title="Taiwan-Guide"
    )
    h1(class="absolute top-[70%] left-6 text-gray-100 text-5xl font-bold") {{ props.keyword !== "" ? props.keyword : cityLib[props.city].name }}
</template>

<script setup>
import { cityLib } from "../Lib.js";
const props = defineProps(["city", "mode", "keyword"]);
</script>

<style>

</style>