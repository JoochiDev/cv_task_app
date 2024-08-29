<script setup>
import Select from '../components/Select.vue'
import ModalConfirm from '../components/ModalConfirm.vue'
import Input from '@/components/Input.vue'
import TextArea from '@/components/TextArea.vue'
import BtnTareaForm from '@/components/BtnTareaForm.vue'
import ModalNuevaTarea from '@/components/ModalNuevaTarea.vue'
import BtnOpcionesIcon from '@/components/BtnOpcionesIcon.vue'
import Loader from '@/components/Loader.vue'
import BtnAgregarTarea from '@/components/BtnAgregarTarea.vue'
import ItemListaTarea from '@/components/ItemListaTarea.vue'
import ModalActualizarTarea from '@/components/ModalActualizarTarea.vue'
import { useRouter } from 'vue-router'

import {
  fetchObtenerDatos,
  fetchAgregarNuevaTarea,
  fetchRecuperarTarea,
  fetchActualizarTarea,
  fetchEliminarTarea,
  fetchCerrarSesion
} from '@/utilidades/metodos'

import { ref } from 'vue'
import { onMounted } from 'vue'

const modalNuevaTarea = ref(false)
const modalConfirmarEliminacion = ref(false)
const modalActualizarTarea = ref(false)
const idTareaEliminar = ref(0)
const idTareaActualizar = ref(0)
const name = ref('')
const cerrarSesion = ref(false)
const tareas = ref([])
const isLoading = ref(true)
const router = useRouter()
const usuarioAutenticado = ref(false)

const nuevaTarea = ref({
  titulo: '',
  descripcion: '',
  estado: ''
})
function limpiarDatosNuevTarea() {
  nuevaTarea.value = { titulo: '', descripcion: '', estado: '' }
  selectedOption.value = { valor: '', texto: '' }
}
function limpiarMsgError() {
  msgError.value = { estado: '', descripcion: '', titulo: '' }
}
const datosOriginales = ref({
  titulo: '',
  descripcion: '',
  estado: ''
})

function validarErroresTareas({ inputError, message }) {
  msgError.value = { titulo: '', descripcion: '', estado: '' }
  if (inputError === 'title') {
    msgError.value.titulo = message
  } else if (inputError === 'description') {
    msgError.value.descripcion = message
  } else if (inputError === 'status') {
    msgError.value.estado = message
  }
}

const msgError = ref({
  estado: '',
  descripcion: '',
  titulo: ''
})

const selectedOption = ref({
  valor: '',
  texto: ''
})
const statusColors = {
  pendiente: 'bg-yellow-200 text-yellow-800',
  proceso: 'bg-blue-200 text-blue-800',
  terminado: 'bg-green-200 text-green-800'
}

const statusLabels = {
  pendiente: 'Pendiente',
  proceso: 'En Proceso',
  terminado: 'Terminado'
}

const opciones = ref([
  { id: 1, valor: 'pendiente', texto: 'Pendiente' },
  { id: 2, valor: 'proceso', texto: 'En proceso' },
  { id: 3, valor: 'terminado', texto: 'Terminado' }
])

const modalActualizarTareaCerrar = () => {
  modalActualizarTarea.value = false
  limpiarDatosNuevTarea()
}
const updateOpcion = (valor) => {
  selectedOption.value.texto = valor.texto
  selectedOption.value.valor = valor.valor
  // opciones.value[valor.id - 1].valor = valor.valor
  // console.log(valor)
}

onMounted(() => {
  fetchObtenerDatos()
    .then((data) => {
      tareas.value = data.data
      usuarioAutenticado.value = true
      name.value = data.usuario
    })
    .finally(() => {
      isLoading.value = false
    })
})

const agregarNuevaTarea = () => {
  fetchAgregarNuevaTarea({ formulario: nuevaTarea.value })
    .then((data) => {
      tareas.value.push(data.data)
      modalNuevaTarea.value = false
      limpiarDatosNuevTarea()
      limpiarMsgError()
    })
    .catch((error) => {
      const errorJson = JSON.parse(error.message)
      validarErroresTareas({ inputError: errorJson.inputError, message: errorJson.message })
    })
}

const modalActualizar = ({ id }) => {
  idTareaActualizar.value = id

  fetchRecuperarTarea({ id: idTareaActualizar.value })
    .then((data) => {
      nuevaTarea.value.titulo = data.title
      nuevaTarea.value.descripcion = data.description
      nuevaTarea.value.estado = data.status

      datosOriginales.value.titulo = data.title
      datosOriginales.value.descripcion = data.description
      datosOriginales.value.estado = data.status

      selectedOption.value.valor = data.status
      selectedOption.value.texto = data.status
    })
    .catch((error) => {
      console.error(error.message)
    })
  modalActualizarTarea.value = true
}

