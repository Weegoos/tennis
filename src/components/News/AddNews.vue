<template>
  <div>
    <q-dialog v-model="confirm" persistent position="right">
      <q-card style="width: 350px">
        <q-card-section>
          <span> Add News</span>
          <q-input v-model="title" type="text" label="Enter your title" />
          <q-input
            v-model="description"
            type="text"
            label="Enter your description"
          />
          <q-uploader
            ref="uploaderRef"
            label="Загрузите фото"
            color="primary"
            text-color="white"
            accept="image/*"
            :auto-upload="false"
            style="max-width: 400px"
            class="q-mt-sm"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            no-caps
            label="Close"
            color="primary"
            @click="closeAddNewsBlock"
          />
          <q-btn
            flat
            no-caps
            label="Add"
            color="primary"
            @click="handleSubmit"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import axios from "axios";
import { Cookies } from "quasar";

// global variables
const props = defineProps({
  isOpenAddNewsBlock: {
    type: Boolean,
    default: false,
    required: true,
  },
});
const confirm = ref(props.isOpenAddNewsBlock);
watch(
  () => props.isOpenAddNewsBlock,
  (newVal) => {
    confirm.value = newVal;
  }
);

const emit = defineEmits(["closeAddNewsBlock"]);
const closeAddNewsBlock = () => {
  emit("closeAddNewsBlock");
};

const title = ref("");
const description = ref("");
const uploaderRef = ref(null);

const handleSubmit = async () => {
  const files = uploaderRef.value?.files || [];

  if (!files.length) {
    console.warn("Пожалуйста, выберите файл");
    return;
  }

  const formData = new FormData();
  formData.append("title", title.value);
  formData.append("description", description.value);
  formData.append("file", files[0]); // берём только первый файл

  try {
    const response = await axios.post(
      "http://localhost:8000/api/v1/news/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      }
    );

    console.log("Успешно отправлено:", response.data);

    // Очистка формы после успешной отправки
    title.value = "";
    description.value = "";
    uploaderRef.value.reset(); // Очистить выбранные файлы

    closeAddNewsBlock(); // Закрыть диалог
  } catch (error) {
    console.error("Ошибка при отправке:", error);
  }
};
</script>

<style></style>
