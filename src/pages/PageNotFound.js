import React from 'react'
import { TbError404 } from 'react-icons/tb'
import { FcCancel } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
  const navigate = useNavigate()
  return (
    <div className='container box'>
      <div className='flexed-container column'>
        <FcCancel className='declined-icon' />
        <h2>Page Not Found</h2>
        <p className='text-center'>The page you are looking for does not exist. Please check the URL or go back.</p>
        <button className="button button-main" onClick={() => navigate(-1)}>Go Back</button>
      </div>
    </div >
  )
}

export default PageNotFound