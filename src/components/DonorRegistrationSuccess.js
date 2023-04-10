import React from 'react'
import { NavLink } from 'react-router-dom'
import regSuccessGif from "../assets/registrationSuccess.gif"

const DonorRegistrationSuccess = () => {
    return (
        <>
            <img style={{ width: "50%" }} src={regSuccessGif} />
            <h2>Registration Success</h2>
            <p className='text-center'>Congratulations! You have successfully registered as a donor. You can now start making a positive impact in the world by donating items to those in need. You can access your account with your credentials</p>
            <NavLink className='button' to="/login">Continue to Login</NavLink>
        </>
    )
}

export default DonorRegistrationSuccess