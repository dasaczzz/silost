import { useContext } from "react";
import { useFetch } from "../hooks/useFetch";
import { AlmacenActual } from "../context/AlmacenActual";

export const ListaAlmacenes = () => {
  
  const { setAlmacenActual } = useContext(AlmacenActual)
  const { data: almacenes, loading, error } = useFetch('almacenes');
  
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const clickAlmacen = async (id) => {
    try {
      const response = await fetch(`http://localhost:1880/iot/personal/almacenes/${id}`);
      if (!response.ok) {
        throw new Error('No se pudo obtener la información detallada del almacén');
      }
      const [ almacenDetallado ] = await response.json();
      setAlmacenActual(almacenDetallado);
    } catch (error) {
      console.error("Error al obtener detalles del almacén:", error);
    }
  };

  return (
    <ul>
      {almacenes && almacenes.map((almacen) => (
        <li key={almacen._id} onClick={() => clickAlmacen(almacen._id)} className="text-primary-white mt-2 hover:underline cursor-pointer hover:text-primary-gray">
          {almacen.nombre}
        </li>
      ))}
    </ul>
  )
}
