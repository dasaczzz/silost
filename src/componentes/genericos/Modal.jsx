export const Modal = ({ seMuestra, cerrarModal, titulo, subyacente }) => {
  if (!seMuestra) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
      onClick={cerrarModal}
    >
      <div 
        className="bg-[#1a2936] rounded-2xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#273b48]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">{titulo}</h2>
          <button
            onClick={cerrarModal}
            className="text-gray-400 hover:text-white text-3xl transition"
          >
            &times;
          </button>
        </div>
        <div className="flex justify-center">
          {subyacente}
        </div>
      </div>
    </div>
  )
}