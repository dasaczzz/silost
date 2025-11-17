import { useContext, useEffect } from "react"
import { AlmacenActual } from "../../context/AlmacenActual"

export const InfoAlmacen = () => {
  const { almacenActual } = useContext(AlmacenActual)

  useEffect(() => {
    if (!almacenActual) {
      return
    }

  }, [almacenActual])

  const { nombre, ubicacion, totalMediciones } = almacenActual

  return (
    <div className="bg-primary-gray flex  flex-col gap-4 items-start py-6 px-5 rounded-2xl w-1/3 h-1/2">
      <h3 className="text-3xl font-bold text-secondary-green">{`Información de ${nombre}`}</h3>

      <div className="text-md text-primary-black w-full">
        <div className="flex justify-between">
          <span className="font-medium text">Dirección</span>
          <span>{ubicacion.direccion ?? '—'}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Latitud</span>
          <span>{ubicacion.latitud ?? '—'}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Longitud</span>
          <span>{ubicacion.longitud ?? '—'}</span>
        </div>
      </div>

      <div className="w-full pt-2 border-t border-primary-200">
        <div className="flex items-center justify-between w-full">
          <span className="font-medium text-lg">Total de mediciones</span>
          <span className="text-secondary font-bold text-2xl">{totalMediciones}</span>
        </div>
      </div>
    </div>
  )
}

export default InfoAlmacen
