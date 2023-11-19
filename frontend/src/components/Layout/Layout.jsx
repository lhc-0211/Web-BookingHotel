
import React from 'react'
import { useLocation } from 'react-router-dom'; // Import useLocation từ react-router-dom
import Routers from '../../router/Routers'
import '../../assets/scss/style.scss'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { ToastContainer, toast } from 'react-toastify';

const Layout = () => {
    const location = useLocation(); // Sử dụng useLocation để lấy thông tin về URL hiện tại

    // Kiểm tra URL và quyết định xem có hiển thị header hay không
    const shouldDisplay = location.pathname !== '/404' &&
        location.pathname !== '/login' &&
        location.pathname !== '/register' &&
        location.pathname !== '/registerCompany' &&
        location.pathname !== '/become-a-host' &&
        location.pathname !== '/become-a-host/create-detail' &&
        location.pathname !== '/hoteladmin/home'


        ; // Thay đổi các đường dẫn theo nhu cầu của bạn; // Thay đổi '/404' thành đường dẫn 404 cụ thể của bạn

    return (
        <>
            <div
                style={{
                    margin: '0 auto',
                }}
            >
                {shouldDisplay && <Header />} {/* Hiển thị header nếu shouldDisplay là true */}
                <Routers />
                {shouldDisplay && <Footer />}

            </div>
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
        </>

    )
}

export default Layout
