import React from 'react'
import { BiTargetLock } from 'react-icons/bi';
import { FiSettings } from 'react-icons/fi';

interface NavigationProps {
   setOpenSettings: (valiue: boolean) => void
}

const Navigation: React.FC<NavigationProps> = ({ setOpenSettings}) => {

  return (
    <nav className="flex justify-between pt-5 text-white w-11/12 mx-auto">
      <div className='flex items-center gap-1 cursor-pointer'>
        <BiTargetLock className="text-2xl "/>
        <h1>PomoTimer</h1>
      </div>
      <FiSettings className="text-2xl cursor-pointer" onClick={() => setOpenSettings(true)}/>
    </nav>
  )
}

export default Navigation