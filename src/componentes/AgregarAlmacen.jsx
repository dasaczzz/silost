import { useState } from "react"
import { useForm } from "../hooks/useForm"
import { Entrada } from "./genericos/Entrada"

export const RegisterForm = ({cerrarModal}) => {

  const [loading, setLoading] = useState(false)

  const {almacen, direccion, latitud, longitud, manejoCambioEntrada, manejoReinicio} = useForm({
    almacen: '',
    direccion: '',
    latitud: '',
    longitud: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='w-2/3 flex flex-col gap-4'>
      <Entrada name="almacen" value={almacen} type="text" onChange={manejoCambioEntrada}></Entrada>
        <Input type='text' text='Correo electrónico' onChange={handleInputChange} error={errors.email} placeholder='ejemplo@mail.com' name='email' value={email}/>
        <Input type='number' text='Telefono' onChange={handleInputChange} error={errors.phone} placeholder='300 1234567' name='phone' value={phone}/>
        <div className='flex justify-between gap-3 items-center'>
          <Input type={showPassword ? 'text' : 'password'} text='Contraseña' error={errors.password} onChange={handleInputChange} placeholder='Tu contraseña' name='password' value={password}/>
          <button type='button' onClick={handleToggleShow}>{showPassword ? <FaEyeSlash size={24}/> : <FaEye size={24}/>}</button>
        </div>
        <Input type='password' text='Confirma tu contraseña' error={errors.confirm} onChange={handleInputChange} placeholder='Tu contraseña otra vez' name='confirm' value={confirm}/>
        <Button intent='primary' type='submit' disabled={loading}>Registrarme</Button>
      </form>
    </>
  )
}