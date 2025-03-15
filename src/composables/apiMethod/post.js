import axios from "axios";
import { Cookies, QSpinnerGears } from "quasar";
import { useNotifyStore } from "src/stores/notify-store";

const notifyStore = useNotifyStore();

export async function postMethod(serverURL, url, variableRef, $q, successMsg) {
  notifyStore.loading($q, "Подождите, идет создание...", QSpinnerGears);
  try {
    const response = await axios.post(`${serverURL}${url}`, variableRef, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    });
    console.log("Ответ сервера:", response.data);
    notifyStore.nofifySuccess($q, successMsg);
  } catch (error) {
    console.error("Ошибка:", error.response?.data);
    notifyStore.notifyError($q, `${error.response?.data.error}`);
  } finally {
    $q.loading.hide();
  }
}
