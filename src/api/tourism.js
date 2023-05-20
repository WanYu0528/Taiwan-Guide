import instance from "./axios";
const ScenicSpot = {
  gatAllCityScenicSpot() {
    return instance.get("/v2/Tourism/ScenicSpot?$format=JSON");
  },
  gatCityScenicSpot(city, keyword) {
    // 關鍵字查詢
    if (keyword) {
      let filter = "";
      keyword.split(",").forEach((keyword) => {
        filter = `contains(ScenicSpotName,'${keyword}') or contains(Class1,'${keyword}') or contains(Class2,'${keyword}') or contains(Class3,'${keyword}')`;
      });
      return instance.get(`/v2/Tourism/ScenicSpot/${city}?&$filter=(${filter})`);
    }
    return instance.get(`/v2/Tourism/ScenicSpot/${city}`);
  }
};

export default {
  ScenicSpot,
};