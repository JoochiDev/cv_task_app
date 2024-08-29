<script setup>
defineProps({
  textoBtnHeader: {
    type: String
  }
})
</script>
<template>
  <button
    class="bg-gray-900 px-8 py-2 border-2 border-gray-300 rounded-lg text-white/80 font-semibold shadow-2xl hover:bg-gray-200 hover:border-2 hover:border-gray-900 hover:text-pink-950"
  >
    {{ textoBtnHeader }}
  </button>
</template>
