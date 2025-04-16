<template>
  <div>
    <q-dialog v-model="isOpenDetailedWindowAboutPartner" persistent>
      <q-card>
        <p class="text-center text-bold text-h5 q-mt-md">
          {{ t("findPartnerPage.detailedInformation.mainText") }}
        </p>
        <q-card-section class="row items-center">
          <q-list>
            <q-expansion-item
              popup
              :caption="
                t(
                  'findPartnerPage.detailedInformation.captionTextOfPersonalData'
                )
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
                      props.fullInformationAboutPartner.firstName ||
                      t("notSpecifiedText")
                    }}
                    {{
                      props.fullInformationAboutPartner.lastName ||
                      t("notSpecifiedText")
                    }}
                  </p>

                  <span class="infoHeadline">{{ t("phoneNumber") }}</span>
                  <p class="infoStyle">
                    {{
                      props.fullInformationAboutPartner.phone ||
                      t("notSpecifiedText")
                    }}
                  </p>
                  <span class="infoHeadline">{{ t("ratingText") }}</span>
                  <p class="infoStyle">
                    {{
                      props.fullInformationAboutPartner.rating ||
                      t("notSpecifiedText")
                    }}
                  </p>
                  <span class="infoHeadline">{{ t("cityText") }}</span>
                  <p class="infoStyle">
                    {{
                      props.fullInformationAboutPartner.city ||
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
                  'findPartnerPage.detailedInformation.captionTextOfProfessionalInformation'
                )
              "
              icon="filter_2"
              :label="t('professionalInformationText')"
            >
              <q-separator />
              <q-card>
                <q-card-section>
                  <span class="infoHeadline">{{ t("description") }}</span>
                  <p class="infoStyle">
                    {{
                      props.fullInformationAboutPartner.description ||
                      t("notSpecifiedText")
                    }}
                  </p>
                  <span class="infoHeadline">{{ t("stadiumText") }}</span>
                  <p class="infoStyle">
                    {{
                      props.fullInformationAboutPartner.stadium ||
                      t("notSpecifiedText")
                    }}
                  </p>
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item
              popup
              :caption="t('timePart.caption')"
              icon="filter_3"
              :label="t('timePart.label')"
            >
              <q-separator />
              <q-card>
                <q-card-section>
                  <span class="infoHeadline">{{
                    t("timePart.createdAt")
                  }}</span>
                  <p class="infoStyle">
                    {{
                      props.fullInformationAboutPartner.createdAt ||
                      t("notSpecifiedText")
                    }}
                  </p>
                  <span class="infoHeadline">{{
                    t("timePart.updatedAt")
                  }}</span>
                  <p class="infoStyle">
                    {{
                      props.fullInformationAboutPartner.updatedAt ||
                      t("notSpecifiedText")
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
  fullInformationAboutPartner: {
    type: Object,
  },
});
const { t } = useI18n();

const isOpenDetailedWindowAboutPartner = ref(props.openDetailedWindow);

watch(
  () => props.openDetailedWindow,
  (newVal) => {
    isOpenDetailedWindowAboutPartner.value = newVal;
  }
);
const emit = defineEmits(["closeWindow"]);
const closeWindow = () => {
  emit("closeWindow");
};
</script>

<style></style>
