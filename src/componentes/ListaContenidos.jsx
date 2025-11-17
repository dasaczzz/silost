import { useFetch } from "../hooks/useFetch";

export const ListaContenidos = () => {

  const { data: contenidos, loading, error } = useFetch('contenidos');

  if (loading) return <div className="text-primary-white">Cargando...</div>;
  if (error) return <div className="text-primary-white">Error: {error.message}</div>;

  return (
    <ul>
      {contenidos && contenidos.map((contenido) => (
        <li key={contenido._id} className="text-primary-white mt-2 hover:underline cursor-pointer hover:text-primary-gray">
          {contenido.nombre}
        </li>
      ))}
    </ul>      
  )
}
