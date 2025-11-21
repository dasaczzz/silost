import { useContext, useState } from "react"
import { useForm } from "../hooks/useForm"
import { Entrada } from "./genericos/Entrada"
import { useFetch } from "../hooks/useFetch"
import { AlmacenActual } from "../context/AlmacenActual"
import { toast } from "sonner"

export const AgregarSilo = ({cerrarModal}) => {

  const { almacenActual } = useContext(AlmacenActual);
  const [cargando, setCargando] = useState(false)
  const { post } = useFetch(`silo`);
  const { data: contenidos } = useFetch('contenidos');
  
  const {idSilo, contenido, manejoCambioEntrada, manejoReinicio, errores, manejoSubmit} = useForm({ 
    idSilo: '',
    contenido: '',
  })

  const manejarEnvio = async (e) => {
    manejoSubmit(e, async () => {
      setCargando(true)
      try {
        const nuevoSilo = {
          "_id": idSilo,
          idAlmacen: almacenActual._id,
          idContenido: contenido
        };

        await post(nuevoSilo);
        toast.success('Silo creado exitosamente')
        
        cerrarModal();
        manejoReinicio();
      } catch (err) {
        console.error("Error al crear el silo:", err);
        toast.error('Error al crear el silo')
      } finally {
        setCargando(false);
      }
    })
  }

  return (
    <form onSubmit={manejarEnvio} className='w-3/4 gap-6'>
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex flex-col gap-4 w-full">
          <Entrada 
            texto="ID del Silo" 
            name="idSilo" 
            value={idSilo} 
            type="text" 
            onChange={manejoCambioEntrada} 
            error={errores.idSilo} 
          />
          
          <label className="flex flex-col w-full items-start gap-2">
            Contenido
            <div className='flex flex-col w-full gap-1'>
              <select
                name="contenido"
                value={contenido}
                onChange={manejoCambioEntrada}
                className={`${errores.contenido ? 'outline-1 outline-red-400': ''} shadow-sm bg-white w-full rounded-md px-4 py-2 text-primary-black focus:outline-1 focus:outline-primary-400`}
              >
                <option value="">Selecciona un contenido</option>
                {contenidos && contenidos.map((cont) => (
                  <option key={cont._id} value={cont._id}>
                    {cont.nombre} - ${cont.precioKilo}/kg
                  </option>
                ))}
              </select>
              {errores.contenido && <span className='text-sm text-red-400'>{errores.contenido}</span>}
            </div>
          </label>
        </div>
      </div>
      <div className="mt-2 flex justify-end">
        <button 
          type='submit' 
          disabled={cargando} 
          className="rounded-md py-2 px-4 cursor-pointer bg-primary-400 text-primary-white hover:bg-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {cargando ? 'Guardando...' : 'Aceptar'}
        </button>
      </div>
    </form>
  )
}
