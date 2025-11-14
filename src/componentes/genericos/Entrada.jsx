export const Input = ({text, error, ...props}) => {
  return (
    <label className="flex flex-col w-full items-start gap-2">
      {text}
      <div className='flex flex-col w-full gap-1'>
        <input className={`${error ? 'outline-1 outline-red-400': ''}  shadow-sm bg-white w-full rounded-md px-4 py-2 text-primary-black  focus:outline-1 focus:outline-primary-400`} {...props}/>
        {error && <span className='text-sm text-red-400'>{error}</span >}
      </div>
    </label>
  )
}