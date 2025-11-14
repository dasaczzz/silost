export const Modal = ({ seMuestra, cerrarModal, titulo, children }) => {
  return (
    <dialog className={`${ seMuestra ? 'flex' : 'hidden'} h-full w-full rounded shadow bg-primary-black/70 justify-center items-center`}>
      <div className='w-1/3 bg-primary-gray rounded-md px-6 pt-6 pb-12 flex flex-col items-center gap-8'>
        <div className='flex justify-between w-full'>
          <h4 className='text-pretty text-4xl font-bold'>{titulo}</h4>
          <button className='text-red-400' onClick={() => { cerrarModal() }}>
            <span className="text-4xl font-bold font-mono">x</span>
          </button>
        </div>
        {children}
        </div>
      </dialog>
  )
}