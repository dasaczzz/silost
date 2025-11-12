import silost from '../../public/silost.svg'

export const Bienvenida = () => {
  return (
    <div className="flex h-screen items-center w-screen justify-between ">
      <div className="flex gap-8">        
        <img src={silost} alt="Silost Logo" className="w-80 h-auto" />
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-4xl font-bold text-primary-black">Bienvenido a Silost</h1>
            <p className="text-lg text-gray-600">
              Aplicación para la gestión de almacenes y contenidos por medio de sensores IoT en silos de almacenamiento.
            </p>
          </div>
          <div className=" rounded-lg border p-6">
            <p className="font-semibold"> Nuevo usando esta plataforma y no tiene almacen?</p>
            <p className="text-gray-700">Para comenzar, Agregue un almacen con todos sus datos, lo selecciona y podra empezar a monitorizarlo al instante.</p>
            <button className="mt-5 rounded-md border border-primary-black bg-primary-white px-5 py-2.5 font-semibold text-primary-black shadow-sm transition hover:border-none hover:ring-2 hover:ring-primary-400 hover:ring-offset-2">
              CREAR UN ALMACEN
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
