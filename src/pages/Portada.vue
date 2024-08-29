<script setup>
import { ref } from 'vue'
import { fetchRegistrar, fetchLogin } from '@/utilidades/metodos'
import Input from '@/components/Input.vue'
import BtnForm from '@/components/BtnForm.vue'
import ModalRegistro from '@/components/ModalRegistro.vue'
import ModalLogin from '@/components/ModalLogin.vue'
import Loading from '@/components/Loading.vue'
import BtnHeader from '@/components/BtnHeader.vue'
import Main from '@/components/Main.vue'
import { useRouter } from 'vue-router'

const showModalLogin = ref(false)
const showModalRegistro = ref(false)
const loading = ref(false)
const msgExito = ref('')
const router = useRouter()

const datosFormulario = ref({
  nombre: '',
  password: ''
})
const msgError = ref({
  nombre: '',
  password: ''
})
function cerrarModalRegistro() {
  showModalRegistro.value = false
  limpiarDatosFormulario()
  limpiarMsgError
  msgExito.value = ''
}
function limpiarDatosFormulario() {
  datosFormulario.value = { nombre: '', password: '' }
}
function limpiarMsgError() {
  msgError.value = { nombre: '', password: '' }
}

function validateCredentialsRegister({ inputError, message }) {
  msgError.value = { username: '', password: '' }
  if (inputError === 'username') {
    msgError.value.nombre = message
  } else if (inputError === 'userExists') {
    msgError.value.nombre = message
  } else if (inputError === 'password_hash') {
    msgError.value.password = message
  }
}

function validateCredentialsLogin({ inputError, message }) {
  msgError.value = { username: '', password: '' }
  if (inputError === 'username') {
    msgError.value.nombre = message
  } else if (inputError === 'unknow_user') {
    msgError.value.nombre = message
  } else if (inputError === 'password_hash') {
    msgError.value.password = message
  } else if (inputError === 'unknow_password') {
    msgError.value.password = message
  }
}

function registrar() {
  fetchRegistrar({ formulario: datosFormulario.value })
    .then((resultado) => {
      limpiarMsgError()

      msgExito.value = resultado.message
      setTimeout(() => {
        msgExito.value = ''
        showModalRegistro.value = false
        limpiarDatosFormulario()
      }, 2000)
    })
    .catch((error) => {
      const errorJson = JSON.parse(error.message)
      validateCredentialsRegister({ inputError: errorJson.inputError, message: errorJson.message })
      console.log(errorJson)
    })
}

const autenticar = () => {
  fetchLogin({ formulario: datosFormulario.value })
    .then((resultado) => {
      loading.value = true
      limpiarMsgError()
      setTimeout(() => {
        showModalLogin.value = false
        router.push('/tareas')
      }, 1000)
    })
    .catch((error) => {
      const errorJson = JSON.parse(error.message)
      validateCredentialsLogin({ inputError: errorJson.inputError, message: errorJson.message })
    })
}

// Transition functions
function beforeEnter(el) {
  el.style.opacity = 0
  el.style.transform = 'translateX(4px)'
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
  <div
    class="flex flex-col justify-start p-4 h-screen w-full bg-gradient-to-br from-gray-300/60 via-pink-400/70 to-purple-400"
  >
    <header class="flex w-full">
      <div class="w-4/12">
        <h1
          class="pl-4 text-4xl italic font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-purple-600 leading-tight"
        >
          MuchiTask
        </h1>
      </div>
      <div class="w-full flex justify-end items-center space-x-4">
        <BtnHeader @click="showModalRegistro = true" texto-btn-header="Registrar" />
        <BtnHeader @click="showModalLogin = true" texto-btn-header="Ingresar" />
      </div>
    </header>
    <Main />
  </div>

  <!-- modal login -->
  <transition @before-enter="beforeEnter" @enter="enter" @leave="leave">
    <ModalLogin v-if="showModalLogin">
      <template #slot-username-login>
        <Input v-model="datosFormulario.nombre" />
        <span class="text-red-600/75 text-sm">{{ msgError.nombre }}</span>
      </template>
      <template #slot-password-login>
        <Input v-model="datosFormulario.password" pass="password" />
        <span class="text-red-600/75 text-sm">{{ msgError.password }}</span>
      </template>
      <template #slot-loading>
        <loading v-if="loading" />
      </template>
      <template #slot-btn-form-login>
        <BtnForm
          @click="showModalLogin = false"
          texto="Cancelar"
          class-vue="bg-slate-600 hover:bg-slate-500"
        />
        <BtnForm
          @click="autenticar"
          texto="Ingresar"
          class-vue="bg-indigo-600 hover:bg-indigo-500"
        />
      </template>
    </ModalLogin>
  </transition>

  <!-- modal Registro -->
  <transition @before-enter="beforeEnter" @enter="enter" @leave="leave">
    <ModalRegistro v-if="showModalRegistro">
      <template #slot-username>
        <Input v-model="datosFormulario.nombre" />
        <span class="text-red-600/75 text-sm">{{ msgError.nombre }}</span>
      </template>
      <template #slot-password>
        <Input v-model="datosFormulario.password" pass="password" />
        <span class="text-red-600/75 text-sm">{{ msgError.password }}</span>
        <span class="text-green-500/75 text-sm">{{ msgExito }}</span>
      </template>
      <template #slot-btnRegistro>
        <BtnForm
          @click="cerrarModalRegistro"
          texto="Cancelar"
          class-vue=" bg-slate-600  hover:bg-slate-500 "
        />
        <BtnForm
          @click="registrar"
          texto="Crear"
          class-vue=" bg-purple-600   hover:bg-purple-500 "
        />
      </template>
    </ModalRegistro>
  </transition>
</template>
