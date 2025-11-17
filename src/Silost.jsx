import { useState } from 'react'
import { Sidebar } from './componentes/genericos/Sidebar.jsx'
import { AlmacenActual } from './context/AlmacenActual.js'
import { SeccionPrincipal } from './componentes/SeccionPrincipal.jsx'
import { Navbar } from './componentes/genericos/Navbar.jsx'

export const Silost = () => {
  const [almacenActual, setAlmacenActual] = useState(null)

  return (
    <AlmacenActual.Provider value={{almacenActual, setAlmacenActual}}>
      <Navbar />
      <div className="flex">  
        <Sidebar />
        <SeccionPrincipal />
      </div>
    </AlmacenActual.Provider>
  )
}
