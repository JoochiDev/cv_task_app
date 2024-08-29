<script setup>
defineProps({
  tareaTitulo: {
    type: String
  },
  tareaDescripcion: {
    type: String
  },
  textoEstado: {
    type: String
  },
  colorEstado: {
    type: String
  }
})
</script>
<template>
  <div class="bg-pink-50 p-4 rounded-lg my-3">
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-lg font-semibold">{{ tareaTitulo }}</h3>
      <div class="flex space-x-2">
        <slot name="slot-btn-icon-opcion"></slot>
      </div>
    </div>

    <p class="text-gray-600 mb-2">{{ tareaDescripcion }}</p>
    <div
      :class="[
        'inline-block text-center px-2 py-1 rounded-full text-xs font-semibold',
        colorEstado
      ]"
    >
      {{ textoEstado }}
    </div>
  </div>
</template>
