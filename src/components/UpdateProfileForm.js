import React, { useContext, useState } from 'react'
import { MdEdit } from 'react-icons/md'
import { UserContext } from '../context/UserProvider'
import { RiCloseLine } from 'react-icons/ri'
import ProtectedAxios from '../api/protectedAxios'


const UpdateProfileForm = () => {
    const [user, setUser] = useContext(UserContext)
    const [editingData, setEditingData] = useState({
        isEditing: false,
        editingField: '',
        newValue: '',
        oldValue: '',
        isLoading: false
    })
    const [error, setError] = useState({
        errorField: '',
        errorMsg: ''
    })

    const updateProfileData = e => {
        e.preventDefault()
        setError({ errorField: '', errorMsg: '' })

        setEditingData({ ...editingData, isLoading: true })
        ProtectedAxios.post('/users/updateProfile', { user_id: user.user_id, editingField: editingData.editingField, newValue: editingData.newValue, oldValue: editingData.oldValue })
            .then(res => {
                console.log('updated res - ', res.data);
                if (editingData.editingField === 'password') {
                    setEditingData({ ...editingData, isLoading: false, editingField: '', newValue: '', oldValue: '' })
                } else {
                    setUser({ ...user, [res.data.updatedFieldName]: res.data.newValue })
                    setEditingData({ ...editingData, isLoading: false, editingField: '', newValue: '', oldValue: '' })
                }
            })
            .catch(err => {
                if (err.response.status === 400) {
                    setError({ errorField: err.response.data.fieldName, errorMsg: err.response.data.error })
                } else {
                    alert(err.response.data.error)
                }
                setEditingData({ ...editingData, isLoading: false })
            })

    }

    return (
        <section className='update-profile-form-container'>
            <form onSubmit={updateProfileData}>
                <div className={`profile-item ${editingData.editingField !== 'name' && 'editing'}`}>
                    <div className='profile-item-header'>
                        <div className='input-grp'>
                            <label>Full Name</label>
                            <input type='text' required id='name' value={editingData.editingField === 'name' ? editingData.newValue : user.name} onChange={e => setEditingData({ ...editingData, newValue: e.target.value })} className={editingData.editingField !== 'name' && 'events-none'} />
                        </div>
                        <div className='edit-btn-container'>
                            {editingData.editingField === 'name'
                                ?
                                <button type='button' disabled={editingData.isLoading} className='edit-btn' title='cancel' onClick={() => { setEditingData({ ...editingData, editingField: '', newValue: '' }); setError({ errorField: '', errorMsg: '' }) }}><RiCloseLine className='edit-icon reject-icon' /></button>

                                :
                                <button type='button' disabled={editingData.isLoading} className='edit-btn' title='update name' onClick={() => { setEditingData({ ...editingData, editingField: 'name', newValue: user.name }); setError({ errorField: '', errorMsg: '' }) }}><MdEdit className='edit-icon ' /></button>
                            }
                        </div>
                    </div>
                    <div className='profile-item-footer'>
                        <p className='text-danger'>{error.errorField === 'name' && error.errorMsg}</p>
                        <button type='submit' className="button button-main" disabled={(editingData.editingField === 'name' && editingData.isLoading)}>
                            {(editingData.editingField === 'name' && editingData.isLoading)
                                ? <div className="spinner-border spinner-border-sm" role="status">
                                    <span className="sr-only"></span>
                                </div>

                                : "Update"
                            }
                        </button>
                    </div>
                </div>
            </form>

            <form onSubmit={updateProfileData}>
                <div className={`profile-item ${editingData.editingField !== 'email' && 'editing'}`}>
                    <div className='profile-item-header'>
                        <div className='input-grp'>
                            <label>Email</label>
                            <input required type='email' id='email' value={editingData.editingField === 'email' ? editingData.newValue : user.email} onChange={e => setEditingData({ ...editingData, newValue: e.target.value })} className={editingData.editingField !== 'email' && 'events-none'} />
                        </div>
                        <div className='edit-btn-container'>
                            {editingData.editingField === 'email'
                                ?
                                <button type='button' disabled={editingData.isLoading} className='edit-btn' title='cancel' onClick={() => { setEditingData({ ...editingData, editingField: '', newValue: '' }); setError({ errorField: '', errorMsg: '' }) }}><RiCloseLine className='edit-icon reject-icon' /></button>

                                :
                                <button type='button' disabled={editingData.isLoading} className='edit-btn' title='update email' onClick={() => { setEditingData({ ...editingData, editingField: 'email', newValue: user.email }); setError({ errorField: '', errorMsg: '' }) }}><MdEdit className='edit-icon ' /></button>
                            }
                        </div>
                    </div>
                    <div className='profile-item-footer'>
                        <p className='text-danger'>{error.errorField === 'email' && error.errorMsg}</p>
                        <button type='submit' className="button button-main" disabled={(editingData.editingField === 'email' && editingData.isLoading)}>
                            {(editingData.editingField === 'email' && editingData.isLoading)
                                ? <div className="spinner-border spinner-border-sm" role="status">
                                    <span className="sr-only"></span>
                                </div>

                                : "Update"
                            }
                        </button>
                    </div>
                </div>
            </form>

            <form onSubmit={updateProfileData}>
                <div className={`profile-item ${editingData.editingField !== 'phone' && 'editing'}`}>
                    <div className='profile-item-header'>
                        <div className='input-grp'>
                            <label>Phone</label>
                            <input type='number' required id='phone' value={editingData.editingField === 'phone' ? editingData.newValue : user.phone} onChange={e => setEditingData({ ...editingData, newValue: e.target.value })} className={editingData.editingField !== 'phone' && 'events-none'} />
                        </div>
                        <div className='edit-btn-container'>
                            {editingData.editingField === 'phone'
                                ?
                                <button type='button' disabled={editingData.isLoading} className='edit-btn' title='cancel' onClick={() => { setEditingData({ ...editingData, editingField: '', newValue: '' }); setError({ errorField: '', errorMsg: '' }) }}><RiCloseLine className='edit-icon reject-icon' /></button>

                                :
                                <button type='button' disabled={editingData.isLoading} className='edit-btn' title='update phone' onClick={() => { setEditingData({ ...editingData, editingField: 'phone', newValue: user.phone }); setError({ errorField: '', errorMsg: '' }) }}><MdEdit className='edit-icon ' /></button>
                            }
                        </div>
                    </div>
                    <div className='profile-item-footer'>
                        <p className='text-danger'>{error.errorField === 'phone' && error.errorMsg}</p>
                        <button type='submit' className="button button-main" disabled={(editingData.editingField === 'phone' && editingData.isLoading)}>
                            {(editingData.editingField === 'phone' && editingData.isLoading)
                                ? <div className="spinner-border spinner-border-sm" role="status">
                                    <span className="sr-only"></span>
                                </div>

                                : "Update"
                            }
                        </button>
                    </div>
                </div>
            </form>

            <form onSubmit={updateProfileData}>
                <div className={`profile-item textarea-item ${editingData.editingField === 'address' && 'editing'}`}>
                    <div className='profile-item-header'>
                        <div className='input-grp'>
                            <label>Address</label>
                            <textarea type='text' required id='address' value={editingData.editingField === 'address' ? editingData.newValue : user.address} onChange={e => setEditingData({ ...editingData, newValue: e.target.value })} className={editingData.editingField !== 'address' && 'events-none'} />
                        </div>
                        <div className='edit-btn-container'>
                            {editingData.editingField === 'address'
                                ?
                                <button type='button' disabled={editingData.isLoading} className='edit-btn' title='cancel' onClick={() => { setEditingData({ ...editingData, editingField: '', newValue: '' }); setError({ errorField: '', errorMsg: '' }) }}><RiCloseLine className='edit-icon reject-icon' /></button>

                                :
                                <button type='button' disabled={editingData.isLoading} className='edit-btn' title='update address' onClick={() => { setEditingData({ ...editingData, editingField: 'address', newValue: user.address }); setError({ errorField: '', errorMsg: '' }) }}><MdEdit className='edit-icon ' /></button>
                            }
                        </div>
                    </div>
                    <div className='profile-item-footer'>
                        <p className='text-danger'>{error.errorField === 'address' && error.errorMsg}</p>
                        <button type='submit' className="button button-main" disabled={(editingData.editingField === 'address' && editingData.isLoading)}>
                            {(editingData.editingField === 'address' && editingData.isLoading)
                                ? <div className="spinner-border spinner-border-sm" role="status">
                                    <span className="sr-only"></span>
                                </div>

                                : "Update"
                            }
                        </button>
                    </div>
                </div>
            </form>

            <form onSubmit={updateProfileData}>
                <div className={`profile-item password-item ${editingData.editingField === 'password' && 'editing'}`}>
                    <div className='profile-item-header'>
                        <div className='input-grp'>
                            <label>Update Password</label>
                            <button type='button' disabled={editingData.isLoading} title='update password' onClick={() => { setEditingData({ ...editingData, editingField: 'password', newValue: '' }) }} className='button-plain-text'>I want to change my password <MdEdit className='edit-icon ' /></button>
                            <br />
                            <label>Current Password</label>
                            <input type='password' required id='password' value={editingData.editingField === 'password' && editingData.oldValue} onChange={e => setEditingData({ ...editingData, oldValue: e.target.value })} className={editingData.editingField !== 'password' && 'events-none'} />
                            <br />
                            <label>New Password</label>
                            <input type='password' required id='confirm-password' value={editingData.editingField === 'password' && editingData.newValue} onChange={e => setEditingData({ ...editingData, newValue: e.target.value })} className={editingData.editingField !== 'password' && 'events-none'} />
                        </div>
                        <div className='edit-btn-container'>
                            {editingData.editingField === 'password'
                                ?
                                <button type='button' disabled={editingData.isLoading} className='edit-btn' title='cancel' onClick={() => { setEditingData({ ...editingData, editingField: '', newValue: '', oldValue: '' }); setError({ errorField: '', errorMsg: '' }) }}><RiCloseLine className='edit-icon reject-icon' /></button>

                                :
                                <button type='button' disabled={editingData.isLoading} className='edit-btn' title='update password' onClick={() => { setEditingData({ ...editingData, editingField: 'password', newValue: user.password }); setError({ errorField: '', errorMsg: '' }) }}><MdEdit className='edit-icon ' /></button>
                            }
                        </div>
                    </div>
                    <div className='profile-item-footer'>
                        <p className='text-danger'>{error.errorField === 'password' && error.errorMsg}</p>
                        <button type='submit' className="button button-main" disabled={(editingData.editingField === 'password' && editingData.isLoading)}>
                            {(editingData.editingField === 'password' && editingData.isLoading)
                                ? <div className="spinner-border spinner-border-sm" role="status">
                                    <span className="sr-only"></span>
                                </div>

                                : "Update"
                            }
                        </button>
                    </div>
                </div>
            </form>
        </section>
    )
}

export default UpdateProfileForm