<template>
  <div>
    <q-btn color="red-4" :label="label" no-caps />
  </div>
</template>

<script setup>
defineProps({
  label: String,
});
</script>
