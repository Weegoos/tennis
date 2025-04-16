<template>
  <div>
    <q-dialog v-model="isOpenDetailedWindowAboutCoache" persistent>
      <q-card>
        <p class="text-center text-bold text-h5 q-mt-md">
          {{ t("coachPage.detailedInformation.mainText") }}
        </p>
        <q-card-section class="row items-center">
          <q-list>
            <q-expansion-item
              popup
              :caption="
                t('coachPage.detailedInformation.captionTextOfPersonalData')
              "
              icon="filter_1"
              :label="t('personalDataText')"
            >
              <q-separator />
              <q-card>
                <q-card-section>
                  <span data-testid="fullName" class="infoHeadline">{{
                    t("fullNameText")
                  }}</span>
                  <p class="infoStyle">
                    {{
                      props.coacheInformation.user.firstName ||
                      t("notSpecifiedText")
                    }}
                    {{
                      props.coacheInformation.user.lastName ||
                      t("notSpecifiedText")
                    }}
                  </p>
                  <span class="infoHeadline">{{ t("genderText") }}</span>
                  <p class="infoStyle">
                    {{
                      props.coacheInformation.user.gender ||
                      t("notSpecifiedText")
                    }}
                  </p>
                  <span class="infoHeadline">{{ t("phoneNumber") }}</span>
                  <p class="infoStyle">
                    {{
                      props.coacheInformation.user.phone ||
                      t("notSpecifiedText")
                    }}
                  </p>
                  <span class="infoHeadline">{{ t("ratingText") }}</span>
                  <p class="infoStyle">
                    {{
                      props.coacheInformation.user.rating ||
                      t("notSpecifiedText")
                    }}
                  </p>
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item
              popup
              :caption="
                t(
                  'coachPage.detailedInformation.captionTextOfProfessionalInformation'
                )
              "
              icon="filter_2"
              :label="t('professionalInformationText')"
            >
              <q-separator />
              <q-card>
                <q-card-section>
                  <span data-testid="" class="infoHeadline">{{
                    t("experienceText")
                  }}</span>
                  <p class="infoStyle">
                    {{
                      props.coacheInformation.experience ||
                      t("notSpecifiedText")
                    }}
                  </p>
                  <span class="infoHeadline">{{ t("costText") }}</span>
                  <p class="infoStyle">
                    {{ props.coacheInformation.cost || t("notSpecifiedText") }}
                  </p>
                  <span class="infoHeadline">{{ t("serviceText") }}</span>
                  <p class="infoStyle">
                    {{
                      props.coacheInformation.services[0].serviceName ||
                      t("notSpecifiedText")
                    }}
                  </p>
                  <span class="infoHeadline">{{ t("languageText") }}</span>
                  <p class="infoStyle">
                    {{
                      props.coacheInformation.languages[0] ||
                      t("notSpecifiedText")
                    }}
                  </p>
                  <span class="infoHeadline">{{ t("description") }}</span>
                  <p class="infoStyle">
                    {{
                      props.coacheInformation.description ||
                      t("notSpecifiedText")
                    }}
                  </p>
                  <span class="infoHeadline">{{ t("stadiumText") }}</span>
                  <p class="infoStyle">
                    {{
                      props.coacheInformation.stadium || t("notSpecifiedText")
                    }}
                  </p>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            no-caps
            :label="t('closeButton')"
            color="red-4"
            @click="closeWindow"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";

// global variables
const props = defineProps({
  openDetailedWindow: {
    type: Boolean,
    required: true,
  },
  coacheInformation: {
    type: Object,
    required: true,
  },
});
const { t } = useI18n();

const isOpenDetailedWindowAboutCoache = ref(props.openDetailedWindow);

watch(
  () => props.openDetailedWindow,
  (newVal) => {
    isOpenDetailedWindowAboutCoache.value = newVal;
  }
);
const emit = defineEmits(["closeWindow"]);
const closeWindow = () => {
  emit("closeWindow");
};
</script>

<style></style>
