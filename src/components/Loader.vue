<script setup></script>
<template>
  <div class="flex justify-center items-center h-screen bg-gradient-to-r from-pink-300 to-pink-200">
    <div class="bg-white p-8 rounded-lg shadow-xl">
      <div class="flex space-x-4">
        <div class="w-4 h-4 bg-pink-400 rounded-full animate-bounce"></div>
        <div
          class="w-4 h-4 bg-pink-400 rounded-full animate-bounce"
          style="animation-delay: 0.1s"
        ></div>
        <div
          class="w-4 h-4 bg-pink-400 rounded-full animate-bounce"
          style="animation-delay: 0.2s"
        ></div>
      </div>
      <p class="mt-4 text-gray-600 font-semibold">Cargando tareas...</p>
    </div>
  </div>
</template>
