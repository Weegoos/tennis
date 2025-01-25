<template>
  <div>
    <q-dialog v-model="request" persistent>
      <q-card style="width: 800px">
        <p class="text-center text-h5 q-mt-md">Place a request</p>
        <q-card-section class="row q-gutter-sm">
          <div class="col">
            <q-select
              v-model="city"
              :options="cities"
              label="Choose a city"
              filled
            />
            <q-select
              class="q-mt-md"
              v-model="tennisCenter"
              :options="tennisCenterOptions"
              label="Choose a tennis center"
              filled
            />
            <div class="row q-gutter-sm">
              <section class="col">
                <q-input v-model="from" type="date" label="From" />
              </section>
              <section class="col">
                <q-input v-model="to" type="date" label="To" />
              </section>
            </div>
            <q-input
              class="q-mt-md"
              v-model="comments"
              type="text"
              label="Write your comment, requirements, convenient time, etc."
              autogrow
            />
            <q-input v-model="number" type="text" label="Telephone number" />
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="Close"
            color="negative"
            no-caps
            @closeFindPartnerRequestPage="closeFindPartnerRequestPage"
          />
          <q-btn label="Post" no-caps color="positive" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const cities = ref(["Astana", "Almaty", "Karaganda"]);
const city = ref("Astana");
const tennisCenterOptions = ref(["Astana Sport Tennis Center"]);
const tennisCenter = ref("Astana Sport Tennis Center");

const props = defineProps({
  openRequestPage: {
    type: Boolean,
    required: true,
  },
});
const request = ref(props.openRequestPage);

watch(
  () => props.openRequestPage,
  (newVal) => {
    request.value = newVal;
  }
);

const emit = defineEmits(["closeFindPartnerRequestPage"]);

const closeFindPartnerRequestPage = () => {
  emit("closeFindPartnerRequestPage");
};
</script>

<style></style>