const actualizarTarea = () => {
  const datosActualizar = {}

  if (nuevaTarea.value.titulo !== datosOriginales.value.titulo) {
    datosActualizar.title = nuevaTarea.value.titulo
  }
  if (nuevaTarea.value.descripcion !== datosOriginales.value.descripcion) {
    datosActualizar.description = nuevaTarea.value.descripcion
  }
  if (nuevaTarea.value.estado !== datosOriginales.value.estado) {
    datosActualizar.status = nuevaTarea.value.estado
  }

  if (Object.keys(datosActualizar).length === 0) {
    modalActualizarTarea.value = false
    return
  }

  fetchActualizarTarea({ formulario: datosActualizar, id: idTareaActualizar.value })
    .then((data) => {
      const dataActualizado = data.data
      const indiceTarea = tareas.value.findIndex((tarea) => tarea.id === dataActualizado.id)
      if (indiceTarea === -1) {
        throw new Error('No existe la tarea, error desconocido')
      }
      tareas.value[indiceTarea] = dataActualizado
      limpiarDatosNuevTarea()
      modalActualizarTarea.value = false
    })
    .catch((error) => {
      const errorJson = JSON.parse(error.message)
      validarErroresTareas({ inputError: errorJson.inputError, message: errorJson.message })
    })
}

const eliminarTarea = () => {
  fetchEliminarTarea({ id: idTareaEliminar.value })
    .then((data) => {
      tareas.value = tareas.value.filter((tarea) => tarea.id !== idTareaEliminar.value)
      idTareaEliminar.value = ''
      modalConfirmarEliminacion.value = false
    })
    .catch((error) => {
      // console.error(error)
    })
}

function actualizarEstadoSubmit(valor) {
  nuevaTarea.value.estado = valor
}

const cerrarModalConfrim = () => {
  modalConfirmarEliminacion.value = false
}

const modalEliminar = ({ id }) => {
  idTareaEliminar.value = id
  modalConfirmarEliminacion.value = true
}

const btnCerrarSesion = () => {
  fetchCerrarSesion()
    .then((data) => {
      // console.log(data.message)
      router.push('/')
    })
    .catch((error) => {
      // console.log(error.message)
    })
}

function beforeEnter(el) {
  el.style.opacity = 0
  el.style.transform = 'translateY(10px)'
}

function enter(el, done) {
  el.offsetHeight
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease'
  el.style.opacity = 1
  el.style.transform = 'translateY(0)'
  done()
}

