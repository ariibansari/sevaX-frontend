import React from 'react'
import { FaBoxOpen } from 'react-icons/fa'
import { RiTruckFill } from 'react-icons/ri'
import { BsFillClockFill } from 'react-icons/bs'
import { BsFillFileEarmarkArrowUpFill, BsFillFileEarmarkCheckFill } from 'react-icons/bs'

const NeedyStats = () => {
  return (
    <div className='donor-stats-container'>
      <div className='stat stat1'>
        <div className='footer'>
          Total Applied Items
          <BsFillFileEarmarkArrowUpFill />
        </div>
        <div className='body'>
          {/* <FaBoxOpen /> */}
          <p className='stat-data'>20 <span>items</span></p>
        </div>
      </div>
      <div className='stat stat2'>
        <div className='footer'>
          Application Pending
          <BsFillClockFill />
        </div>
        <div className='body'>
          {/* <BsFillClockFill /> */}
          <p className='stat-data'>4 <span>items</span></p>
        </div>
      </div>
      <div className='stat stat3'>
        <div className='footer'>
          Item Received
          <BsFillFileEarmarkCheckFill />
        </div>
        <div className='body'>
          {/* <RiTruckFill /> */}
          <p className='stat-data'>13 <span>items</span></p>
        </div>
      </div>
    </div>
  )
}

export default NeedyStats