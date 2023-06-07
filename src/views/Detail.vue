<template lang="pug">
div(v-if="loading === 1" class="p-8")
  div(class="flex items-center flex-wrap")
    div(
      @click="hasHistory() ? $router.go(-1) : $router.push('/')"
      class="flex justify-start items-center flex-wrap "
      )
      button(class="py-1 px-2 mr-2 text-2xl text-main bg-transparent rounded-lg outline-none cursor-pointer hover:text-gray-100 hover:bg-main")
        i(class="icofont-rounded-left")
      h1(class="text-3xl font-bold pb-1") {{ result[parm.mode + "Name"] }}
  div(class="w-full h-[250px] bg-[url('/images/logo.png')] bg-no-repeat bg-center bg-contain")
    img(
      :src="result.Picture.PictureUrl1"
      :alt="result.Picture.PictureDescription1"
      class="w-full h-[min(300px,40vw)] my-4 rounded-2xl"
      onerror="this.style.display='none'"
      )
  h2(class="my-6 text-xl text-main")
    i(class="icofont-info-circle mr-1")
    span(class="font-bold") {{ result.modeName }}資訊
  div(class="p-4 bg-main bg-opacity-25 rounded-lg whitespace-break-spaces")
    p(
      v-if="result.Date"
      class="ml-2 pb-2"
      )
      i(class="icofont-calendar mr-2")
      span 活動日期：{{ result.Date }}
    p(
      v-if="!result.Date && result.StartTime"
      class="ml-2 pb-2"
      )
      i(class="icofont-calendar mr-2")
      span 活動期間：{{ result.StartTime + " ~ " + result.EndTime }}
    p(
      v-if="result.OpenTime"
      class="ml-2 pb-2"
      )
      i(class="icofont-clock-time mr-2")
      span 開放時段：{{ result.OpenTime }}
    p(
      v-if="result.TicketInfo"
      class="ml-2 pb-2"
      )
      i(class="icofont-ticket mr-2")
      span 門票費用：{{ result.TicketInfo }}
    p(
      v-if="result.Address"
      class="ml-2 pb-2"
      )
      i(class="icofont-location-pin mr-2")
      span {{ result.modeName }}地點：
      span(v-if="result.Location") {{ result.Location }}
      span {{ result.Address }}
    p(
      v-if="result.Phone"
      class="ml-2 pb-2"
      )
      i(class="icofont-ui-touch-phone mr-2")
      span 聯絡電話：
      a(:href="`tel:${result.Phone}`" class="underline") {{ result.Phone }}
    p(
      v-if="result.WebsiteUrl"
      class="ml-2 pb-2"
      )
      i(class="icofont-earth mr-2")
      span 官方網站：
      a(:href="result.WebsiteUrl" target="_blank" class="underline") 點我前往
    p(
      v-if="result.Organizer"
      class="ml-2 pb-2"
      )
      i(class="icofont-people mr-2")
      span 主辦單位：{{ result.Organizer }}
    p(
      v-if="result.Cycle"
      class="ml-2 pb-2"
      )
      i(class="icofont-people mr-2")
      span 備註說明：{{ result.Cycle }}
    p(
      v-if="result.Class || result.Class1 || result.Class2 || result.Class3"
      class="ml-2 pb-2"
      )
      i(class="icofont-tags mr-2")
      span {{ result.modeName }}標籤：
      span(
        v-if="result.Class"
        class="mx-1 py-1 px-2 leading-[3rem] bg-main whitespace-nowrap decoration-0 text-gray-900 hover:text-gray-100 rounded-lg"
      ) {{ result.Class }}
      span(
        v-if="result.Class1"
        class="mx-1 py-1 px-2 leading-[3rem] bg-main whitespace-nowrap decoration-0 text-gray-900 hover:text-gray-100 rounded-lg"
      ) {{ result.Class1 }}
      span(
        v-if="result.Class2"
        class="mx-1 py-1 px-2 leading-[3rem] bg-main whitespace-nowrap decoration-0 text-gray-900 hover:text-gray-100 rounded-lg"
      ) {{ result.Class2 }}
      span(
        v-if="result.Class3"
        class="mx-1 py-1 px-2 leading-[3rem] bg-main whitespace-nowrap decoration-0 text-gray-900 hover:text-gray-100 rounded-lg"
      ) {{ result.Class3 }}
  h2(class="my-6 text-xl text-main")
    i(class="icofont-google-talk mr-1")
    span(class="font-bold") {{ result.modeName }}介紹
  pre(class="text-justify whitespace-pre-line") {{ result.DescriptionDetail || result.Description }}
  div(v-if="result.TravelInfo || result.ParkingInfo")
    h2(class="my-6 text-xl text-main")
      i(class="icofont-google-talk mr-1")
      span(class="font-bold") 交通方式
    pre(class="text-justify whitespace-pre-line") {{ result.TravelInfo }}
    pre(class="text-justify whitespace-pre-line") {{ result.ParkingInfo }}
  //- div(class="rounded-lg")
  //-   iframe(
  //-     v-if="mode === 'Activity'"
  //-     class="w-full h-[250px]"
  //-     loading="lazy"
  //-     :src="`https://maps.google.com/maps?q=${result.Position.PositionLat},${result.Position.PositionLon}&hl=zh-TW&z=16&amp;output=embed`"
  //-   )
  //-   iframe(
  //-     v-else
  //-     class="w-full h-[250px]"
  //-     loading="lazy"
  //-     :src="`https://maps.google.com/maps?q=${result[parm.mode + 'Name']}+${result[parm.mode + 'Name'].split('').join('+')}&hl=zh-TW&z=16&amp;output=embed`"
  //-   )
</template>
<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import tourism from "@/api/tourism";

const loading = ref(0);
const hasHistory = () => window.history.length > 2;
const route = useRoute();
const router = useRouter();
const result = ref({});
const parm = route.params;
const loadData = async () => {
  if (!parm.ID) router.replace({ name: "home" });
  try {
    const data = await tourism.travelInfoDetail.getDetail(parm.ID);
    console.log(data);
    if (!data[parm.mode + "ID"]) throw new Error();
    result.value = data;
    document.title = result.value[parm.mode + "Name"];
    console.log(result.value[parm.mode + "Name"]);
    setTimeout(() => (loading.value = 1), 500);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  catch (error) {
    loading.value = -1;
  }
};
loadData();
</script>
<style>

</style>
