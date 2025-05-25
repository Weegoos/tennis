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
          Tournament Rules & Regulations
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
import { onMounted } from "vue";
import { redirectToUser } from "src/composables/javascriptFunction/redirectToTheAuthPage";

onMounted(() => {
  redirectToUser();
});

const rules = [
  {
    title: "Eligibility",
    description:
      "All participants must be at least 18 years old to compete in the tournament.",
  },
  {
    title: "Registration",
    description:
      "Participants must register through the official system before the tournament starts.",
  },
  {
    title: "Code of Conduct",
    description:
      "All participants are expected to follow the code of conduct and display good sportsmanship.",
  },
  {
    title: "Tournament Format",
    description:
      "The tournament will follow a round-robin format with knockout stages.",
  },
  {
    title: "Match Rules",
    description:
      "All matches will be played according to official tennis rules, with standard scoring and equipment.",
  },
  {
    title: "Player Safety",
    description:
      "Players must report any injuries to the officials immediately and may be disqualified for health reasons.",
  },
  {
    title: "Prize Distribution",
    description:
      "Prizes will be awarded to the top three finishers in each category.",
  },
  {
    title: "Tournament Schedule",
    description:
      "The full tournament schedule will be available online and updated as necessary.",
  },
];
</script>
