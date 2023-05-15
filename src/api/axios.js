import axios from "axios";

async function getToken () {
  const resp = await axios.post("https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token", {
    grant_type: "client_credentials",
    client_id: "082214115-05492447-1b99-4af7",
    client_secret: "6d3a2bf8-98d2-4075-b616-d4efc6d93aec"        
  }, { headers: { "content-type": "application/x-www-form-urlencoded" } });
  return resp.data;
}
let instance = axios.create({
  baseURL: "https://tdx.transportdata.tw/api/basic",
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  }
});

async function init () {
  const accesstoken = await getToken();
  instance.defaults.headers.common["authorization"] = "Bearer " + accesstoken.access_token;
}

init();

export default instance;
  