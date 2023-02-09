import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Axios from '../api/axios'
import { UserContext } from '../context/UserProvider';
import { BsFillClockFill } from 'react-icons/bs'
import { BiBlock } from 'react-icons/bi'
import { RxCross2 } from 'react-icons/rx'

const LoginForm = () => {
    const [user, setUser] = useContext(UserContext);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [error, setError] = useState('')
    const [needyVerificationStatus, setNeedyVerificationStatus] = useState(0)
    const [isActive, setIsActive] = useState(1)

    const navigate = useNavigate()

    const login = e => {
        e.preventDefault()
        setLoading(true)
        setError('')

        Axios.post('/auth/login', { email, password })
            .then(res => {
                setLoading(false)
                console.log('login data - ', res.data);
                console.log(res.data.role_id !== 1);
                if (res.data.isActive === 0) {      //means user account has been blocked and can't login
                    setIsActive(0)
                } else {
                    if (res.data.role_id !== 1) {     //means user is other than needy so no check if verified or not is not required
                        setUser(res.data)
                        navigate('/')
                    } else {      //means its a needy user so have to check if account is verified or not
                        Axios.post('/auth/needy/verificationStatus', { user_id: res.data.user_id })
                            .then(response => {
                                console.log('verification status - ', response.data);
                                if (response.data[0].isVerified === 0) { //means not verified
                                    setNeedyVerificationStatus(1)
                                }
                                else if (response.data[0].isVerified === 1) {  //means verified and good to login
                                    setUser(res.data)
                                    navigate('/')
                                }
                                else if (response.data[0].isVerified === 2) {  //means verification is declined
                                    setNeedyVerificationStatus(2)
                                }

                            })
                    }
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

    return (
        <>
            {isActive === 1
                ? <>
                    {needyVerificationStatus === 0
                        ?
                        <>
                            <div className='form md'>
                                <h2>Login</h2>
                                <p className='subtitle' style={{ marginTop: '-1rem' }}>Login now to donate or get donations</p>
                                <form className='form-container' onSubmit={login}>
                                    <div className='input-grp'>
                                        <label htmlFor="login-email">Email <span className='text-danger'>*</span></label>
                                        <input autoFocus type="email" id="login-email" value={email} onChange={e => setEmail(e.target.value)} />
                                    </div>

                                    <div className='input-grp'>
                                        <label htmlFor="login-password">Password <span className='text-danger'>*</span></label>
                                        <input type={isPasswordVisible ? 'text' : 'password'} id="login-password" required value={password} onChange={e => setPassword(e.target.value)} />
                                        <div className='password-options'>
                                            <div className='show-password'>
                                                <input type='checkbox' checked={isPasswordVisible} onChange={() => setIsPasswordVisible(!isPasswordVisible)} />
                                                <label onClick={() => setIsPasswordVisible(!isPasswordVisible)}>Show Password</label>
                                            </div>
                                            {/* <NavLink to="/">forgot password?</NavLink> */}
                                        </div>
                                    </div>
                                    <div className='btn-container'>
                                        <p className='subtitle text-danger'>{error}</p>
                                        <button type="submit" className="button button-main" disabled={loading}>
                                            {loading
                                                ? <div className="spinner-border spinner-border-sm" role="status">
                                                    <span className="sr-only"></span>
                                                </div>

                                                : "Login"
                                            }
                                        </button>
                                        {/* <p className='text-center'>New User?<br />Register - <NavLink to="/register-donor">Donor</NavLink> | <NavLink to="/register-needy">Needy</NavLink></p> */}
                                    </div>
                                </form>
                            </div>
                        </>

                        : <>
                            {needyVerificationStatus === 1
                                ?   //VERIFICATION - PENDING 
                                <div className='flexed-container column'>
                                    <BsFillClockFill className='pending-icon' />
                                    <h2>Verification Pending</h2>
                                    <p className='text-center'>Your account has not been verified by the administrator yet. If your account remains unverified after 2 days of registration, kindly follow up with the administrator for a prompt resolution. Thank you for your patience and understanding.</p>
                                    <button className="button button-main" onClick={() => setNeedyVerificationStatus(0)}>Go Back</button>
                                </div>


                                :   //VERIFICATION - DECLINED
                                <div className='flexed-container column'>
                                    <RxCross2 className='declined-icon' />
                                    <h2>Verification Declined</h2>
                                    <p className='text-center'>We regret to inform you that your account verification has been declined. Please contact the administrator for further information and assistance. Thank you for your understanding.</p>
                                    <button className="button button-main" onClick={() => setNeedyVerificationStatus(0)}>Go Back</button>
                                </div>
                            }
                        </>
                    }
                </>


                :   //USER'S ACCOUNT BLOCKED
                <div className='flexed-container column'>
                    <BiBlock className='declined-icon' />
                    <h2>Account Blocked</h2>
                    <p className='text-center'>We regret to inform you that your account has been blocked. You can no longer access your dashboard until your account is activated back again. Please contact the administrator for further information and assistance.</p>
                    <button className="button button-main" onClick={() => setIsActive(1)}>Go Back</button>
                </div>
            }
        </>
    )
}

export default LoginForm