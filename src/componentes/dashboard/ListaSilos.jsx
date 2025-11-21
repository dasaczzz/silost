import { useContext, useEffect, useState } from "react";
import { AlmacenActual } from "../../context/AlmacenActual";
import { useFetch } from "../../hooks/useFetch";

export const ListaSilos = () => {

  const { almacenActual } = useContext(AlmacenActual);
  const [ silos, setSilos ] = useState(almacenActual?.silos || []);
  const { data: erroresSilos } = useFetch(`almacenes/${almacenActual?._id}/silos/errores`);
  const [siloExpandido, setSiloExpandido] = useState(null);
  
  
  useEffect(() => { setSilos(almacenActual?.silos || []) }, [ almacenActual ])

  // Función auxiliar para obtener el número de errores de un silo
  const obtenerErroresSilo = (idSilo) => {
    if (!erroresSilos || !Array.isArray(erroresSilos)) return 0;
    const siloConErrores = erroresSilos.find(s => s._id === idSilo);
    return siloConErrores?.errores || 0;
  }

  // Función auxiliar para obtener los detalles de errores de un silo
  const obtenerDetallesErrores = (idSilo) => {
    if (!erroresSilos || !Array.isArray(erroresSilos)) return [];
    const siloConErrores = erroresSilos.find(s => s._id === idSilo);
    return siloConErrores?.detalles || [];
  }

  const toggleDetalles = (idSilo) => {
    setSiloExpandido(siloExpandido === idSilo ? null : idSilo);
  }

  if (!silos || silos.length === 0) {
    return (
      <div className="bg-primary-gray flex flex-col gap-9  items-center justify-center py-10 px-5 rounded-2xl w-1/3">
        <h3 className="text-2xl font-semibold text-primary-black">Silos</h3>
        <p className="text-gray-600 text-center">No hay silos disponibles</p>
        <button className="mt-5 rounded-md border border-primary-black bg-primary-white px-5 py-2.5 font-semibold text-primary-black shadow-sm transition hover:border-none hover:ring-2 hover:ring-primary-400 hover:ring-offset-2">
          CREAR UN SILO
        </button>
      </div>
    );
  }

  return (
    <div className="bg-primary-gray flex flex-col gap-9 items-start py-6 px-5 rounded-2xl w-1/4">
      <h3 className="text-2xl font-semibold text-primary-black">Silos</h3>
      <ul className="flex flex-col items-start gap-7 w-full">
        {silos.map((silo) => {
          const errores = obtenerErroresSilo(silo.idSilo);
          const detallesErrores = obtenerDetallesErrores(silo.idSilo);
          const expandido = siloExpandido === silo.idSilo;
          
          return (
            <li key={silo.id} className="flex flex-col w-full bg-primary-white rounded-lg shadow-md">
              <div className="flex px-3 py-4 justify-between items-center w-full">
                <div className="flex flex-col justify-center items-start gap-2.5">
                  <span className="text-xl font-medium text-primary-black">{silo.idSilo}</span>
                  <span className="text-secondary-green text-lg italic font-medium">{silo.contenido}</span>
                </div>
                <div className="flex flex-col justify-center items-start gap-2.5">
                  <span className="text-xl font-medium text-primary-black">Precio kilo</span>
                  <span className="text-secondary-green text-lg italic font-medium">{silo.precioKilo}</span>
                </div>
                <div className="flex flex-col justify-center items-center gap-2.5">
                  <span className="text-xl font-medium text-primary-black">Errores</span>
                  <span className={`text-lg italic font-medium ${errores > 0 ? 'text-red-500' : 'text-gray-400'}`}>
                    {errores}
                  </span>
                </div>
              </div>

              {/* Botón desplegable solo si hay errores */}
              {errores > 0 && (
                <>
                  <button
                    onClick={() => toggleDetalles(silo.idSilo)}
                    className="w-full px-3 py-2 border-t border-gray-200 text-sm font-medium text-primary-black hover:bg-gray-50 transition flex items-center justify-center gap-2"
                  >
                    {expandido ? '▲ Ocultar detalles' : '▼ Ver detalles de errores'}
                  </button>

                  {/* Panel de detalles expandible */}
                  {expandido && (
                    <div className="px-3 py-3 border-t border-gray-200 bg-gray-50">
                      <div className="space-y-2">
                        {detallesErrores.map((detalle, idx) => (
                          <div key={detalle._id || idx} className="bg-white rounded p-2 text-xs border-l-4 border-red-500">
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <span className="font-semibold">Fecha:</span> {detalle.fecha}
                              </div>
                              <div>
                                <span className="font-semibold">Alerta:</span>{' '}
                                <span className={`font-bold ${
                                  detalle.alerta === 'ROJA' ? 'text-red-600' : 
                                  detalle.alerta === 'AMARILLA' ? 'text-yellow-600' : 
                                  'text-green-600'
                                }`}>
                                  {detalle.alerta}
                                </span>
                              </div>
                              <div>
                                <span className="font-semibold">Peso:</span> {detalle.peso} kg
                              </div>
                              <div>
                                <span className="font-semibold">Humedad:</span> {detalle.porcentajeHumedad}%
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </li>
          );
        })}
      </ul>
      <button className="mt-5 rounded-md border border-primary-black bg-primary-white px-5 py-2.5 font-semibold text-primary-black shadow-sm transition hover:border-none hover:ring-2 hover:ring-primary-400 hover:ring-offset-2">
          CREAR UN SILO
        </button>
    </div>
  )
}
