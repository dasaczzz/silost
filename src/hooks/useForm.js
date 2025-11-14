import { useState } from 'react'

export const useForm = (formularioInicial) => {

  const [formulario, setFormulario] = useState(formularioInicial)

  // obtener y setear los valores del formulario
  const manejoCambioEntrada = (e) => {
    const {name, value} = e.target
    setFormulario({
      ...formulario,
      [name]: value
    })
  }

  // set the form blank
  const manejoReinicio = () => {
    setFormulario(formularioInicial)
  }

  return {
    ...formulario,
    formulario,
    manejoCambioEntrada,
    manejoReinicio,
  }
}