import { useContext } from "react";
import { useFetch } from "../hooks/useFetch";
import { AlmacenActual } from "../context/AlmacenActual";

export const ListaAlmacenes = () => {

  const { setAlmacenActual } = useContext(AlmacenActual)

  const { data, loading, error } = useFetch('almacenes');
  if (loading) return <div>Cargando...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {data && data.map((almacen) => (
        <li key={almacen._id} onClick={() => setAlmacenActual(almacen)} className="text-primary-white mt-2 hover:underline cursor-pointer hover:text-primary-gray">
          {almacen.nombre}
        </li>
      ))}
    </ul>
  )
}
