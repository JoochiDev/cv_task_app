<script setup>
import { ref, defineEmits } from 'vue'

const props = defineProps({
  selectedOption: Object,
  options: Array
})

const isOpen = ref(false)

const selectOption = (option) => {
  isOpen.value = false

  emit('valorEstado', option.valor)
  emit('opcionSeleccionada', option)
}
const emit = defineEmits(['valorEstado', 'opcionSeleccionada'])
</script>
<template>
  <div class="relative w-full h-full">
    <button
      @click="isOpen = !isOpen"
      class="flex justify-between items-center h-full w-full rounded-md border border-input text-gray-900/90 font-bold px-3 py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed"
    >
      {{ props.selectedOption.valor !== '' ? props.selectedOption.texto : 'Seleccionar' }}

      <img v-if="isOpen" src="../assets/arrow_up.svg" class="p-1" />
      <img v-else src="../assets/icon_select.svg" />
    </button>
    <ul
      v-show="isOpen"
      class="absolute z-10 shadow-md rounded-md border border-input mt-2 w-full bg-white p-1"
    >
      <li
        v-for="option in props.options"
        :key="option.id"
        @click="selectOption(option)"
        :class="{
          'bg-gray-100 pl-0': selectedOption.valor === option.valor
        }"
        class="flex gap-1 cursor-pointer py-2 px-6 bg-white text-black hover:bg-gray-100"
      >
        <img
          v-if="option.valor === selectedOption.valor"
          src="../assets/check.svg"
          alt="check"
          class="ml-1"
        />

        {{ option.texto }}
      </li>
    </ul>

    <br />
  </div>
</template>
