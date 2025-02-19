import { Cookies, QSpinnerGears } from "quasar";
import axios from "axios";
import { useNotifyStore } from "src/stores/notify-store";

const notifyStore = useNotifyStore()
export async function putMethod(url, id, variableRef, $q, successMessage, errorMessage) {
  notifyStore.loading($q, 'Подождите, идет обновление', QSpinnerGears)
  try {
    const response = await axios.put(
      `http://localhost:8000/api/v1/${url}/${id}`,
      variableRef.value,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      }
    );


    console.log("Ответ сервера:", response.data);
  } catch (error) {
    console.error("Ошибка при обновлении события:", error);
    console.error("Детали ошибки:", error.response?.data);

    $q.notify({
      type: "negative",
      message: `Ошибка: ${error.response?.data?.error || "Неизвестная ошибка"}`,
    });
  }
  finally{
    $q.loading.hide()
  }
}
