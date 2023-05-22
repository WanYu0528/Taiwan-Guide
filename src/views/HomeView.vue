<template lang="pug">
div(class="p-8 w-full")
  div(class="relative w-full min-h-[300px] bg-[url('@/assets/images/banner_Home.png')] bg-no-repeat bg-right-bottom bg-contain bg-white rounded-2xl shadow-lg")
    h1(class="absolute top-[60%] left-[5%] text-5xl translate-y-[-50%]")
      div(class="font-bold mb-4") {{ ranSlogan[0][0] }}
      div(class="font-bold") {{ ranSlogan[0][1] }}
  div(class="flex items-center my-6 text-2xl font-bold text-main")
    i(class="icofont-beach mr-1")
    h2 熱門景點
  div(class="flex flex-col items-stretch flex-wrap h-[min(300px,40vw)] overflow-hidden mobile:h-auto mobile:flex-row")
    router-link(
      class="relative w-[calc(20%-0.6rem)] h-[calc(50%-0.6rem)] overflow-hidden rounded-lg m-1 cursor-pointer mobile:w-[calc(50%-0.6rem)] mobile:h-[150px] custom-class"
      v-for="(item, idx) in ranCity" :key="item[0]"
      :to="`/ScenicSpot/${item[0]}/`"
    )
      div(class="w-full h-full transition transform duration-500 rounded-lg hover:scale-125")
        img(
          class="w-full h-full object-center object-cover"
          style=":nth-child(3n+1):"
          :src="`src/assets/images/city_${idx+1}.jpg`" :alt="item[0]"
          )
        div(class="absolute inset-0 flex flex-col justify-center items-center text-gray-100 hover:bg-[#00000066]") 
          span(class="text-2xl font-bold") {{ item[1].name }}
</template>

<script setup>
// import { ref } from "vue";
import { sloganLib, cityLib } from "../Lib.js";
import getRandomCount from "@/utils/getRandomCount.js";
const ranSlogan = getRandomCount(sloganLib, 1);
const ranCity = getRandomCount(Object.entries(cityLib), 7);
</script>
<style>
.custom-class:nth-child(3n+1) {
  height: 100%;
  @media screen and (max-width: 767px) {
    width: 100%;
    height: 130px;
  }
}
</style>
