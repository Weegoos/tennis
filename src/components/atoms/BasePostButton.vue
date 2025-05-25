<template>
  <div>
    <q-btn color="green-4" :label="label" no-caps />
  </div>
</template>

<script setup>
defineProps({
  label: String,
});
</script>
