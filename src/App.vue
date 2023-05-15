<template lang="pug">
div(class="w-full max-w-[min(1440px,100vw)] h-full flex items-start m-auto box-border")
  header(v-show="isSideMenuShow" class="w-[350px] sticky top-0 h-screen p-6 bg-white box-border overflow-auto overscroll-contain drop-shadow-lg shadow-inherit")
    my-header(
      @setSideMenuClose="setSideMenuClose"
      :city="city"
      @setCity="setCity"
    )
  nav(v-show="!isSideMenuShow" class="top-0 sticky w-screen bg-white drop-shadow-lg flex justify-between")
    button(class="mx-4" @click="isSideMenuShow = true")
      i(class="icofont-settings p-1 text-3xl text-main bg-slate-100 rounded")
    RouterLink(to="/" class="block w-[100px] h-[70px] bg-[url('@/assets/images/logo.png')] bg-no-repeat bg-center bg-contain")
    div
      //- nav
      //-   RouterLink(to="/") Home
      //-   RouterLink(to="/about") About
    //- RouterView
</template>

<script setup>
import { ref } from "vue";
import { RouterLink,  } from "vue-router"; //RouterView
import MyHeader from "./components/MyHeader.vue";
import tourism from "@/api/tourism";
// 控制側邊導覽列顯示狀態
const isSideMenuShow = ref(true);
// 存取目前城市
const city = ref("");
const cityScenicSpot = ref({});
const setCity = async (c) => {
  city.value = c;
  let res = {};
  if (city.value === "Taiwan") res = await tourism.ScenicSpot.gatAllCityScenicSpot();
  else res = await tourism.ScenicSpot.gatCityScenicSpot(city.value);
  cityScenicSpot.value = res.data;
  console.log(cityScenicSpot);
};
const setSideMenuClose = () => {
  isSideMenuShow.value = false;
};
</script>


<style scoped>
/* .logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
