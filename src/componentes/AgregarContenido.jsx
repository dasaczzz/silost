import { useState } from "react"
import { useForm } from "../hooks/useForm"
import { Entrada } from "./genericos/Entrada"
import { useFetch } from "../hooks/useFetch"

export const AgregarContenido = ({cerrarModal}) => {

  const [cargando, setCargando] = useState(false)
  const { post } = useFetch('contenido');
  const {nombre, descripcion, manejoCambioEntrada, manejoReinicio, errores, manejoSubmit} = useForm({ 
    nombre: '',
    descripcion: '',
  })

  const manejarEnvio = async (e) => {
    // usamos manejoSubmit del hook: previene envío si hay campos vacíos
    manejoSubmit(e, async () => {
      setCargando(true)
      try {
        const nuevoContenido = {
          nombre,
          descripcion
        };

        await post(nuevoContenido);
        
        cerrarModal();
        manejoReinicio();
      } catch (err) {
        console.error("Error al crear el contenido:", err);
      } finally {
        setCargando(false);
      }
    })
  }

  return (
    <form onSubmit={manejarEnvio} className='w-3/4 gap-6'>
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex flex-col gap-4 w-full">
          <Entrada texto="Nombre" name="nombre" value={nombre} type="text" onChange={manejoCambioEntrada} error={errores.nombre} />
          <Entrada texto="Descripción" name="descripcion" value={descripcion} type="text" onChange={manejoCambioEntrada} error={errores.descripcion} />
        </div>
      </div>
      <div className="mt-2 flex justify-end">
        <button type='submit' disabled={cargando} className="rounded-md py-2 px-4 cursor-pointer bg-primary-400 text-primary-white hover:bg-primary-500">Aceptar</button>
      </div>
    </form>
  )
}
