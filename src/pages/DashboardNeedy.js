import React from 'react'
import { NavLink } from 'react-router-dom'
import ItemsListNeedyView from '../components/ItemsListNeedyView'
import NeedyStats from '../components/NeedyStats'
import NewItems from '../components/NewItems'

const DashboardNeedy = () => {
  return (
    <div className='container py-5'>
      {/* <h2>Welcome, {user.name}</h2> */}
      <div className='donor-hero'>
        <div className='left'>
          <h3>Your Journey to Hope:A brighter tomorrow starts with your first step today.</h3>
          <p className='subtitle'>The measure of a society is found in how they treat their weakest and most helpless citizens.</p>
        </div>
        <div className='right'>
          <img
            src='https://media2.giphy.com/media/L4fB9di7ekn3F5PXaW/giphy.gif'
            alt='donation image'
          />
        </div>
      </div>
      <NeedyStats />
      <div className='recent-items-container'>
        <div className='header'>
          <h3>New Items</h3>
          <NavLink to='/all-items'>show all</NavLink>
        </div>
        <ItemsListNeedyView limit='3' />
      </div>
    </div>
  )
}

export default DashboardNeedy