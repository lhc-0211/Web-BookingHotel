
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Header/headerAdminHotel'
import Routers from '../../../../router/Routers'
import '../../../../assets/scss/style.scss'
import { useLocation } from 'react-router-dom'; // Import useLocation từ react-router-dom
import './layout.scss'

const Layout = () => {
    const location = useLocation(); // Sử dụng useLocation để lấy thông tin về URL hiện tại

    // Kiểm tra URL và quyết định xem có hiển thị header hay không
    const shouldDisplay = location.pathname !== '/become-a-host' &&
        location.pathname !== '/become-a-host/create-detail'

    return (
        <div className='layout_page'>
            {shouldDisplay && <Header />} {/* Hiển thị header nếu shouldDisplay là true */}
            <Routers />
            {/* {shouldDisplay && <Footer />} */}

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
