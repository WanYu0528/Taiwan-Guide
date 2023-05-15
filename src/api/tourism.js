import instance from "./axios";
const ScenicSpot = {
  gatAllCityScenicSpot() {
    return instance.get("/v2/Tourism/ScenicSpot?$format=JSON");
  },
  gatCityScenicSpot(city) {
    return instance.get(`/v2/Tourism/ScenicSpot/${city}`);
  }
};

export default {
  ScenicSpot,
};