import { useFetch } from "../hooks/useFetch";

export const ListaContenidos = () => {

  const { data: contenidos, loading, error } = useFetch('contenidos');

  if (loading) return <div className="text-primary-white">Cargando...</div>;
  if (error) return <div className="text-primary-white">Error: {error.message}</div>;

  return (
    <div>
      <div className="flex justify-between px-2 pb-2 border-b gap-12 border-primary-gray/30">
        <span className="text-primary-gray text-lg font-semibold">Grano</span>
        <span className="text-primary-gray text-lg font-semibold">Precio/Kilo</span>
      </div>
      <ul>
        {contenidos && contenidos.map((contenido) => (
          <li key={contenido._id} className="flex justify-between items-center text-primary-white mt-2 px-2 py-1 hover:bg-primary-gray/10 rounded cursor-pointer">
            <span className="hover:underline">{contenido.nombre}</span>
            <span className="text-secondary-green font-medium">${contenido.precioKilo}</span>
          </li>
        ))}
      </ul>
    </div>      
  )
}
