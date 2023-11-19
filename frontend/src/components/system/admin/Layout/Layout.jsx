
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Header/Header'
import Routers from '../../../../router/Routers'
import '../../../../assets/scss/style.scss'
import './layout.scss'

const Layout = () => {
    return (
        <div className='layout_page'>
            <Header />
            <Routers />

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    )
}

export default Layout
