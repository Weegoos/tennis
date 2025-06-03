<template>
  <div class="q-px-lg q-py-md">
    <q-timeline color="secondary">
      <q-timeline-entry>
        <p class="text-h6">
          {{ t("aboutUsPageText.title") }}
        </p>
      </q-timeline-entry>

      <q-timeline-entry>
        <template v-slot:title>
          {{ t("aboutUsPageText.projectTeamText") }}
        </template>
        <template v-slot:subtitle>
          {{ t("aboutUsPageText.founders") }}
        </template>

        <div>
          {{ t("aboutUsPageText.aim") }}
        </div>
      </q-timeline-entry>

      <q-timeline-entry>
        <template v-slot:title>
          {{ t("aboutUsPageText.systemOverview") }}
        </template>
        <template v-slot:subtitle>
          {{ t("aboutUsPageText.platformDescription") }}
        </template>

        <div>
          {{ t("aboutUsPageText.functionalities") }}
        </div>
      </q-timeline-entry>

      <q-timeline-entry heading> 2025 </q-timeline-entry>

      <q-timeline-entry>
        <template v-slot:title> {{ t("aboutUsPageText.stackText") }} </template>
        <template v-slot:subtitle>
          {{ t("aboutUsPageText.stacks") }}
        </template>

        <div>
          {{ t("aboutUsPageText.frontendText") }}
        </div>
      </q-timeline-entry>

      <q-timeline-entry>
        <template v-slot:title>
          {{ t("aboutUsPageText.userRoleAndFutures") }}
        </template>
        <template v-slot:subtitle>
          {{ t("aboutUsPageText.functionalityBreakdown") }}</template
        >

        <div>
          <strong> {{ t("aboutUsPageText.regularUser.title") }}:</strong>
          {{ t("aboutUsPageText.regularUser.features") }}<br />
          <strong> {{ t("aboutUsPageText.organizer.title") }}:</strong>
          {{ t("aboutUsPageText.organizer.features") }}<br />
          <strong>{{ t("aboutUsPageText.admin.title") }}:</strong>
          {{ t("aboutUsPageText.admin.features") }}
        </div>
      </q-timeline-entry>

      <q-timeline-entry color="orange" icon="star">
        <template v-slot:title>
          {{ t("aboutUsPageText.rankingSystem") }}
        </template>
        <template v-slot:subtitle>
          {{ t("aboutUsPageText.playerPerformanceTracking") }}
        </template>

        <div>
          {{ t("aboutUsPageText.systemFeature") }}
        </div>
      </q-timeline-entry>
    </q-timeline>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import Akzhan from "../assets/team/akzhan.jpg";
import { useI18n } from "vue-i18n";
import { redirectToUser } from "src/composables/javascriptFunction/redirectToTheAuthPage";
onMounted(() => {
  redirectToUser();
});

// global variables
const { t } = useI18n();
</script>

<style></style>
