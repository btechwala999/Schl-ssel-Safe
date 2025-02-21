import React from 'react'
import './Navbar.css'

const Navbar = () => {
    return (
        <nav className='' >
            <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">

                <div className='logo font-bold text-white'>
                <span className='text-purple-900'>
                    &lt;
                    </span>
                    SchlüsselSAFE 
                    <span className='text-purple-900'>
                    /&gt;
                    </span>
                </div> 
                <div className='flex gap-2'>
                    <button className='bg-purple-900 bt text-white py-1 px-2 font-semibold rounded-lg hover:bg-white hover:text-purple-900'>Login</button>
                    <button className='bg-purple-900 text-white bt py-1 px-2 font-semibold rounded-lg hover:bg-white hover:text-purple-900 ml-4'>Sign Up</button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar