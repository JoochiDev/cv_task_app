<script setup>
import Label from './Label.vue'
</script>
<template>
  <div
    class="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75 transition-opacity"
  >
    <div class="relative bg-white p-6 rounded-lg shadow-lg w-3/12">
      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-base font-semibold leading-7 text-gray-900">Información personal</h2>
        <p class="mt-1 text-sm leading-6 text-gray-600">
          Ingrese sus credenciales para iniciar sesión
        </p>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-6">
            <Label texto-label="Nombre de usuario" />
            <div class="mt-2">
              <slot name="slot-username-login"></slot>
            </div>
          </div>
          <div class="sm:col-span-6">
            <Label texto-label="Contraseña" />
            <div class="mt-2">
              <slot name="slot-password-login"></slot>
            </div>
          </div>
        </div>
      </div>
      <!-- loading -->
      <div>
        <slot name="slot-loading"></slot>
      </div>

      <div class="mt-6 flex items-center justify-end gap-x-6">
        <slot name="slot-btn-form-login"></slot>
      </div>
    </div>
  </div>
</template>
