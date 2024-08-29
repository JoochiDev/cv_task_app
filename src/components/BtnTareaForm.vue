<script setup>
defineProps({
  textBtnTarea: {
    type: String
  },
  classBtnTarea: {
    type: String,
    default: 'bg-black hover:bg-slate-800 text-white'
  }
})
</script>
<template>
  <button class="font-medium py-2 px-4 rounded-md" :class="classBtnTarea">
    {{ textBtnTarea }}
  </button>
</template>
