import React from 'react'
import Menu from './menu'
import HeaderNavigation from './headerNavigation'
import './headerAdminHotel.scss'

const Header = () => {
    return (
        <>
            <header className='header'>
                <div className="nav_header">
                    <Menu />
                    <HeaderNavigation />
                </div>
            </header>


        </>

    )
}

export default Header
