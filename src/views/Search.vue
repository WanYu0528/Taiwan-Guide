<template lang="pug">
div(class="p-8")
  div(class="relative w-full h-[min(300px,40vw)] bg-white rounded-2xl shadow-xl")
    img(
      class="h-full w-full object-left object-cover rounded-2xl"
      src="../assets/images/banner_ScenicSpot.png"
      alt="Taiwan-Guide"
      title="Taiwan-Guide"
    )
    h1(class="absolute top-[70%] left-6 text-gray-100 text-4xl font-bold") {{ getTitle() }}
  div(class="flex justify-around items-stretch flex-wrap mt-8")
    router-link(
      v-for="item in result" :key="item.ID"
      :to="`/D/${item[mode + 'ID']}/`"
      class="flex flex-col w-[32%] pad:w-[47%] mobile:w-full rounded-lg overflow-hidden items-stretch mx-1 mb-4 bg-white transition hover:shadow-lg duration-500"
    )
      div(class="w-full h-[250px] bg-[url('../images/logo.png')] bg-no-repeat bg-center transition transform duration-500 hover:scale-125")
        img(
          class="w-full h-full object-center object-cover"
          :src="item.Picture.PictureUrl1"
          :alt="item.Picture.PictureDescription1 || item[mode + 'Name']"
        )
      div(class="flex-1 p-4 bg-white box-border")
        h2(class="mb-4 text-xl font-bold") {{ item[mode + 'Name'] }}
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
</template>

<script setup>
import { ref } from "vue";
import { cityLib, modeLib } from "../Lib.js";
import { useRoute, useRouter } from "vue-router";
import tourism from "@/api/tourism";

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
    let load = await tourism.ScenicSpot.gatCityTravelInfo(parm.mode, parm.city, parm.keyword, pageIdx);
    if (load.data.length === 0) throw new Error();
    if (load.data.length === 18) loadBtn.value = false;
    result.value = load.data;
    console.log(result.value);
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
  else if (parm.city) return parm.city.replace(/[A-Z]/g, " $&");
  else return parm.mode;
};
loadData();
</script>

<style>

</style>