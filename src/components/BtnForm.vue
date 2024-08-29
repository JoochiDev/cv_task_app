<script setup>
defineProps({
  texto: {
    type: String
  },
  classVue: {
    type: String
  }
})
</script>
<template>
  <button
    type="submit"
    class="rounded-md py-2 px-3 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
    :class="classVue"
  >
    {{ texto }}
  </button>
</template>
