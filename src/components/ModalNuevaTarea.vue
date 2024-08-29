<template>
  <div class="fixed inset-0 z-50 bg-gray-300/80">
    <div
      class="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 rounded-xl border border-gray-300 bg-white p-6 shadow-lg"
    >
      <div class="flex flex-col space-y-1.5 text-center sm:text-left" data-id="27">
        <h2
          id="radix-:ra:"
          class="whitespace-nowrap text-lg font-semibold leading-none tracking-tight"
          data-id="28"
        >
          Agregar Nueva Tarea
        </h2>
      </div>
      <div>
        <slot name="slot-input-tarea"></slot>
      </div>
      <div class="w-full h-10">
        <slot name="slot-input-select"></slot>
      </div>
      <div class="flex flex-col-reverse mt-8 sm:flex-row sm:justify-end sm:space-x-2">
        <slot name="slot-btn-tarea-registro"></slot>
      </div>
    </div>
  </div>
</template>
