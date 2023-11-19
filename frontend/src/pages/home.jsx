import React from 'react'

import './home.scss'
import PromoSection from './home/promoSection'
import Tour from './home/tour'

import Destinaton from './home/outstandingDestination'
import Category from './home/category'
import TypesCarousel from './home/tripTypesCarousel'
import UniqueStaysProperties from './home/uniqueStaysProperties'
import HomesGuestsLoveCarousel from './home/homesGuestsLoveCarousel'
import GeniusSignInBanner from './home/geniusSignInBanner'
import BHAwarenessBanner from './home/bHAwarenessBanner'
import Banner from '../components/Header/banner'
import Slinks from './home/slinks'

const home = () => {
  return (
    <>
      <Banner />
      <div className="basic_layout">
        <PromoSection />
        <Tour />
        <Destinaton />
        <TypesCarousel />
        <Category />
        <UniqueStaysProperties />
        {/* <HomesGuestsLoveCarousel /> */}
        <GeniusSignInBanner />
        <BHAwarenessBanner />
        <Slinks />
      </div>
    </>

  )
}

export default home
