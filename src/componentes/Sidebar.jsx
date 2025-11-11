import { ListaAlmacenes } from "./ListaAlmacenes"

export const Sidebar = () => {
  return (
    <div className='flex flex-col w-80 h-screen bg-primary-black py-10 px-3 gap-2'>
      <div className='flex flex-col items-center justify-center gap-4'>
        <h2 className="text-4xl text-primary-white font-bold">Almacenes</h2>
        <ListaAlmacenes/>
        <button className="rounded-md py-2 px-4 cursor-pointer bg-primary-400 text-primary-white hover:bg-primary-500">Agregar almacen</button>
      </div>
    </div>
  )
}
