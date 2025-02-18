import { Cookies } from "quasar";
import axios from "axios";

export async function putMethod(url, id, variableRef, $q) {
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

    $q.notify({
      type: "positive",
      message: "Событие успешно обновлено!",
    });

    console.log("Ответ сервера:", response.data);
  } catch (error) {
    console.error("Ошибка при обновлении события:", error);
    console.error("Детали ошибки:", error.response?.data);

    $q.notify({
      type: "negative",
      message: `Ошибка: ${error.response?.data?.error || "Неизвестная ошибка"}`,
    });
  }
}
