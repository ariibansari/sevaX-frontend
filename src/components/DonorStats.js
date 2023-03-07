import React from 'react'
import { FaBoxOpen } from 'react-icons/fa'
import { RiTruckFill } from 'react-icons/ri'
import { BsFillClockFill } from 'react-icons/bs'

const DonorStats = () => {
  return (
    <div className='donor-stats-container'>
      <div className='stat stat1'>
        <div className='footer'>
          Total Listed Items
          <FaBoxOpen />
        </div>
        <div className='body'>
          {/* <FaBoxOpen /> */}
          <p className='stat-data'>20 <span>items</span></p>
        </div>
      </div>
      <div className='stat stat2'>
        <div className='footer'>
          Pending Delivery
          <BsFillClockFill />
        </div>
        <div className='body'>
          {/* <BsFillClockFill /> */}
          <p className='stat-data'>4 <span>deliveries</span></p>
        </div>
      </div>
      <div className='stat stat3'>
        <div className='footer'>
          Items Donated
          <RiTruckFill />
        </div>
        <div className='body'>
          {/* <RiTruckFill /> */}
          <p className='stat-data'>13 <span>items</span></p>
        </div>
      </div>
    </div>
  )
}

export default DonorStats