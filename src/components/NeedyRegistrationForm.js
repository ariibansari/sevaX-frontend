import React, { useState } from 'react'
import Axios from '../api/axios'
import { MdFileUpload } from 'react-icons/md'
import NeedyRegistrationSuccess from './NeedyRegistrationSuccess';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { BsFillInfoCircleFill } from 'react-icons/bs'

const NeedyRegistrationForm = () => {
    const [onStep2, setOnStep2] = useState(false)
    const [registrationSucceeded, setRegistrationSucceeded] = useState(false)
    const [isConsentChecked, setIsConsentChecked] = useState(false)
    const [registrationData, setRegistrationData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        password: '',
        confirmPassword: '',

        noOfFamilyMembers: '',
        totalEarningMembers: '',
        isHeadOfFamily: false,
        yearlyIncome: '',
        sourceOfIncome: '',
        aadharCardFile: '',
        rationCardFile: '',
        rationCardType: '',

        noteForAdmin: '',
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const submitStep1 = e => {
        e.preventDefault()
        setError('')
        setLoading(true)
        if (registrationData.password !== registrationData.confirmPassword) {
            setError('Please add the same password in both fields')
            setLoading(false)
        } else {
            Axios.post('/auth/register/emailCheck', { email: registrationData.email })
                .then(res => {
                    console.log('registration data - ', res.data);
                    if (res.data) {
                        setOnStep2(true)
                    } else {
                        alert('Could not register you at the moment, please try again later')
                    }
                    setLoading(false)
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

    const register = e => {
        e.preventDefault()
        setLoading(true)
        setError('')

        console.log(registrationData);
        const formData = new FormData()
        formData.append('name', registrationData.name)
        formData.append('phone', registrationData.phone)
        formData.append('email', registrationData.email)
        formData.append('address', registrationData.address)
        formData.append('password', registrationData.password)
        formData.append('noOfFamilyMembers', registrationData.noOfFamilyMembers)
        formData.append('totalEarningMembers', registrationData.totalEarningMembers)
        formData.append('isHeadOfFamily', registrationData.isHeadOfFamily)
        formData.append('yearlyIncome', registrationData.yearlyIncome)
        formData.append('sourceOfIncome', registrationData.sourceOfIncome)

        formData.append('aadharCardFile', registrationData.aadharCardFile)

        formData.append('rationCardFile', registrationData.rationCardFile)
        formData.append('rationCardType', registrationData.rationCardType)

        formData.append('noteForAdmin', registrationData.noteForAdmin)

        Axios.post('/auth/register/needy', formData)
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

    return (
        <div className='form lg'>
            {!registrationSucceeded
                ?
                <>
                    <h2>Help is just a registration away</h2>
                    <p className='subtitle text-center' style={{ marginTop: '-1rem' }}>Together, we can make a difference - register now to receive donations from our kind-hearted donors.</p>
                    <div className='reg-step-container'>
                        <span className='step step1'>1</span>
                        <span className='connector connector1' />
                        <span className={`connector connector2 ${onStep2 && 'active'}`} />
                        <span className={`step step2 ${onStep2 && 'active'}`}>2</span>
                    </div>
                    {!onStep2
                        ?
                        <form className='form-container' onSubmit={submitStep1}>
                            <div className='input-grp'>
                                <label htmlFor="full-name-input">Full Name <span className='text-danger'>*</span></label>
                                <input type="text"
                                    required
                                    id="full-name-input" value={registrationData.name} onChange={e => setRegistrationData({ ...registrationData, name: e.target.value })} />
                            </div>
                            <div className='form-grp'>
                                <div className='input-grp'>
                                    <label htmlFor="phone-input">Phone <span className='text-danger'>*</span></label>
                                    <input type="number"
                                        required
                                        id="phone-input" value={registrationData.phone} onChange={e => setRegistrationData({ ...registrationData, phone: e.target.value })} />
                                </div>
                                <div className='input-grp'>
                                    <label htmlFor="email-input">Email <span className='text-danger'>*</span></label>
                                    <input type="email"
                                        required
                                        id="email-input" value={registrationData.email} onChange={e => setRegistrationData({ ...registrationData, email: e.target.value })} />
                                </div>
                            </div>

                            <div className='input-grp'>
                                <label htmlFor="address-textarea">Address <span className='text-danger'>*</span></label>
                                <textarea id="address-textarea"
                                    required
                                    value={registrationData.address} onChange={e => setRegistrationData({ ...registrationData, address: e.target.value })} />
                            </div>

                            <div className='form-grp'>
                                <div className='input-grp'>
                                    <label htmlFor="password-input">Password <span className='text-danger'>*</span></label>
                                    <input type='password' id="password-input"
                                        required
                                        value={registrationData.password} onChange={e => setRegistrationData({ ...registrationData, password: e.target.value })} />
                                </div>
                                <div className='input-grp'>
                                    <label htmlFor="confirm-password-input">Confirm Password <span className='text-danger'>*</span></label>
                                    <input type='password' id="confirm-password-input"
                                        required
                                        value={registrationData.confirmPassword} onChange={e => setRegistrationData({ ...registrationData, confirmPassword: e.target.value })} />
                                </div>
                            </div>

                            <div className='btn-container'>
                                <p className='subtitle text-danger'>{error}</p>
                                <button type="submit" className="button button-main" disabled={loading}>
                                    {loading
                                        ? <div className="spinner-border spinner-border-sm" role="status">
                                            <span className="sr-only"></span>
                                        </div>

                                        : "Next"
                                    }
                                </button>
                                {/* <p className='text-center'>New User?<br />Register - <NavLink to="/register-donor">Donor</NavLink> | <NavLink to="/register-needy">Needy</NavLink></p> */}
                            </div>
                        </form>


                        :
                        <form className='form-container' onSubmit={register}>
                            <div className='form-grp'>
                                <div className='input-grp'>
                                    <label htmlFor="no-of-family-members-input">No. of family members <span className='text-danger'>*</span></label>
                                    <input type="number"
                                        required
                                        id="no-of-family-members-input" value={registrationData.noOfFamilyMembers} onChange={e => setRegistrationData({ ...registrationData, noOfFamilyMembers: e.target.value })} />
                                </div>
                                <div className='input-grp'>
                                    <label htmlFor="no-of-earning-members-input">Total no. of earning members in family <span className='text-danger'>*</span></label>
                                    <input type="number"
                                        required
                                        id="no-of-earning-members-input" value={registrationData.totalEarningMembers} onChange={e => setRegistrationData({ ...registrationData, totalEarningMembers: e.target.value })} />
                                </div>
                            </div>

                            <div className='form-grp'>
                                <div className='input-grp'>
                                    <label>Are you head of your family? <span className='text-danger'>*</span></label>
                                    <div className='radio-container'>
                                        <div className='radio-grp'>
                                            <input type="radio"
                                                required
                                                id='isHeadOfFamily-radio-yes' value={true} onClick={() => setRegistrationData({ ...registrationData, isHeadOfFamily: true })} name="isHeadOfFamily" />
                                            <label htmlFor='isHeadOfFamily-radio-yes'>Yes</label>
                                        </div>

                                        <div className='radio-grp'>
                                            <input type="radio"
                                                required
                                                id='isHeadOfFamily-radio-no' value={false} onClick={() => setRegistrationData({ ...registrationData, isHeadOfFamily: false })} name="isHeadOfFamily" />
                                            <label htmlFor='isHeadOfFamily-radio-no'>No</label>
                                        </div>
                                    </div>
                                </div>

                                <div className='input-grp'>
                                    <label htmlFor="income-input">Yearly income <span className='text-danger'>*</span></label>
                                    <input type="number"
                                        required
                                        id="income-input" value={registrationData.yearlyIncome} onChange={e => setRegistrationData({ ...registrationData, yearlyIncome: e.target.value })} />
                                </div>
                            </div>
                            <div className='form-grp'>
                                <div className='input-grp'>
                                    <label htmlFor="income-source-input">Source of income <span className='text-danger'>*</span></label>
                                    <input type="text"
                                        required
                                        id="income-source-input" value={registrationData.sourceOfIncome} onChange={e => setRegistrationData({ ...registrationData, sourceOfIncome: e.target.value })} />
                                </div>
                                <div className='input-grp file-upload'>
                                    <label htmlFor="aadhar-card-file">Upload Aadhar Card <span className='text-danger'>*</span></label>
                                    <input type="file" accept="image/*" required name='aadhar-card-file' id="aadhar-card-file" onChange={e => { setRegistrationData({ ...registrationData, aadharCardFile: e.target.files[0] }); console.log(e.target.files[0]); }} />
                                    <MdFileUpload className='upload-icon' />
                                </div>
                            </div>
                            <div className='form-grp'>
                                <div className='input-grp file-upload'>
                                    <label htmlFor="ration-card-file">Upload Ration Card <span className='text-danger'>*</span></label>
                                    <input type="file" accept="image/*" required name='ration-card-file' id="ration-card-file" onChange={e => { setRegistrationData({ ...registrationData, rationCardFile: e.target.files[0] }); console.log(e.target.files[0]); }} />
                                    <MdFileUpload className='upload-icon' />
                                </div>
                                <div className='input-grp'>
                                    <label htmlFor="ration-card-type">Ration Card Type <span className='text-danger'>*</span></label>
                                    <select
                                        required
                                        id="ration-card-type" value={registrationData.rationCardType} onChange={e => setRegistrationData({ ...registrationData, rationCardType: e.target.value })}>
                                        <option value="yellow">Yellow Ration Card</option>
                                        <option value="saffron">Saffron Ration Card</option>
                                        <option value="white">White Ration Card</option>
                                    </select>
                                </div>
                            </div>

                            <div className='input-grp'>
                                <label htmlFor="address-textarea">
                                    Note for us
                                    <OverlayTrigger
                                        delay={{ hide: 450, show: 300 }}
                                        overlay={(props) => (
                                            <Tooltip {...props}>
                                                anything that we should know that would help our decision when verifying your account
                                            </Tooltip>
                                        )}
                                        placement="right"
                                    >
                                        <button type="button" className='tooltip-button'><BsFillInfoCircleFill /></button>
                                    </OverlayTrigger>
                                </label>
                                <textarea id="address-textarea"
                                    value={registrationData.noteForAdmin} onChange={e => setRegistrationData({ ...registrationData, noteForAdmin: e.target.value })} />
                            </div>

                            <div className='d-flex align-items-start gap-3'>
                                <input required className='' type="checkbox" style={{width:"1.2rem", height:"1.2rem", marginTop:"4px"}} checked={isConsentChecked} onClick={() => setIsConsentChecked(!isConsentChecked)} />
                                <p style={{width:"90%", fontSize:"15px", cursor:"pointer"}} onClick={()=>setIsConsentChecked(!isConsentChecked)}>By registering and uploading documents, I confirm that all information and documents provided are accurate and authentic. Uploading fake/invalid documents or providing false information may lead to consequences and account being blocked from the platform. <span className='text-danger'>*</span></p>
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
                    }
                </>

                : <NeedyRegistrationSuccess />
            }
        </div>
    )
}

export default NeedyRegistrationForm