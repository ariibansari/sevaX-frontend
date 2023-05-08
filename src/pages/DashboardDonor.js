import React, { useContext } from 'react'
import { UserContext } from '../context/UserProvider'
import DonorStats from '../components/DonorStats'
import LatestRequests from '../components/LatestRequests'

const DashboardDonor = () => {
  const [user, setUser] = useContext(UserContext)
  return (
    <div className='container py-5'>
      {/* <h2>Welcome, {user.name}</h2> */}
      <div className='donor-hero'>
        <div className='left'>
          <h3>Transforming Lives through Giving: Be a Part of Something Bigger</h3>
          <p className='subtitle'>Together, we can create a brighter future for those in need. Thank you for your continued support, and let's keep the good going.</p>
        </div>
        <div className='right'>
          <img src='https://media2.giphy.com/media/L4fB9di7ekn3F5PXaW/giphy.gif' alt='donation image' />
        </div>
      </div>
      <DonorStats />
      <LatestRequests />
    </div>
  )
}

export default DashboardDonor