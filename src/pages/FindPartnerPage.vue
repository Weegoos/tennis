<template>
  <div>
    <div class="card">
      <p class="text-h4 text-bold">Find a partner</p>
      <q-btn color="primary" label="Place a request" @click="sendRequest" />
    </div>
    <section>
      <q-card class="card">
        <q-card-section>
          <div class="text-h6">Our Changing Planet</div>
          <div class="text-subtitle2">by John Doe</div>
        </q-card-section>
        <q-card-section>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </q-card-section>
      </q-card>
    </section>
    <PostRequest />
  </div>
</template>

<script setup>
import PostRequest from "src/components/Partner/PostRequest.vue";
</script>

<style scoped>
.card {
  margin-right: 200px;
  margin-left: 200px;
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>
