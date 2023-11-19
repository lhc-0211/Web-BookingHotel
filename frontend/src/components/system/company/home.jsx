
import React from 'react'
import './home.scss'
import ExtPageHeader from './pages/extPageHeader'
import ListHotel from './pages/listHotel'
import TabNav from './pages/tabNav'

const HomeAdmin = () => {
    return (
        <>
            <div className="basic_layout">
                <ExtPageHeader />
                {/* <ListHotel /> */}
                <TabNav />
            </div>
        </>

    )
}

export default HomeAdmin
