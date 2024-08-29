import { APP_API_TASKS_URL, APP_API_USERS_URL } from './variables.js'
export const fetchRegistrar = ({ formulario }) => {
  return fetch(`${APP_API_USERS_URL}/register`, {
    method: 'POST',
    body: JSON.stringify({
      username: formulario.nombre,
      password_hash: formulario.password
    }),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }).then((result) => {
    if (result.ok) {
      return result.json()
    } else {
      return result.json().then((error) => {
        throw new Error(JSON.stringify(error))
      })
    }
  })
}

export const fetchLogin = ({ formulario }) => {
  return fetch(`${APP_API_USERS_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({
      username: formulario.nombre,
      password_hash: formulario.password
    })
  }).then((result) => {
    if (result.status === 200) {
      return result.json()
    } else {
      return result.json().then((error) => {
        throw new Error(JSON.stringify(error))
      })
    }
  })
}

export const fetchCerrarSesion = () => {
  return fetch(`${APP_API_USERS_URL}/logout`, {
    method: 'POST',
    credentials: 'include'
  }).then((result) => {
    if (result.ok) {
      return result.json()
    } else {
      return result.json().then((error) => {
        throw new Error(JSON.stringify(error))
      })
    }
  })
}

//TASKS
export const fetchObtenerDatos = () => {
  return fetch(`${APP_API_TASKS_URL}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }).then((result) => {
    if (result.ok) {
      return result.json()
    } else {
      return result.json().then((error) => {
        throw new Error(error.message)
      })
    }
  })
}

export const fetchAgregarNuevaTarea = ({ formulario }) => {
  return fetch(`${APP_API_TASKS_URL}`, {
    method: 'POST',
    body: JSON.stringify({
      title: formulario.titulo,
      description: formulario.descripcion,
      status: formulario.estado
    }),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }).then((result) => {
    if (result.ok) {
      return result.json()
    } else {
      return result.json().then((error) => {
        throw new Error(JSON.stringify(error))
      })
    }
  })
}

export const fetchRecuperarTarea = ({ id }) => {
  return fetch(`${APP_API_TASKS_URL}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }).then((result) => {
    if (result.ok) {
      return result.json()
    } else {
      return result.json().then((error) => {
        throw new Error(error.message)
      })
    }
  })
}

export const fetchActualizarTarea = ({ formulario, id }) => {
  return fetch(`${APP_API_TASKS_URL}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(formulario),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }).then((result) => {
    if (result.ok) {
      return result.json()
    } else {
      return result.json().then((error) => {
        throw new Error(JSON.stringify(error))
      })
    }
  })
}

export const fetchEliminarTarea = ({ id }) => {
  return fetch(`${APP_API_TASKS_URL}/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  }).then((result) => {
    if (result.ok) {
      return result.json()
    } else {
      return result.json().then((error) => {
        throw new Error(JSON.stringify(error.message))
      })
    }
  })
}
