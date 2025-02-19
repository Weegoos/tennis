import axios from "axios";
import { Cookies } from "quasar";

export async function postMethod (url, variableRef, serverURL, $q) {
  try {
    const response = await axios.post(`${serverURL}${url}`, variableRef.value, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    });
    // console.log("Ответ сервера:", response.data);
  } catch (error) {
    console.error("Ошибка:", error.response?.data);
  }
}
