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
          This diploma project focuses on creating a modern system for
          organizing tennis tournaments, supporting multiple competition
          formats, player registration, partner and coach search, and tournament
          management functionalities.
        </div>
      </q-timeline-entry>

      <q-timeline-entry>
        <template v-slot:title> System Overview </template>
        <template v-slot:subtitle>
          Comprehensive platform for managing tennis tournaments
        </template>

        <div>
          The system includes three user roles: regular user, tournament
          organizer, and admin. Regular users can register for tournaments, find
          partners or coaches, apply to become coaches, and read news.
          Organizers can create, update, and manage tournaments, track results,
          publish news, and approve or decline partner/coach applications.
          Admins have full control over users and application moderation.
        </div>
      </q-timeline-entry>

      <q-timeline-entry heading> 2025 </q-timeline-entry>

      <q-timeline-entry>
        <template v-slot:title> Technologies Used </template>
        <template v-slot:subtitle>
          Quasar, Vue.js, Tailwind, Spring Boot, Docker, PostgreSQL
        </template>

        <div>
          The frontend is developed using Vue 3 and Quasar Framework with
          Tailwind CSS for styling. Backend is powered by Java Spring Boot. The
          system is deployed using Docker and hosted via Netlify and Cloudflare
          R2. The app also includes mobile support using Cordova and testing via
          Vitest.
        </div>
      </q-timeline-entry>

      <q-timeline-entry>
        <template v-slot:title> User Roles and Features </template>
        <template v-slot:subtitle> Functionality Breakdown </template>

        <div>
          <strong>Regular Users:</strong> Register for tournaments, search for
          partners/coaches, apply to teach, read tennis-related news.<br />
          <strong>Organizers:</strong> Create and manage tournaments, set
          brackets, enter results, end tournaments, assign points, manage news,
          approve/decline applications.<br />
          <strong>Admins:</strong> Moderate user content, review and approve
          applications, manage users and data integrity.
        </div>
      </q-timeline-entry>

      <q-timeline-entry color="orange" icon="star">
        <template v-slot:title> Ranking System </template>
        <template v-slot:subtitle> Player Performance Tracking </template>

        <div>
          All participants of tournaments are automatically added to the ranking
          system. Points are awarded based on performance. Rankings are updated
          after each tournament concludes.
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
