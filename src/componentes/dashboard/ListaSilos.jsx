import { useContext, useEffect, useState } from "react";
import { AlmacenActual } from "../../context/AlmacenActual";

export const ListaSilos = () => {

  const { almacenActual } = useContext(AlmacenActual);
  const [ silos, setSilos ] = useState(almacenActual?.silos || []);
  
  useEffect(() => { setSilos(almacenActual?.silos || []) }, [ almacenActual ])

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
        {silos.map((silo) => (
          <li key={silo.id} className="flex px-3 py-4 justify-between items-center w-full bg-primary-white rounded-lg shadow-md">
            <div className="flex flex-col justify-center items-start gap-2.5">
              <span className="text-xl font-medium text-primary-black">{silo.idSilo}</span>
              <span className="text-secondary-green text-lg italic font-medium">{silo.contenido}</span>
            </div>
            <div className="flex flex-col justify-center items-start gap-2.5">
              <span className="text-xl font-medium text-primary-black">Precio kilo</span>
              <span className="text-secondary-green text-lg italic font-medium">{silo.precioKilo}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
