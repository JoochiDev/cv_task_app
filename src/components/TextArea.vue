<script setup>
import { defineEmits } from 'vue'
defineProps({
  modelValue: {
    type: String
  }
})
const emit = defineEmits(['update:modelValue'])
const handleInputTextArea = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <textarea
    :value="modelValue"
    @input="handleInputTextArea"
    class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed mb-4"
    placeholder="Descripción de la tarea"
  ></textarea>
</template>
