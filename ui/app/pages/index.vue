<script setup lang="ts">
const data = await $fetch('/api/payload')
</script>

<template>
  <div>
   {{ data }}
  </div>
</template>
