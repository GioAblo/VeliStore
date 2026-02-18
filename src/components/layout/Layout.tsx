import React, { useEffect } from 'react'
import { useLocation, Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import BottomNavbar from './BottomNavbar'
import Footer from './Footer'

const Layout: React.FC = () => {
    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location.pathname])

    return (
        <div className=''>
            <Navbar />
            <main className=''>
                <Outlet />
            </main>
            <BottomNavbar />
            <Footer /> 
        </div>
    )
}

export default Layout
