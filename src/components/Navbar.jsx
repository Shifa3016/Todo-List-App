import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-around bg-purple-900 text-white font-bold text-xl p-2'>
      <div className='flex items-center'><img src="/iTask.svg" alt="" />iTask</div>
      <div>
        <ul className='flex space-x-12'>
            <li>Home</li>
            <li>Tasks</li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
