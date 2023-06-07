<template lang="pug">
div(v-if="loading === 1" class="p-8 flex flex-col justify-center")
  div(class="relative w-full h-[min(300px,40vw)] bg-white rounded-2xl shadow-xl")
    img(
      class="h-full w-full object-left object-cover rounded-2xl"
      :src="getImg[parm.mode]"
      alt="Taiwan-Guide"
      title="Taiwan-Guide"
    )
    h1(class="absolute top-[70%] left-6 text-gray-100 text-4xl font-bold") {{ getTitle() }}
  div(class="flex justify-around items-stretch flex-wrap mt-8")
    router-link(
      v-for="item in result" :key="item.ID"
      :to="`/D/${parm.mode}/${item[parm.mode + 'ID']}/`"
      class="flex flex-col w-[32%] pad:w-[47%] mobile:w-full rounded-lg overflow-hidden items-stretch mx-1 mb-4 bg-white transition hover:shadow-lg duration-500"
    )
      div(class="w-full h-[250px] bg-[url('/images/logo.png')] bg-no-repeat bg-center bg-contain")
        img(
          class="w-full h-full object-center object-cover transition transform duration-500 hover:scale-125"
          :src="item.Picture.PictureUrl1"
          :alt="item.Picture.PictureDescription1 || item[parm.mode + 'Name']"
          onerror="this.style.display='none'"
        )
      div(class="flex-1 p-4 bg-white box-border")
        h2(class="mb-4 text-xl font-bold") {{ item[parm.mode + 'Name'] }}
        p(
          v-if="item.Date"
          class="ml-5 text-base text-justify -indent-5 mobile:text-sm"
        )
          i(class="icofont-calendar mr-2")
          span {{ item.Date }}
        p(
          v-if="!item.Date && item.StartTime"
          class="ml-5 text-base text-justify -indent-5 mobile:text-sm"
        )
          i(class="icofont-calendar mr-2")
          span {{ item.StartTime }} ~ {{ item.EndTime }}
        p(
          v-if="item.OpenTime"
          class="ml-5 text-base text-justify -indent-5 mobile:text-sm"
        )
          i(class="icofont-clock-time mr-2")
          span {{ item.OpenTime.split('；')[0] }}
        p(
          v-if="item.TicketInfo"
          class="ml-5 text-base text-justify -indent-5 mobile:text-sm"
        )
          i(class="icofont-ticket mr-2")
          span {{ item.TicketInfo }}
        p(
          v-if="item.Address"
          class="ml-5 text-base text-justify -indent-5 mobile:text-sm"
        )
          i(class="icofont-location-pin mr-2")
          span {{ item.Location ? item.Location + " " + item.Address : item.Address }}
        p(
          v-if="item.Class || item.Class1 || item.Class2 || item.Class3"
          class="ml-5 text-base text-justify -indent-5 mobile:text-sm"
        )
          i(class="icofont-tags mr-2")
          span(
            v-if="item.Class"
            class="mx-1 py-1 px-2 leading-[3rem] bg-main whitespace-nowrap text-gray-100 rounded-lg"
            ) {{ item.Class }}
          span(
            v-if="item.Class1"
            class="mx-1 py-1 px-2 leading-[3rem] bg-main whitespace-nowrap text-gray-100 rounded-lg"
            ) {{ item.Class1 }}
          span(
            v-if="item.Class2"
            class="mx-1 py-1 px-2 leading-[3rem] bg-main whitespace-nowrap text-gray-100 rounded-lg"
            ) {{ item.Class2 }}
          span(
            v-if="item.Class3"
            class="mx-1 py-1 px-2 leading-[3rem] bg-main whitespace-nowrap text-gray-100 rounded-lg"
            ) {{ item.Class3 }}
  div(class="flex justify-center")
    button(
      v-show="!loadBtn"
      @click="loadData()"
      class="bg-gray-100 text-main rounded-xl mx-auto py-2 px-4 hover:bg-main hover:text-gray-100"
    ) 載入更多
</template>

<script setup>
import { ref } from "vue";
import { cityLib, modeLib } from "../Lib.js";
import { useRoute, useRouter } from "vue-router";
import tourism from "@/api/tourism";
const getImg = {
  Activity: "/images/banner_Activity.png",
  Hotel: "/images/banner_Hotel.png",
  Restaurant: "/images/banner_Restaurant.png",
  ScenicSpot: "/images/banner_ScenicSpot.png",
};
const loading = ref(0);
const route = useRoute();
const router = useRouter();
const parm = route.params;
let pageIdx = 1;
const result = ref([]);
const loadBtn = ref(true);
const emit = defineEmits(["setMode"]);
const verify = () => {
  if (Object.keys(modeLib).indexOf(parm.mode) < 0) return true;
  if (parm.city && !cityLib[parm.city]) return true;
  return false;
};
const loadData = async () => {
  if (verify()) router.replace({ name: "home" });
  loadBtn.value = true;
  emit("setMode", parm.mode);
  try {
    let load = await tourism.cityTravelInfo.gatCityTravelInfo(parm.mode, parm.city, parm.keyword, pageIdx);
    if (load.data.length === 0) throw new Error();
    if (load.data.length === 18) loadBtn.value = false;
    result.value = result.value.concat(load.data);
    pageIdx += 1;
    setTimeout(() => (loading.value = 1), 500);
    if (pageIdx === 2) window.scrollTo({ top: 0, behavior: "smooth" });
  }
  catch (error) {
    loading.value = -1;
  }
};
const getTitle = () => {
  if (parm.keyword) return parm.keyword.split(",").join(" ");
  else if (parm.city) return cityLib[parm.city].name;
  else return parm.mode;
};
loadData();
</script>

<style>

</style>