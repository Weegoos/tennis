<template>
  <div
    class="px-6 py-4 text-black flex justify-center"
    data-testid="wrapperDataTestID"
  >
    <q-card
      data-testid="tournamentCard"
      class="w-full max-w-4xl rounded-2xl shadow-4xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white"
    >
      <q-card-section data-testid="tournamentCardSection" class="p-6">
        <div class="text-2xl md:text-3xl font-bold text-center mb-4">
          {{ t("regulationsPage.titleText") }}
        </div>

        <q-separator color="white" class="my-4" />

        <q-list class="space-y-4">
          <div
            v-for="(rule, index) in rules"
            :key="index"
            class="bg-white/10 p-4 rounded-xl hover:bg-white/20 transition"
          >
            <div class="text-lg font-semibold text-white mb-1">
              {{ index + 1 }}. {{ rule.title }}
            </div>
            <div class="text-sm text-white/90 leading-relaxed">
              {{ rule.description }}
            </div>
          </div>
        </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { redirectToUser } from "src/composables/javascriptFunction/redirectToTheAuthPage";
import { useI18n } from "vue-i18n";

onMounted(() => {
  redirectToUser();
});

// global variables
const { t } = useI18n();

const rules = computed(() => [
  {
    title: t("regulationsPage.eligibility"),
    description: t("regulationsPage.description.eligibilityDesc"),
  },
  {
    title: t("regulationsPage.registration"),
    description: t("regulationsPage.description.registrationDesc"),
  },
  {
    title: t("regulationsPage.codeOfConduct"),
    description: t("regulationsPage.description.codeOfConductDesc"),
  },
  {
    title: t("regulationsPage.tournamentFormat"),
    description: t("regulationsPage.description.tournamentFormatDesc"),
  },
  {
    title: t("regulationsPage.matchRules"),
    description: t("regulationsPage.description.matchRulesDesc"),
  },
  {
    title: t("regulationsPage.playerSafety"),
    description: t("regulationsPage.description.playerSafetyDesc"),
  },
  {
    title: t("regulationsPage.prizeDistribution"),
    description: t("regulationsPage.description.prizeDistributionDesc"),
  },
  {
    title: t("regulationsPage.tournamentSchedule"),
    description: t("regulationsPage.description.tournamentSchedule"),
  },
]);
</script>
