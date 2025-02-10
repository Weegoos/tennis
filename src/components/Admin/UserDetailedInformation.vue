<template>
  <div>
    <q-dialog v-model="isUserDetailedInformation" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-list>
            <q-expansion-item popup icon="filter_1" label="Персональные данные">
              <q-separator />
              <q-card>
                <q-card-section>
                  <span class="infoHeadline">ФИО</span>
                  <p class="infoStyle">
                    {{ props.conclusionDetailedInformation.secondName }}
                    {{ props.conclusionDetailedInformation.name }}
                  </p>
                  <span class="infoHeadline">ИИН</span>
                  <p class="infoStyle">
                    {{ props.conclusionDetailedInformation.iin }}
                  </p>
                  <span class="infoHeadline">Электронная почта</span>
                  <p class="infoStyle">
                    {{ props.conclusionDetailedInformation.email }}
                  </p>
                  <span class="infoHeadline">Дата регистрации</span>
                  <p class="infoStyle">
                    {{ formattedRegistrationDate }}
                  </p>
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item
              popup
              icon="filter_2"
              label="Работа"
              caption="Информация о месте работы"
            >
              <q-separator />
              <q-card>
                <q-card-section>
                  <span class="infoHeadline">Департамент</span>
                  <p class="infoStyle">
                    {{ props.conclusionDetailedInformation.department.name }}
                  </p>
                  <span class="infoHeadline">Регион</span>
                  <p class="infoStyle">
                    {{ props.conclusionDetailedInformation.department.region }}
                  </p>
                  <span class="infoHeadline">Должность</span>
                  <p class="infoStyle">
                    {{ props.conclusionDetailedInformation.jobTitle.name }}
                  </p>
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item popup icon="filter_3" label="Заключении">
              <q-separator />
              <q-card>
                <q-card-section>
                  <span class="infoHeadline">Заключении</span>
                  <p class="infoStyle">
                    {{
                      props.conclusionDetailedInformation.conclusions ||
                      "Не указано"
                    }}
                  </p>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            no-caps
            label="Close"
            color="red-4"
            @click="closeUserDetailedInformation"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  isOpenUserDetailedInformation: {
    type: Boolean,
    required: true,
  },
  userInfo: {
    type: Object,
    required: true,
  },
});
const isUserDetailedInformation = ref(props.isOpenUserDetailedInformation);

watch(
  () => props.isOpenUserDetailedInformation,
  (newVal) => {
    isUserDetailedInformation.value = newVal;
  }
);

const emit = defineEmits(["closeUserDetailedInformation"]);
const closeUserDetailedInformation = () => {
  emit("closeUserDetailedInformation");
};
</script>

<style></style>
