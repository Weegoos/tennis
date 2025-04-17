<template>
  <div class="q-px-lg q-py-md text-black" data-testid="wrapperDataTestID">
    <q-card
      data-testid="tournamentCard"
      class="rounded-xl shadow-4xl bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 text-black"
    >
      <q-card-section data-testid="tournamentCardSection">
        <div class="text-h4 q-mb-md font-extrabold text-center">
          Tournament Rules & Regulations
        </div>
        <q-separator color="white" />

        <div class="q-mt-md">
          <q-list dense>
            <q-item-label class="q-py-xs">
              <div class="text-h6 text-primary font-semibold">
                1. Eligibility
              </div>
              <div class="text-body2 text-black">
                All participants must be at least 18 years old to compete in the
                tournament.
              </div>
            </q-item-label>

            <q-item-label class="q-py-xs">
              <div class="text-h6 text-primary font-semibold">
                2. Registration
              </div>
              <div class="text-body2 text-black">
                Participants must register through the official system before
                the tournament starts.
              </div>
            </q-item-label>

            <q-item-label class="q-py-xs">
              <div class="text-h6 text-primary font-semibold">
                3. Code of Conduct
              </div>
              <div class="text-body2 text-black">
                All participants are expected to follow the code of conduct and
                display good sportsmanship.
              </div>
            </q-item-label>

            <q-item-label class="q-py-xs">
              <div class="text-h6 text-primary font-semibold">
                4. Tournament Format
              </div>
              <div class="text-body2 text-black">
                The tournament will follow a round-robin format with knockout
                stages.
              </div>
            </q-item-label>

            <q-item-label class="q-py-xs">
              <div class="text-h6 text-primary font-semibold">
                5. Match Rules
              </div>
              <div class="text-body2 text-black">
                All matches will be played according to official tennis rules,
                with standard scoring and equipment.
              </div>
            </q-item-label>

            <q-item-label class="q-py-xs">
              <div class="text-h6 text-primary font-semibold">
                6. Player Safety
              </div>
              <div class="text-body2 text-black">
                Players must report any injuries to the officials immediately
                and may be disqualified for health reasons.
              </div>
            </q-item-label>

            <q-item-label class="q-py-xs">
              <div class="text-h6 text-primary font-semibold">
                7. Prize Distribution
              </div>
              <div class="text-body2 text-black">
                Prizes will be awarded to the top three finishers in each
                category.
              </div>
            </q-item-label>

            <q-item-label class="q-py-xs">
              <div class="text-h6 text-primary font-semibold">
                8. Tournament Schedule
              </div>
              <div class="text-body2 text-black">
                The full tournament schedule will be available online and
                updated as necessary.
              </div>
            </q-item-label>
          </q-list>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { redirectToUser } from "src/composables/javascriptFunction/redirectToTheAuthPage";
import { onMounted } from "vue";

onMounted(() => {
  redirectToUser();
});
</script>

<style scoped>
.q-card {
  border-radius: 20px;
}

.text-h4 {
  font-size: 24px;
}

.text-h6 {
  font-size: 18px;
}

.text-body2 {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}

.q-list {
  font-size: 16px;
}

.q-item-label {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 12px;
}

.q-item-label .text-primary {
  font-weight: bold;
}

.q-separator {
  margin: 12px 0;
}
</style>
