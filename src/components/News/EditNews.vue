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
          <q-card-actions vertical align="center">
            <q-btn flat label="Edit" @click="editNews" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { putMethod } from "src/composables/apiMethod/put";
import { getCurrentInstance, ref } from "vue";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();

const editor = ref("Write your description");
const confirm = ref(false);
const title = ref("");
const editPayload = ref("");

const editNews = async () => {
  try {
    await putMethod(
      serverURL,
      `news/14/updateNews?`,
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
