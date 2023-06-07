<template lang="pug">
div(class="w-full max-w-[min(1440px,100vw)] h-full flex items-start m-auto box-border pad:flex-wrap")
  header(
    class="w-[350px] sticky pad:fixed top-0 h-screen p-6 bg-white box-border overflow-auto overscroll-contain drop-shadow-lg shadow-inherit mobile:w-screen pad:z-20 pad:transition pad:duration-500"
    :class="!isSideMenuShow ? 'pad:translate-x-[-150%]' : 'pad:translate-x-0'"
    )
    my-header(@setSideMenuClose="isSideMenuShow = false")
  div(class="flex-1 box-border")
    nav(class="hidden top-0 sticky w-full bg-white drop-shadow-lg pad:flex justify-between items-center z-10")
      button(class="mx-4" @click="isSideMenuShow = true")
        i(class="icofont-settings p-1 text-3xl text-main bg-slate-100 rounded")
      RouterLink(to="/" class="block w-[100px] h-[70px] bg-[url('./images/logo.png')] bg-no-repeat bg-center bg-contain")
      div
    RouterView(
      @setMode="setMode"
      :city="city"
      :mode="mode"
      :keyword="keyword"
      :key="$route.fullPath")
</template>

<script setup>
import { ref, computed } from "vue";
import { RouterLink,  } from "vue-router"; //RouterView
import MyHeader from "./components/MyHeader.vue";
import { useStore } from "vuex";

const store = useStore();
// 存取目前城市
const city = computed(() => {
  return store.state.searchData.city;
});
// const setCity = async (c) => (city.value = c);
// 取得搜尋類型
const mode = computed(() => {
  return store.state.searchData.mode;
});
// 取得搜尋關鍵字
const keyword = computed(() => {
  return store.state.searchData.keyword;
});
// 控制側邊導覽列顯示狀態
const isSideMenuShow = ref(false);
const setMode = (m) => (mode.value = m);
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
