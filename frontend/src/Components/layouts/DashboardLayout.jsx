import React, { useContext } from 'react'
import { UserContext } from '../../Context/UserContext'
import Navbar from './Navbar';

const DashboardLayout = ({children}) => {

    const {user} = useContext(UserContext);
  return (
    <div >
        <Navbar />

        {user && <div className='p-4'>
            {children}
        </div>}
    </div>
)
}

export default DashboardLayout