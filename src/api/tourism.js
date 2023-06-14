import instance from "./axios";
// 每頁顯示筆數
const perPage = 18;
const cityTravelInfo = {
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
      return instance.get(`${url}&$filter=Picture/PictureUrl1 ne null and ${filter}`);
    }
    return instance.get(`${url}&$filter=Picture/PictureUrl1 ne null`);
  }
};

// 偵測顯示模式;
const getMode = (ID, en) => {
  const tag = ID.split("_")[0];
  if (tag === "C1") return en ? "ScenicSpot" : "景點";
  if (tag === "C2") return en ? "Activity" : "活動";
  if (tag === "C3") return en ? "Restaurant" : "餐飲";
  if (tag === "C4") return en ? "Hotel" : "旅宿";
};

// 取得單筆資料
const travelInfoDetail = {
  async getDetail(ID) {
    let url = "https://tdx.transportdata.tw/api/basic/v2/Tourism/";
    url += `${getMode(ID, true)}?$format=JSON&`;
    url += `$filter=${getMode(ID, true)}ID eq '${ID}'`;
    const res = await instance.get(`${url}`);
    if (res.data.length === 0) throw new Error();
    res.data[0].modeName = getMode(res.data[0][getMode(ID, true) + "ID"]);
    if (res.data[0].Description)
      res.data[0].Description = res.data[0].Description.split("。").join("。\n\n");
    if (res.data[0].DescriptionDetail)
      res.data[0].DescriptionDetail = res.data[0].DescriptionDetail.split("。").join("。\n\n");
    if (res.data[0].TravelInfo)
      res.data[0].TravelInfo = res.data[0].TravelInfo.split("。").join("。\n\n");
    if (res.data[0].ParkingInfo) res.data[0].ParkingInfo = res.data[0].ParkingInfo + "\n\n";
    if (res.data[0].StartTime) res.data[0].StartTime = res.data[0].StartTime.split("T")[0];
    if (res.data[0].EndTime) res.data[0].EndTime = res.data[0].EndTime.split("T")[0];
    if (res.data[0].StartTime === res.data[0].EndTime) res.data[0].Date = res.data[0].EndTime;
    res.data[0].getMode = getMode(ID, true);
    return res.data[0];
  }
};
export default {
  cityTravelInfo,
  travelInfoDetail
};