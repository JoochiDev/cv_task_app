<script setup>
import { defineEmits } from 'vue'
defineProps({
  modelValue: {
    type: String
  },
  pass: {
    type: String
  }
})
const emit = defineEmits(['update:modelValue'])
const updateTexto = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>
<template>
  <input
    :value="modelValue"
    :type="pass"
    @input="updateTexto"
    placeholder="Título de la tarea"
    class="block h-10 w-full rounded-md border border-gray-800/15 px-3 py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed"
  />
</template>
