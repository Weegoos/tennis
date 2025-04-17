<template>
  <div class="q-px-lg q-py-md">
    <q-timeline color="secondary">
      <q-timeline-entry>
        <p class="text-h6">
          Development of a System for Organizing Tennis Tournaments with
          Participant Registration and Support for Various Competition Formats
        </p>
      </q-timeline-entry>

      <q-timeline-entry>
        <template v-slot:title> Project Team </template>
        <template v-slot:subtitle>
          Akzhan Omir (Backend Developer), Arystanbek Abiyev (Backend
          Developer), Ashim Batyr (Frontend Developer)
        </template>

        <div>
          This project focuses on developing a system to organize and manage
          tennis tournaments. The system will allow for participant
          registration, support multiple competition formats, and provide an
          intuitive user interface.
        </div>
      </q-timeline-entry>

      <q-timeline-entry>
        <template v-slot:title> System Overview </template>
        <template v-slot:subtitle>
          Aims to streamline tennis tournament organization
        </template>

        <div>
          The system provides functionality for registering participants,
          creating and managing tournament brackets, and supporting various
          competition formats. It ensures efficient operations from registration
          to the conclusion of the tournament, offering ease of use for both
          participants and organizers.
        </div>
      </q-timeline-entry>

      <q-timeline-entry heading> 2025 </q-timeline-entry>

      <q-timeline-entry :avatar="Akzhan">
        <template v-slot:title> Event Title </template>
        <template v-slot:subtitle> Akzhan Omir SE - 2215 </template>

        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </q-timeline-entry>

      <q-timeline-entry>
        <template v-slot:title> Event Title </template>
        <template v-slot:subtitle> February 22, 1986 </template>

        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </q-timeline-entry>

      <q-timeline-entry color="orange" icon="done_all">
        <template v-slot:title> Event Title </template>
        <template v-slot:subtitle> February 22, 1986 </template>

        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </q-timeline-entry>

      <q-timeline-entry>
        <template v-slot:title> Event Title </template>
        <template v-slot:subtitle> February 22, 1986 </template>

        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </q-timeline-entry>

      <q-timeline-entry>
        <template v-slot:title> Event Title </template>
        <template v-slot:subtitle> February 22, 1986 </template>

        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </q-timeline-entry>
    </q-timeline>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import Akzhan from "../assets/team/akzhan.jpg";
import { redirectToUser } from "src/composables/javascriptFunction/redirectToTheAuthPage";
onMounted(() => {
  redirectToUser();
});
</script>

<style></style>
