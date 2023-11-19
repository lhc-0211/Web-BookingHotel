import React from 'react'
import Menu from './menu'
import Extension from './extension'
import './Header.scss'

const Header = () => {
    return (
        <>
            <header className='header'>
                <div className="nav_header">
                    <Menu />
                    <Extension />
                </div>
            </header>


        </>

    )
}

export default Header
