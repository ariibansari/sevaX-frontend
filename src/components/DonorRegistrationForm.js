import React, { useState } from 'react'
import Axios from '../api/axios'
import DonorRegistrationSuccess from './DonorRegistrationSuccess';

const DonorRegistrationForm = () => {
    const [registrationSucceeded, setRegistrationSucceeded] = useState(false)
    const [registrationData, setRegistrationData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        password: '',
        confirmPassword: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const register = e => {
        e.preventDefault()
        setLoading(true)
        setError('')

        if (registrationData.password !== registrationData.confirmPassword) {
            setError('Please add the same password in both fields')
            setLoading(false)
        }
        else {
            Axios.post('/auth/register/donor', registrationData)
                .then(res => {
                    setLoading(false)
                    console.log('registration data - ', res.data);
                    if (res.data) {
                        setRegistrationSucceeded(true)
                    } else {
                        alert('Could not register you at the moment, please try again later')
                    }
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false)
                    if (err.response.status === 500) {
                        alert(err.response.data.error)
                    }
                    if (err.response.status === 400) {
                        setError(err.response.data.error)
                    }
                })
        }

    }

    return (
        <div className='form lg'>
            {!registrationSucceeded
                ?
                <>
                    <h2>Make a Difference Today</h2>
                    <p className='subtitle text-center' style={{ marginTop: '-1rem' }}>Join our community of donors and give hope to those in need.</p>
                    <form className='form-container' onSubmit={register}>
                        <div className='input-grp'>
                            <label htmlFor="full-name-input">Full Name <span className='text-danger'>*</span></label>
                            <input type="text" required id="full-name-input" value={registrationData.name} onChange={e => setRegistrationData({ ...registrationData, name: e.target.value })} />
                        </div>
                        <div className='form-grp'>
                            <div className='input-grp'>
                                <label htmlFor="phone-input">Phone <span className='text-danger'>*</span></label>
                                <input type="number" required id="phone-input" value={registrationData.phone} onChange={e => setRegistrationData({ ...registrationData, phone: e.target.value })} />
                            </div>
                            <div className='input-grp'>
                                <label htmlFor="email-input">Email <span className='text-danger'>*</span></label>
                                <input type="email" required id="email-input" value={registrationData.email} onChange={e => setRegistrationData({ ...registrationData, email: e.target.value })} />
                            </div>
                        </div>

                        <div className='input-grp'>
                            <label htmlFor="address-textarea">Address <span className='text-danger'>*</span></label>
                            <textarea id="address-textarea" required value={registrationData.address} onChange={e => setRegistrationData({ ...registrationData, address: e.target.value })} />
                        </div>

                        <div className='form-grp'>
                            <div className='input-grp'>
                                <label htmlFor="password-input">Password <span className='text-danger'>*</span></label>
                                <input type='password' id="password-input" required value={registrationData.password} onChange={e => setRegistrationData({ ...registrationData, password: e.target.value })} />
                            </div>
                            <div className='input-grp'>
                                <label htmlFor="confirm-password-input">Confirm Password <span className='text-danger'>*</span></label>
                                <input type='password' id="confirm-password-input" required value={registrationData.confirmPassword} onChange={e => setRegistrationData({ ...registrationData, confirmPassword: e.target.value })} />
                            </div>
                        </div>

                        <div className='btn-container'>
                            <p className='subtitle text-danger'>{error}</p>
                            <button type="submit" className="button button-main" disabled={loading}>
                                {loading
                                    ? <div className="spinner-border spinner-border-sm" role="status">
                                        <span className="sr-only"></span>
                                    </div>

                                    : "Register"
                                }
                            </button>
                            {/* <p className='text-center'>New User?<br />Register - <NavLink to="/register-donor">Donor</NavLink> | <NavLink to="/register-needy">Needy</NavLink></p> */}
                        </div>
                    </form>
                </>

                : <DonorRegistrationSuccess />
            }
        </div>
    )
}

export default DonorRegistrationForm