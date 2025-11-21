import { useState } from "react"
import { useForm } from "../hooks/useForm"
import { Entrada } from "./genericos/Entrada"
import { useFetch } from "../hooks/useFetch"
import { toast } from "sonner"

export const AgregarContenido = ({cerrarModal}) => {

  const [cargando, setCargando] = useState(false)
  const { post } = useFetch('contenido');
  const {grano, precioKilo, manejoCambioEntrada, manejoReinicio, errores, manejoSubmit} = useForm({ 
    grano: '',
    precioKilo: '',
  })

  const manejarEnvio = async (e) => {
    // usamos manejoSubmit del hook: previene envío si hay campos vacíos
    manejoSubmit(e, async () => {
      setCargando(true)
      try {
        const nuevoContenido = {
          nombre: grano,
          precioKilo: parseFloat(precioKilo),
        };

        await post(nuevoContenido);
        toast.success('Contenido guardado exitosamente')
        
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
          <Entrada texto="Grano" name="grano" value={grano} type="text" onChange={manejoCambioEntrada} error={errores.grano} />
          <Entrada texto="Precio por kilo" name="precioKilo" value={precioKilo} type="text" onChange={manejoCambioEntrada} error={errores.precioKilo} />
        </div>
      </div>
      <div className="mt-2 flex justify-end">
        <button type='submit' disabled={cargando} className="rounded-md py-2 px-4 cursor-pointer bg-primary-400 text-primary-white hover:bg-primary-500">Aceptar</button>
      </div>
    </form>
  )
}
