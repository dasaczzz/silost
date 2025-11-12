import { useContext } from 'react'
import { AlmacenActual } from '../context/AlmacenActual'
import { Bienvenida } from './Bienvenida'
import { Dashboard } from './Dashboard.jsx'


export const SeccionPrincipal = () => {

  const { almacenActual } = useContext(AlmacenActual)

  return (
    <main className='w-full'>
      {almacenActual ? <Dashboard /> : <Bienvenida /> }
    </main>
  )
}
