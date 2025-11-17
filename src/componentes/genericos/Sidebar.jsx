import { useState } from "react"
import { ListaAlmacenes } from "../ListaAlmacenes"
import { ListaContenidos } from "../ListaContenidos"
import { Modal } from "./Modal"
import { AgregarAlmacen } from "../AgregarAlmacen"
import { AgregarContenido } from "../AgregarContenido"

export const Sidebar = () => {

  const [openAlmacen, setOpenAlmacen] = useState(false)
  const [openContenido, setOpenContenido] = useState(false)

  // controls for almacen modal
  const manejarMostrarModalAlmacen = () => { setOpenAlmacen(true) }
  const manejarCerrarModalAlmacen = () => { setOpenAlmacen(false) }

  // controls for contenido modal
  const manejarMostrarModalContenido = () => { setOpenContenido(true) }
  const manejarCerrarModalContenido = () => { setOpenContenido(false) }

  return (
    <div className='flex flex-col w-80  bg-primary-black py-10 px-3 gap-8'>
      <div className='flex flex-col items-center justify-center gap-4'>
        <h2 className="text-4xl text-primary-white font-bold">Almacenes</h2>
        <ListaAlmacenes/>
        <button onClick={manejarMostrarModalAlmacen} className="rounded-md py-2 px-4 cursor-pointer bg-primary-400 text-primary-white hover:bg-primary-500">Agregar almacen</button>
      </div>
      <div className='flex flex-col items-center justify-center gap-4'>
        <h2 className="text-4xl text-primary-white font-bold">Contenidos</h2>
        <ListaContenidos/>
        <button onClick={manejarMostrarModalContenido} className="rounded-md py-2 px-4 cursor-pointer bg-primary-400 text-primary-white hover:bg-primary-500">Agregar contenido</button>
      </div>
      {openAlmacen && (
          <Modal titulo="Agregar almacen" seMuestra={openAlmacen} cerrarModal={manejarCerrarModalAlmacen}>
            <AgregarAlmacen cerrarModal={manejarCerrarModalAlmacen} />
          </Modal>
        )}
      {openContenido && (
          <Modal titulo="Agregar contenido" seMuestra={openContenido} cerrarModal={manejarCerrarModalContenido}>
            <AgregarContenido cerrarModal={manejarCerrarModalContenido} />
          </Modal>
        )}
    </div>
  )
}
