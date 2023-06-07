<template lang="pug">
div(class="relative z-10 flex justify-between items-center after:absolute after:-top-6 after:-inset-x-6 after:-bottom-16 after:-z-10")
  router-link(to="/" class="block w-[150px] h-[70px] bg-[url('/images/logo.png')] bg-no-repeat bg-center bg-contain")
  button(class="text-3xl rounded-lg")
    i(class="icofont-rounded-left text-main bg-slate-100 rounded hidden pad:block" @click="setSideMenuClose")
div(
  class="relative mt-6 z-10 cursor-pointer flex justify-center items-center my-4 py-2 px-3 bg-zinc-50 border border-zinc-300 rounded-lg"
  @click="openCity = !openCity")
  span(class="w-full text-xl leading-5 text-gray-900") {{ cityName(city) }} | {{ modeName }}
  button(class="text-2xl text-main bg-transparent transition duration-500 origin-center"
  :class="!openCity ? 'rotate-180' : 'rotate-0'")
    i(class="icofont-circled-up")
div(class="absolute inset-x-6 justify-start py-1 px-2 bg-gray-100 z-10 transition duration-500 ease-out flex items-center flex-wrap rounded-2xl overflow-hidden"
  :class="openCity ? 'top-[175px] shadow-xl translate-y-0' : '-top-[700px]'")
  p(class="text-xl my-1 pl-1 font-bold relative w-full after:absolute after:bottom-[5px] after:left-1 after:w-[4em] after:h-1 after:bg-main after:-z-10") 選擇區域
  span(
    class="block my-[0.2rem] mx-[0.5rem] py-1 px-5 border border-main rounded hover:bg-main hover:text-gray-100 cursor-pointer"
    :class="city === 'Taiwan' ? 'bg-main text-gray-100' : ''"
    @click="setCity('Taiwan')") 臺灣
  div(class="w-full overflow-hidden flex justify-around")
    button(
      v-for="region in regionLib" :key="region"
      @click="selectArea = region.region"
      class="my-2 hover:text-main"
      :class="selectArea === region.region ? 'border-b-2 border-main' : ''"
      ) {{ region.name }}
  div(class="w-full flex flex-wrap")
    span(
      v-for="item in areaName" :key="item"
      class="block my-[0.2rem] mx-2.5 py-1 px-5 border border-main rounded hover:bg-main hover:text-gray-100 cursor-pointer"
      :class="city === item ? 'bg-main text-gray-100' : ''"
      @click="setCity(item)") {{ cityName(item) }}
  p(class="text-xl my-1 pl-1 font-bold relative w-full after:absolute after:bottom-[5px] after:left-1 after:w-[4em] after:h-1 after:bg-main after:-z-10") 選擇類型
  div(class="w-full flex flex-wrap justify-around")
    span(
      v-for="mode in modeLib" :key="mode"
      class="block my-[0.2rem] mx-1 py-1 px-3.5 border border-main rounded hover:bg-main hover:text-gray-100 cursor-pointer"
      :class="mode.title === modeName ? 'bg-main text-gray-100' : ''"
      @click="searchMode = mode.type") {{ mode.title }}
div(class="my-4 px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-lg flex justify-between")
  input(
    v-model="keyword"
    type="text"
    class="w-full text-lg text-gray-900 bg-transparent outline-none"
    placeholder="Search"
    @keypress.enter="onSearch"
  )
  button(class="text-2xl text-main" @click="onSearch")
    i(class="icofont-search-1")
button(class="px-3 py-2 rounded-lg bg-main w-full" @click="onSearch")
  i(class="icofont-search-1 text-gray-100 mr-2 text-lg")
  span(class="text-lg text-gray-100 bg-transparent") 開始搜尋
</template>
<script setup>
import { ref, watch, computed } from "vue";
import { regionLib, cityLib, modeLib } from "../Lib.js";
import tourism from "@/api/tourism";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const emit = defineEmits(["setSideMenuClose"]);
const setSideMenuClose = () => emit("setSideMenuClose");
// 選擇的城市
const city = ref("Taiwan");
const setCity = (item) => {
  city.value = item;
};
// 選擇類型
const searchMode = ref("ScenicSpot");
const modeName = computed(() => modeLib[searchMode.value].title);
const cityScenicSpot = ref({});
const keyword = ref("");
const router = useRouter();
const onSearch = async () => {
  try {
    let res = await tourism.cityTravelInfo.gatCityTravelInfo(searchMode.value, city.value, keyword.value);
    cityScenicSpot.value = res.data;
    store.commit("searchData/getChosenMode", searchMode.value);
    store.commit("searchData/getChosenCity", city.value);
    store.commit("searchData/getChosenKeyword", keyword.value);
    router.replace({
      name: "Search",
      params: { mode: searchMode.value, city: city.value, keyword: keyword.value },
    });
    setSideMenuClose();
  }
  catch (error) {
    console.log(error);
  }
};
// 展開搜尋下拉選單
const openCity = ref(false);
// 透過區域篩選符合的縣市
const areaName = ref([]);
const area = (region) => {
  areaName.value = Object.keys(cityLib).filter((item) => cityLib[item].region === region);
};
const cityName = (city) => cityLib[city].name;
// 選擇區域，預先顯示北部
const selectArea = ref("North");
area(selectArea.value);
watch(selectArea, () => {
  area(selectArea.value);
});
</script>