import { useContext, useEffect, useState } from "react";
import { AlmacenActual } from "../../context/AlmacenActual";
import { useFetch } from "../../hooks/useFetch";

export const ListaSilos = () => {

  const { almacenActual } = useContext(AlmacenActual);
  const [ silos, setSilos ] = useState(almacenActual?.silos || []);
  const [ expandedSilo, setExpandedSilo ] = useState(null);
  const { data: medicionesErroneas } = useFetch(almacenActual ? `almacenes/${almacenActual._id}/medicionesErroneas` : '');
  
  useEffect(() => { setSilos(almacenActual?.silos || []) }, [ almacenActual ])

  // Helper function to get error data for a specific silo
  const getErrorDataForSilo = (idSilo) => {
    if (!medicionesErroneas || !almacenActual) return null;
    return medicionesErroneas.find(item => item._id === idSilo);
  };

  const toggleExpanded = (idSilo) => {
    setExpandedSilo(expandedSilo === idSilo ? null : idSilo);
  };

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
      <ul className="flex flex-col items-start gap-4 w-full">
        {silos.map((silo) => {
          const errorData = getErrorDataForSilo(silo.idSilo);
          const isExpanded = expandedSilo === silo.idSilo;
          
          return (
            <li key={silo.id} className="flex flex-col w-full bg-primary-white rounded-lg shadow-md overflow-hidden">
              <div className="flex px-3 py-4 justify-between items-center w-full">
                <div className="flex flex-col justify-center items-start gap-2.5">
                  <span className="text-xl font-medium text-primary-black">{silo.idSilo}</span>
                  <span className="text-secondary-green text-lg italic font-medium">{silo.contenido}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col justify-center items-end gap-1">
                    <span className="text-sm font-medium text-gray-600">Precio kilo</span>
                    <span className="text-secondary-green text-lg font-semibold">${silo.precioKilo}</span>
                  </div>
                  {errorData && (
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-sm font-medium text-gray-600">Errores</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-lg font-bold ${errorData.errores > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {errorData.errores}
                        </span>
                        {errorData.errores > 0 && (
                          <button 
                            onClick={() => toggleExpanded(silo.idSilo)}
                            className="text-gray-500 hover:text-gray-700 transition-transform"
                            style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                          >
                            ▼
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Collapsible error details */}
              {isExpanded && errorData && errorData.detalles && errorData.detalles.length > 0 && (
                <div className="px-3 pb-4 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-700 mt-3 mb-2">Mediciones Erróneas:</h4>
                  <div className="max-h-64 overflow-y-auto space-y-2">
                    {errorData.detalles.map((detalle) => (
                      <div key={detalle._id} className="bg-gray-50 p-3 rounded text-sm border-l-4" 
                           style={{ borderLeftColor: detalle.alerta === 'ROJA' ? '#DC2626' : detalle.alerta === 'AMARILLA' ? '#F59E0B' : '#10B981' }}>
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-medium text-gray-700">{detalle.fecha}</span>
                          <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                            detalle.alerta === 'ROJA' ? 'bg-red-100 text-red-700' : 
                            detalle.alerta === 'AMARILLA' ? 'bg-yellow-100 text-yellow-700' : 
                            'bg-green-100 text-green-700'
                          }`}>
                            {detalle.alerta}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-gray-600">
                          <div>
                            <span className="font-medium">Peso:</span> {detalle.peso} kg
                          </div>
                          <div>
                            <span className="font-medium">Humedad:</span> {detalle.porcentajeHumedad}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  )
}
