import instance from "./axios";
// 每頁顯示筆數
const perPage = 18;
const ScenicSpot = {
  gatCityTravelInfo(mode, city, keyword, page = 1) {
    city = city === "Taiwan" ? "" : "/" + city;
    let url = "";
    url += `/v2/Tourism/${mode}/${city}?`;
    // 載入更多筆資料
    url += `$top=${perPage}&$skip=${(page - 1) * perPage}&$format=JSON`;
    // 根據類型抓取想要的資料
    url += `&$select=${mode}ID,${mode}Name,Address,Picture`;
    if (mode === "ScenicSpot") url += ",Class1,Class2,Class3,OpenTime,TicketInfo";
    if (mode === "Restaurant") url += ",Class,OpenTime";
    if (mode === "Hotel") url += ",Class";
    if (mode === "Activity") url += ",Class1,Class2";
    // 關鍵字查詢
    let filter = "";
    if (keyword) {
      keyword.split(",").forEach((keyword) => {
        if (mode === "Restaurant" || mode === "Hotel") filter = `contains(${mode}Name,'${keyword}') or contains(Class,'${keyword}')`;
        if (mode === "Activity") filter = `contains(${mode}Name,'${keyword}') or contains(Class1,'${keyword}') or contains(Class2,'${keyword}')`;
        if (mode === "ScenicSpot") filter = `contains(${mode}Name,'${keyword}') or contains(Class1,'${keyword}') or contains(Class2,'${keyword}') or contains(Class3,'${keyword}')`;
      });
    }
    return instance.get(`${url}&$filter=(${filter})`);
  }
};

export default {
  ScenicSpot,
};