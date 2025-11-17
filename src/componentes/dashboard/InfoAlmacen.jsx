import { useContext, useEffect, useState } from "react"
import { AlmacenActual } from "../../context/AlmacenActual"

export const InfoAlmacen = () => {
  const { almacenActual } = useContext(AlmacenActual)
  const [totalMediciones, setTotalMediciones] = useState(0)

  useEffect(() => {
    if (!almacenActual) {
      setTotalMediciones(0)
      return
    }

    let total = 0
    // Si el almacén tiene un array de mediciones
    if (Array.isArray(almacenActual.mediciones)) total += almacenActual.mediciones.length

    // Si los silos tienen mediciones, contarlas también
    if (Array.isArray(almacenActual.silos)) {
      almacenActual.silos.forEach((s) => {
        if (Array.isArray(s.mediciones)) total += s.mediciones.length
      })
    }

    setTotalMediciones(total)
  }, [almacenActual])

  if (!almacenActual) return null

  const { direccion, latitud, longitud } = almacenActual

  return (
    <div className="bg-primary-gray flex flex-col gap-4 items-start py-6 px-5 rounded-2xl w-1/4">
      <h3 className="text-2xl font-semibold text-primary-black">Información</h3>

      <div className="text-sm text-primary-black w-full">
        <div className="flex justify-between">
          <span className="font-medium">Dirección</span>
          <span>{direccion ?? '—'}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Latitud</span>
          <span>{latitud ?? '—'}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Longitud</span>
          <span>{longitud ?? '—'}</span>
        </div>
      </div>

      <div className="w-full pt-2 border-t border-primary-200">
        <div className="flex items-center justify-between w-full">
          <span className="font-medium">Total de mediciones</span>
          <span className="text-secondary-green font-semibold">{totalMediciones}</span>
        </div>
      </div>
    </div>
  )
}

export default InfoAlmacen
