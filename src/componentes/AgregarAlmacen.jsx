import { useContext, useState } from "react"
import { useForm } from "../hooks/useForm"
import { Entrada } from "./genericos/Entrada"
import { useFetch } from "../hooks/useFetch"
import { AlmacenActual } from "../context/AlmacenActual"
import { toast } from "sonner"

export const AgregarAlmacen = ({cerrarModal}) => {

  const { setAlmacenActual } = useContext(AlmacenActual);
  const [cargando, setCargando] = useState(false)
  const { post } = useFetch('almacen');
  const {almacen, direccion, latitud, longitud, manejoCambioEntrada, manejoReinicio, errores, manejoSubmit} = useForm({ 
    almacen: '',
    direccion: '',
    latitud: '',
    longitud: '',
  })

  const manejarEnvio = async (e) => {
    // usamos manejoSubmit del hook: previene envío si hay campos vacíos
    manejoSubmit(e, async () => {
      setCargando(true)
      try {
        const latitudInt = parseInt(latitud);
        const longitudInt = parseInt(longitud);
        const nuevoAlmacen = {
          nombre: almacen,
          ubicacion: {
            direccion,
            latitud: latitudInt,
            longitud: longitudInt
          }
        };

        const almacenAgregado = await post(nuevoAlmacen);
        console.log(almacenAgregado);

        setAlmacenActual(almacenAgregado[0]);
        toast.success('Contenido guardado exitosamente')

        cerrarModal();
        manejoReinicio();
      } catch (err) {
        console.error("Error al crear el almacén:", err);
      } finally {
        setCargando(false);
      }
    })
  }

  return (
    <form onSubmit={manejarEnvio} className='w-3/4 gap-6'>
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex flex-col gap-4 w-full">
          <Entrada texto="Almacen" name="almacen" value={almacen} type="text" onChange={manejoCambioEntrada} error={errores.almacen} />
          <div className="w-full border border-primary-500 rounded-lg p-4 bg-primary-300/20">
            <h3 className="text-lg font-semibold mb-2">Ubicación</h3>
            <div className="flex flex-col gap-3">
              <Entrada texto="Dirección" name="direccion" value={direccion} type="text" onChange={manejoCambioEntrada} error={errores.direccion} />
              <div className="flex gap-3">
                <div className="flex-1">
                  <Entrada texto="Latitud" name="latitud" value={latitud} type="number" onChange={manejoCambioEntrada} error={errores.latitud} />
                </div>
                <div className="flex-1">
                  <Entrada texto="Longitud" name="longitud" value={longitud} type="number" onChange={manejoCambioEntrada} error={errores.longitud} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2 flex justify-end">
        <button type='submit' disabled={cargando} className="rounded-md py-2 px-4 cursor-pointer bg-primary-400 text-primary-white hover:bg-primary-500">Aceptar</button>
      </div>
    </form>
  )
}