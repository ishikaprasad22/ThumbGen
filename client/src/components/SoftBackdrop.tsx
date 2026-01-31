

const SoftBackdrop = () => {
  return (
            <div className='fixed inset-0 -z-1 pointer-events-none'>
                <div className='absolute left-1/2 top-20 -translate-x-1/2 w-245 h-115 bg-gradient-to-tr from-pink-700/40 via-purple-600/25 to-indigo-600/20 rounded-full blur-3xl' />
                <div className='absolute right-12 bottom-10 w-105 h-55 bg-gradient-to-bl from-purple-700/35 via-indigo-600/20 to-pink-600/15 rounded-full blur-2xl' />
            </div>
  )
}

export default SoftBackdrop
