import { useState } from 'react'

export const useForm = (formularioInicial) => {

  const [formulario, setFormulario] = useState(formularioInicial)
  const [errores, setErrores] = useState({})

  // obtener y setear los valores del formulario
  const manejoCambioEntrada = (e) => {
    const {name, value} = e.target
    setFormulario({
      ...formulario,
      [name]: value
    })
    // si había un error para este campo, lo limpiamos al modificarlo
    if (errores[name]) {
      setErrores(prev => {
        const copy = {...prev}
        delete copy[name]
        return copy
      })
    }
  }

  const manejoReinicio = () => {
    setFormulario(formularioInicial)
    setErrores({})
  }

  const validarCamposVacios = () => {
    const nuevosErrores = {}
    Object.keys(formulario).forEach((key) => {
      const valor = formulario[key]
      if (String(valor).trim() === '') {
        nuevosErrores[key] = 'Este campo es obligatorio'
      }
    })
    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  // manejador de submit: previene envío si hay campos vacíos
  // onValid es una función callback que se ejecuta si el formulario es válido
  const manejoSubmit = (e, onValid) => {
    if (e && typeof e.preventDefault === 'function') e.preventDefault()
    const valido = validarCamposVacios()
    if (valido && typeof onValid === 'function') onValid()
    return valido
  }

  return {
    ...formulario,
    formulario,
    errores,
    manejoCambioEntrada,
    manejoReinicio,
    validarCamposVacios,
    manejoSubmit,
  }
}