function leave(el, done) {
  el.style.transition = 'opacity 1s ease, transform 1s ease'
  el.style.opacity = 0
  el.style.transform = 'translatex(4px)'
  done()
}
</script>
<template>
  <div v-if="isLoading">
    <Loader />
  </div>
  <div v-else>
    <div
      v-if="usuarioAutenticado"
      class="min-h-screen bg-gradient-to-r from-pink-300 to-pink-200 p-8"
    >
      <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div class="bg-pink-400 bg-opacity-70 p-6 flex items-center justify-between">
          <h1 class="text-3xl font-bold text-white">Gestor de Tareas</h1>
          <div class="flex justify-end w-2/12 relative items-center space-x-4">
            <span class="text-white font-semibold">{{ name }}</span>
            <div
              @click="cerrarSesion = !cerrarSesion"
              class="flex bg-white rounded-full p-2 cursor-pointer"
            >
              <img class="h-6 w-6" src="../assets/avatar.svg" alt="Juan Pérez" />
            </div>
            <div
              v-if="cerrarSesion"
              class="absolute top-12 right-0 w-full z-10 bg-white border border-slate-200 rounded-md py-2 px-1"
            >
              <ul>
                <li
                  class="hover:bg-gray-100 p-1 text-slate-800 font-medium font-sans cursor-pointer hover:rounded"
                >
                  Settings
                </li>
                <li
                  @click="btnCerrarSesion"
                  class="hover:bg-gray-100 p-1 text-slate-800 font-medium font-sans cursor-pointer hover:rounded"
                >
                  Cerrar sesion
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="p-6">
          <BtnAgregarTarea @click="modalNuevaTarea = true">
            <template #slot-icon-add-task>
              <img class="mr-2" src="../assets/plusTask.svg" alt="" />
            </template>
          </BtnAgregarTarea>
          <!-- ListaTareas -->
          <ul class="space-y-4">
            <div v-if="tareas.length !== 0">
              <li v-for="tarea in tareas" :key="tarea.id" class="">
                <ItemListaTarea
                  :tarea-titulo="tarea.title"
                  :tarea-descripcion="tarea.description"
                  :texto-estado="statusLabels[tarea.status]"
                  :color-estado="statusColors[tarea.status]"
                >
                  <template #slot-btn-icon-opcion>
                    <BtnOpcionesIcon @click="modalActualizar({ id: tarea.id })">
                      <template #slot-icon-opcion>
                        <img class="" src="../assets/edit.svg" alt="" />
                      </template>
                    </BtnOpcionesIcon>
                    <BtnOpcionesIcon @click="modalEliminar({ id: tarea.id })">
                      <template #slot-icon-opcion>
                        <img class="" src="../assets/delete.svg" alt="" />
                      </template>
                    </BtnOpcionesIcon>
                  </template>
                </ItemListaTarea>
              </li>
            </div>
            <li v-else class="border-t-2 border-gray-950">
              <h2 class="text-center font-medium text-2xl pt-4">No hay Tareas</h2>
            </li>
          </ul>

          <!-- modalAgregarTarea -->
          <transition @before-enter="beforeEnter" @enter="enter" @leave="leave">
            <ModalNuevaTarea v-if="modalNuevaTarea">
              <template #slot-input-tarea>
                <Input v-model="nuevaTarea.titulo" />
                <p class="mt-2 text-sm text-red-600">{{ msgError.titulo }}</p>
                <TextArea v-model="nuevaTarea.descripcion" />
                <p class="mt-2 text-sm text-red-600">{{ msgError.descripcion }}</p>
              </template>
              <template #slot-input-select>
                <Select
                  :selected-option="selectedOption"
                  :options="opciones"
                  @opcionSeleccionada="updateOpcion"
                  @valor-estado="actualizarEstadoSubmit"
                />
                <p class="mt-2 text-sm text-red-600">{{ msgError.estado }}</p>
              </template>
              <template #slot-btn-tarea-registro>
                <BtnTareaForm
                  @click="modalNuevaTarea = false"
                  text-btn-tarea="Cancelar"
                  class-btn-tarea="border border-gray-200 bg-white hover:bg-slate-100/40 text-black"
                />
                <BtnTareaForm @click="agregarNuevaTarea" text-btn-tarea="Agregar" />
              </template>
            </ModalNuevaTarea>
          </transition>
          <!-- modalActualizarTarea -->
          <transition @before-enter="beforeEnter" @enter="enter" @leave="leave">
            <ModalActualizarTarea v-if="modalActualizarTarea">
              <template #slot-input-actualizar>
                <Input v-model="nuevaTarea.titulo" />
                <p class="mt-2 text-sm text-red-600">{{ msgError.titulo }}</p>
                <TextArea v-model="nuevaTarea.descripcion" />
                <p class="mt-2 text-sm text-red-600">{{ msgError.descripcion }}</p>
              </template>
              <template #slot-select-actualizar>
                <Select
                  :selected-option="selectedOption"
                  :options="opciones"
                  @opcionSeleccionada="updateOpcion"
                  @valor-estado="actualizarEstadoSubmit"
                />
                <p class="mt-2 text-sm text-red-600">{{ msgError.estado }}</p>
              </template>
              <template #slot-btn-actualizar>
                <BtnTareaForm
                  @click="modalActualizarTareaCerrar"
                  text-btn-tarea="Cancelar"
                  class-btn-tarea="border border-gray-200 bg-white hover:bg-slate-100/40 text-black"
                />
                <BtnTareaForm @click="actualizarTarea" text-btn-tarea="Agregar" />
              </template>
            </ModalActualizarTarea>
          </transition>

          <!--modalEliminarTarea-->
          <ModalConfirm
            v-if="modalConfirmarEliminacion"
            @cerrarModalConfirm="cerrarModalConfrim"
            @handleEliminarTarea="eliminarTarea"
          />
        </div>
      </div>
    </div>

    <!-- Usuario no autenticado -->

    <div v-else class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div class="text-center">
        <p class="text-base font-semibold text-indigo-600">401</p>
        <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          UnAuthorized
        </h1>
        <p class="mt-6 text-base leading-7 text-gray-600">
          Inicia sesión correctamente para navegar en la sección.
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <router-link
            :to="{ name: 'Home' }"
            class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >Volver al inicio
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
