import { useState } from 'react'
import { Sidebar } from './componentes/Sidebar.jsx'
import { AlmacenActual } from './context/AlmacenActual.js'

export const Silost = () => {
  const [almacenActual, setAlmacenActual] = useState(null)

  return (
    <AlmacenActual.Provider value={{almacenActual, setAlmacenActual}}>
      <Sidebar />
    </AlmacenActual.Provider>
  )
}
