import { jwtStore } from "../lib/stores.js";
jwtStore.useLocalStorage();
const apiUrl = IS_PRODUCTION ? "https://api.fakecompany.com/" : "http://localhost:9009/";

function getAxiosConfig() {
    return {
        baseURL: apiUrl,
        headers: {
            Authorization: jwtStore.get() || ""
        }
    }
}

export {
    getAxiosConfig,
    apiUrl
}