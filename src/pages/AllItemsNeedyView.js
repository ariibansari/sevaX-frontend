import React, { useContext, useEffect, useState } from 'react'
import { TfiDropboxAlt } from 'react-icons/tfi'
import { useNavigate } from 'react-router-dom'
import ProtectedAxios from '../api/protectedAxios'
import { UserContext } from '../context/UserProvider'
import { CiUser } from 'react-icons/ci'
import { FaUserInjured, FaUserFriends } from 'react-icons/fa'
import ItemsListNeedyView from '../components/ItemsListNeedyView'

const AllItemsNeedyView = () => {
  const [user] = useContext(UserContext)
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = () => {
    setLoading(true)
    ProtectedAxios.post('/needy/getAllItemsOnDonation', { user_id: user.user_id })
      .then(res => {
        console.log('all item of donor - ', res.data);
        setItems(res.data)
        setLoading(false)
      })
      .catch(err => {
        alert(err.response.data.error)
        setLoading(false)
      })
  }

  return (
    <div className='container py-5'>
      {!loading
        &&
        <>
          {items.length === 0
            ?
            <div className='container box'>
              <div className='flexed-container column'>
                <TfiDropboxAlt className='pending-icon' />
                <h2>No Items Found</h2>
                <p className='text-center'>We're sorry, there are currently no donation items available to display. We appreciate your patience and encourage you to check back later or browse other categories to find what you need.</p>
                <button className="button button-main" onClick={() => navigate(-1)}>Go Back</button>
              </div>
            </div>

            :
            <>
              <h3>All Items</h3>
              <div className='item-list-container'>
                {items.map((item, i) => {
                  return (
                    <div className='item' key={i} onClick={() => navigate(`/item/${item.item_id}`)}>
                      <div className='image' style={{ backgroundImage: `url('${process.env.REACT_APP_BASE_URL}${item.pictureSrc}')` }} />
                      <div className='name' title={item.name}>{item.name.substring(0, 25)} {item.name.length > 25 && '...'}</div>
                      <div className='desc'>{item.description.substring(0, 60)} {item.description.length > 60 && '....'}</div>
                      <div className='item-profile-container'>
                        <div className='item-card-profile' title={item.donor_name} style={{ backgroundImage: `url(${item.profilePictureSrc ? `${process.env.REACT_APP_BASE_URL}${item.profilePictureSrc}` : 'https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'})` }} />
                        <div className='donor_name'>by {item.donor_name.substring(0, 18)}{item.donor_name.length > 18 && '...'}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          }
        </>
      }
    </div>
  )
}

export default AllItemsNeedyView