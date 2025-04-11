<template>
  <div>
    <div class="q-pa-md q-gutter-sm">
      <q-dialog v-model="confirm" persistent>
        <q-card class="my-card">
          <q-card-section>
            <q-input
              v-model="title"
              type="text"
              placeholder="Write your title"
              autogrow
            />
          </q-card-section>
          <q-card-section>
            <q-editor
              v-model="editor"
              :definitions="{
                bold: { label: 'Bold', icon: null, tip: 'My bold tooltip' },
              }"
            />
          </q-card-section>
          <q-card-actions align="center">
            <q-btn no-caps label="Close" @click="closePage" />
            <q-btn no-caps label="Edit" @click="editNews" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { putMethod } from "src/composables/apiMethod/put";
import { getCurrentInstance, ref, watch } from "vue";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();
const props = defineProps({
  isOpenEditPage: {
    required: true,
    default: false,
    type: Boolean,
  },
  newsIdenticator: {
    required: true,
    type: Number,
  },
});

const editor = ref("Write your description");
const confirm = ref(props.isOpenEditPage);
const title = ref("");

watch(
  () => props.isOpenEditPage,
  (newVal) => {
    confirm.value = newVal;
  }
);

const emit = defineEmits(["closePage"]);
const closePage = () => {
  emit("closePage");
};

const editNews = async () => {
  try {
    await putMethod(
      serverURL,
      `news/${props.newsIdenticator}/updateNews?`,
      "",
      $q,
      "The news has been successfully updated",
      "Error: ",
      {
        title: title.value,
        description: editor.value,
      }
    );
  } catch (error) {
    console.log(error);
  }
};
</script>

<style></style>
