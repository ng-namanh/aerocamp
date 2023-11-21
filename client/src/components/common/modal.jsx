import PropTypes from 'prop-types'

function Modal({ onChange, deleteCampground }) {
  return (
    <div className='fixed z-10 inset-0 overflow-y-auto'>
      <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
        <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
          <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
        </div>

        <span
          className='hidden sm:inline-block sm:align-middle sm:h-screen'
          aria-hidden='true'
        >
          &#8203;
        </span>

        <div
          className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full'
          role='dialog'
          aria-modal='true'
          aria-labelledby='modal-headline'
        >
          <div className='flex flex-col w-full'>
            <div className='px-4 py-3 sm:px-6 flex sm:flex-row-reverse items-center justify-center w-full text-lg'>
              <button
                className='border-none p-2 w-full'
                onClick={deleteCampground}
              >
                Delete
              </button>
            </div>
            <div className=' px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse items-center justify-center border-black border-y-2 text-lg'>
              <button className=' border-none p-2 w-full'>Edit</button>
            </div>
            <div className='px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse items-center justify-center text-lg'>
              <button
                className=' border-none p-2 w-full'
                onClick={() => onChange(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
Modal.propTypes = {
  onChange: PropTypes.func.isRequired,
  deleteCampground: PropTypes.func
}
export default Modal
