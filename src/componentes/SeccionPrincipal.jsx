import { useContext } from 'react'
import { AlmacenActual } from '../context/AlmacenActual'
import { Bienvenida } from './Bienvenida'
import { Dashboard } from './Dashboard.jsx'


export const SeccionPrincipal = () => {

  const { almacenActual } = useContext(AlmacenActual)

  return (
    <main className='flex-1 bg-amber-50'>
      {almacenActual ? <Dashboard /> : <Bienvenida /> }
    </main>
  )
}
