import React, { useContext, useState } from 'react'
import { RiCheckLine, RiCloseLine } from 'react-icons/ri'
import { MdCloudUpload } from 'react-icons/md'
import ProtectedAxios from '../api/protectedAxios'
import { UserContext } from '../context/UserProvider'
import { useNavigate } from 'react-router-dom'

const AddItemForm = () => {
    const [user] = useContext(UserContext)
    const [itemDetails, setItemDetails] = useState({
        name: '',
        description: '',
        image: ''
    })
    const [error, setError] = useState('')

    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const addItem = e => {
        e.preventDefault()

        // setIsLoading(true)

        const formData = new FormData()
        formData.append('name', itemDetails.name)
        formData.append('description', itemDetails.description)
        formData.append('itemPicture', itemDetails.image)
        formData.append('user_id', user.user_id)

        ProtectedAxios.post('/donor/addItem', formData)
            .then(res => {
                setIsLoading(false)
                if (res.data) {
                    navigate('/all-item')
                } else {
                    alert('Could not add item at the moment, please try again later')
                }
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false)
                if (err.response.status === 500) {
                    alert(err.response.data.error)
                }
                if (err.response.status === 400) {
                    setError(err.response.data.error)
                }
            })

    }

    return (
        <div className='form xl'>
            <h2>Add New Item</h2>
            {/* <p className='subtitle' style={{ marginTop: '-1rem', textAlign: 'center' }}>Help Those in Need by Adding Your Donation to Our Collection</p> */}
            <form className='form-container' onSubmit={addItem}>
                <div className='form-flex-container'>
                    <div className='input-grp image-file-container'>
                        <label htmlFor="item-details">Image <span className='text-danger'>*</span></label>
                        <input type="file" accept="image/*" required id="item-details" onChange={e => setItemDetails({ ...itemDetails, image: e.target.files[0] })} />
                        <div className='image-container' style={{ backgroundImage: `url(${itemDetails.image ? URL.createObjectURL(itemDetails.image) : ''})`, border: `${itemDetails.image ? 'none' : '1px solid rgb(231, 231, 231)'}` }} >
                            <div style={{ display: `${itemDetails.image ? 'none' : 'flex'}`, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                                <MdCloudUpload style={{ color: 'gray', fontSize: '2.5rem' }} />
                                <p>click to upload photo</p>
                            </div>
                        </div>
                    </div>

                    <div className='form-container-grp'>
                        <div className='input-grp'>
                            <label htmlFor="item-name">Item Name <span className='text-danger'>*</span></label>
                            <input maxLength={45} type="text" required id="item-name" value={itemDetails.name} onChange={e => setItemDetails({ ...itemDetails, name: e.target.value })} />
                        </div>
                        <div className='input-grp'>
                            <label htmlFor="item-details">Description <span className='text-danger'>*</span></label>
                            <textarea maxLength={500} type="text" required id="item-details" value={itemDetails.description} onChange={e => setItemDetails({ ...itemDetails, description: e.target.value })} />
                        </div>

                    </div>
                </div>
                <div className='btn-container'>
                    <p className='subtitle text-danger'>{error}</p>
                    <button type="submit" className="button button-main" disabled={isLoading}>
                        {isLoading
                            ? <div className="spinner-border spinner-border-sm" role="status">
                                <span className="sr-only"></span>
                            </div>

                            : "Add Item"
                        }
                    </button>
                    {/* <p className='text-center'>New User?<br />Register - <NavLink to="/register-donor">Donor</NavLink> | <NavLink to="/register-needy">Needy</NavLink></p> */}
                </div>

            </form>

        </div>
    )
}

export default AddItemForm