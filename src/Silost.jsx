import { useState } from 'react'
import { Sidebar } from './componentes/genericos/Sidebar.jsx'
import { AlmacenActual } from './context/AlmacenActual.js'
import { SeccionPrincipal } from './componentes/SeccionPrincipal.jsx'

export const Silost = () => {
  const [almacenActual, setAlmacenActual] = useState(null)

  return (
    <AlmacenActual.Provider value={{almacenActual, setAlmacenActual}}>
      <div className="flex min-h-screen">  
        <Sidebar />
        <SeccionPrincipal />
      </div>
    </AlmacenActual.Provider>
  )
}
