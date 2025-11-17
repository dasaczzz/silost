import InfoAlmacen from './dashboard/InfoAlmacen.jsx'
import { ListaSilos } from './dashboard/ListaSilos.jsx'
import { GraficaPesos } from './dashboard/GraficaPesos.jsx'

export const Dashboard = () => {
  return (
    <div className="flex flex-1 w-full gap-6 p-6">
      <ListaSilos />
      <GraficaPesos />
      <InfoAlmacen />
    </div>
  )
}
