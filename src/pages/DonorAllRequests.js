import React, { useContext, useEffect, useState } from 'react'
import { TfiDropboxAlt } from 'react-icons/tfi'
import { useNavigate } from 'react-router-dom'
import ProtectedAxios from '../api/protectedAxios'
import { UserContext } from '../context/UserProvider'
import { CiUser } from 'react-icons/ci'
import { FaUserInjured, FaUserFriends } from 'react-icons/fa'

const DonorAllRequests = () => {
  const [user] = useContext(UserContext)
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = () => {
    setLoading(true)
    ProtectedAxios.post('/donor/items', { user_id: user.user_id })
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
                <p className='text-center'>There are currently no items to display for your account. Take a moment to add new items and make a positive impact.</p>
                <button className="button button-main" onClick={() => navigate('/add-item')}>Add Item</button>
              </div>
            </div>

            :
            <>
              <h3>All Items</h3>
              <div className='item-list-container'>
                {items.map((item, i) => {
                  return (
                    <div className='item' key={i} onClick={()=>navigate(`/item/${item.item_id}`)}>
                      <div className='image' style={{ backgroundImage: `url('${process.env.REACT_APP_BASE_URL}${item.pictureSrc}')` }} />
                      <div className='name' title={item.name}>{item.name.substring(0, 25)} {item.name.length > 25 && '...'}</div>
                      <div className='desc'>{item.description.substring(0, 90)} {item.description.length > 90 && '....'}</div>
                      <div className='requests-container'><FaUserFriends /><div className='requests'><span className='text-success'>20</span> requests</div></div>
                      <span className='active' />
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

export default DonorAllRequests