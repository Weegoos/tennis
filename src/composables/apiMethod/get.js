import axios from "axios";
import { Cookies, QSpinnerGears, useQuasar } from "quasar";
import { useNotifyStore } from "src/stores/notify-store";

const notifyStore = useNotifyStore();

export async function getMethod(serverURL ,url, variableRef, $q) {
  notifyStore.loading($q, "Подождите, данные загружаются...", QSpinnerGears);
  try {
    const response = await axios.get(`${serverURL}${url}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
      withCredentials: true,
    });

    console.log(response.data);
    variableRef.value = response.data;
  } catch (error) {
    console.error(error.message);
    notifyStore.notifyError($q, error.message);
  } finally {
    $q.loading.hide();
  }
}
