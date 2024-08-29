<script setup>
defineProps({
  textoLabel: String
})
</script>
<template>
  <label for="email" class="block text-sm font-medium leading-6 text-gray-900">{{
    textoLabel
  }}</label>
</template>
