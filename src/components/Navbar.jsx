import React from 'react'

const Navbar = () => {
    return (
        <nav className='z-50 w-full z-12 fixed bg-slate-800 text-white'>
            <div className="w-4xl mycontainer flex justify-between items-center px-4 py-5 h-14 position-sticky">

                <div className="logo font-bold text-white text-2xl">
                    <span className='text-green-500'> &lt;</span>

                    <span>Pass</span><span className='text-green-500'>Man/&gt;</span>


                </div>
                {/* <ul>
                    <li className='flex gap-4 '>
                        <a className='hover:font-bold' href='/'>Home</a>
                        <a className='hover:font-bold' href='#'>About</a>
                        <a className='hover:font-bold' href='#'>Contact</a>
                    </li>
                </ul> */}
                <button className='text-white bg-green-700 my-5 mx-2 rounded-full flex  justify-between items-center ring-white ring-1'>
                    <img className='invert  w-10 p-1' src="/icons/github-mark-white.svg" alt="github logo" />
                    <span className='font-bold px-2'>
                        <a href="https://github.com/T1A0R3S2H" target="_blank" rel="noopener noreferrer">GitHub</a>
                    </span>


                </button>
            </div>
        </nav>
    )
}

export default Navbar