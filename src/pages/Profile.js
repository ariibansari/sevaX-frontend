import React, { useContext, useEffect, useState } from 'react'
import ProtectedAxios from '../api/protectedAxios'
import { UserContext } from '../context/UserProvider'
import { RiCheckLine, RiCloseLine } from 'react-icons/ri'
import UpdateProfileForm from '../components/UpdateProfileForm'

const Profile = () => {
  const [user, setUser] = useContext(UserContext)
  const [profile, setProfile] = useState('')
  const [loadingProfile, setLoadingProfile] = useState(false)
  const [refreshProfile, setRefreshProfile] = useState(false)
  const [newProfilePicture, setNewProfilePicture] = useState('')

  useEffect(() => {
    // console.log(user);
    fetchProfile()
  }, [])

  const fetchProfile = () => {
    setLoadingProfile(true)
    ProtectedAxios.post('/users/myDetails', { user_id: user.user_id })
      .then(res => {
        console.log('My Profile - ', res.data);
        setProfile(res.data)
        setLoadingProfile(false)
      })
      .catch(err => {
        setLoadingProfile(false)
        alert(err.response.data.error)
      })
  }

  const changeProfilePicture = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('newProfilePicture', newProfilePicture)
    formData.append('user_id', user.user_id)

    console.log(formData);

    ProtectedAxios.post('/users/changeProfilePicture', formData)
      .then(res => {
        setProfile(res.data)
        setNewProfilePicture('')
        setUser({ ...user, profilePictureSrc: res.data.profilePictureSrc })
      })
      .catch(err => {
        alert(err.response.data.error)
      })
  }

  return (
    <div className='container py-5'>
      <div className='profile-container'>
        <div className='profile-picture' style={{ backgroundImage: `url(${newProfilePicture ? URL.createObjectURL(newProfilePicture) : `${user.profilePictureSrc ? `${process.env.REACT_APP_BASE_URL}${user.profilePictureSrc}` : 'https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'}`})` }} />
        <form onSubmit={changeProfilePicture}>
          <div className='edit-btn-container'>
            {!newProfilePicture
              ?
              <input type='file' accept="image/*" className='upload-new-profile-input' onChange={e => setNewProfilePicture(e.target.files[0])} />

              :
              <>
                Change
                <button className='edit-btn' title='update profile picture' onClick={(e) => { }}><RiCheckLine className='edit-icon accept-icon ' /></button>

                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                Cancel
                <button className='edit-btn' title='cancel' onClick={() => { setNewProfilePicture('') }}><RiCloseLine className='edit-icon reject-icon ' /></button>
              </>
            }
          </div>
        </form>
      </div>

      <UpdateProfileForm />
    </div>
  )
}

export default Profile