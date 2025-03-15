import axios from "axios";
import { Cookies, QSpinnerGears } from "quasar";
import { useNotifyStore } from "src/stores/notify-store";

export async function getMethod(serverURL, url, variableRef, $q, errorMessage) {
  const notifyStore = useNotifyStore();
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

    // console.log(response.data);
    variableRef.value = response.data;
    return response.data;
  } catch (error) {
    console.error(error.message);
    notifyStore.notifyError($q, `${errorMessage}: ${error.message}`);
  } finally {
    $q.loading.hide();
  }
}
