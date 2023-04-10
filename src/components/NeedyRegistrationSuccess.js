import React from 'react'
import { NavLink } from 'react-router-dom'
import regSuccessGif from "../assets/registrationSuccess.gif"

const NeedyRegistrationSuccess = () => {
    return (
        <>
            <img style={{ width: "50%" }} src={regSuccessGif} />
            <h2 className='text-center'>Registration success, account under review</h2>
            <p className='text-center'>Congratulations! You have successfully registered with us. Your account is under review. Once your account is verified you can login and start receving donations.</p>
            <NavLink className='button' to="/login">Continue to Login</NavLink>
        </>
    )
}

export default NeedyRegistrationSuccess