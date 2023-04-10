import React, { useContext, useEffect, useState } from 'react'
import { TfiDropboxAlt, TfiEye } from 'react-icons/tfi'
import { useNavigate } from 'react-router-dom'
import ProtectedAxios from '../api/protectedAxios'
import { UserContext } from '../context/UserProvider'
import ShowDeliveryCodeModal from '../components/ShowDeliveryCodeModal'

const AcceptedItems = () => {
  const [user] = useContext(UserContext)
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const [itemsBackup, setItemsBackup] = useState([])
  const [selectedFilter, setSelectedFilter] = useState('')
  const navigate = useNavigate()


  useEffect(() => {
    fetchAcceptedItems()
  }, [])

  useEffect(() => {
    filterItems()
  }, [selectedFilter])

  const fetchAcceptedItems = () => {
    setLoading(true)
    ProtectedAxios.post('/needy/getAllAcceptedItems', { user_id: user.user_id })
      .then(res => {
        console.log('accepted item of donor - ', res.data);
        setItems(res.data)
        setItemsBackup(res.data)
        setLoading(false)
      })
      .catch(err => {
        alert(err.response.data.error)
        setLoading(false)
      })
  }

  const filterItems = () => {
    if (selectedFilter === '') {
      setItems(itemsBackup)
    } else {
      const a =
        itemsBackup.filter(item => {
          if (item.delivery_status === selectedFilter) {
            return item
          }
        })
      setItems(a)
    }
  }

  return (
    <div className='container py-5'>
      {!loading
        &&
        <>
          {itemsBackup.length === 0
            ?
            <div className='container box'>
              <div className='flexed-container column'>
                <TfiDropboxAlt className='pending-icon' />
                <h2>No Items Found</h2>
                <p className='text-center'>There are currently no accepted items to view. If the request for any item is accepted you can see them here.</p>
                <button className="button button-main" onClick={() => navigate(-1)}>Go Back</button>
              </div>
            </div>

            :
            <>
              <div className='heading-container'>
                <h3>Accepted Items</h3>
                <div className='legend-container'>
                  <span className={`legend px-4 ${selectedFilter === '' && 'active'}`} onClick={() => { if (selectedFilter !== "") { setSelectedFilter('') } else { setSelectedFilter('') } }}>All</span>
                  <span className={`legend legend-pending ${selectedFilter === 0 && 'active'}`} onClick={() => { if (selectedFilter !== 0) { setSelectedFilter(0) } else { setSelectedFilter('') } }}>Delivery Pending</span>
                  <span className={`legend legend-accepted ${selectedFilter === 1 && 'active'}`} onClick={() => { if (selectedFilter !== 1) { setSelectedFilter(1) } else { setSelectedFilter('') } }}>Delivered</span>
                </div>
              </div>
              <div className='item-list-container'>
                {items.length > 0
                  ?
                  <>
                    {
                      items.map((item, i) => {
                        return (
                          <div className='item' key={i}
                          // onClick={() => { navigate(`/item/${item.item_id}`) }}
                          >
                            <div onClick={() => { navigate(`/item/${item.item_id}`) }} className='image' style={{ backgroundImage: `url('${process.env.REACT_APP_BASE_URL}${item.pictureSrc}')` }} />
                            <div className='item-status-container'>
                              <span className={`item-status ${item.delivery_status === 0 ? 'status-pending' : item.delivery_status === 1 ? 'status-accepted' : 'status-rejected'}`}></span>
                              <div>
                                <div onClick={() => { navigate(`/item/${item.item_id}`) }} className='name' title={item.name}>{item.name.substring(0, 24)} {item.name.length > 24 && '...'}</div>
                                <div onClick={() => { navigate(`/item/${item.item_id}`) }} className='desc'>{item.description.substring(0, 55)} {item.description.length > 55 && '....'}</div>
                                {/* <div className='date'>{new Date(item.request_timestamp).toLocaleString('en-US')}</div> */}
                              </div>
                            </div>
                            <div className='d-flex justify-content-center'>
                              <ShowDeliveryCodeModal code={item.delivery_code} item_name={item.name} delivery_status={item.delivery_status} delivered_at={item.delivered_at} />
                            </div>
                            <div className='item-profile-container' onClick={() => { navigate(`/item/${item.item_id}`) }}>
                              <div className='item-card-profile' title={item.donor_name} style={{ backgroundImage: `url(${item.profilePictureSrc ? `${process.env.REACT_APP_BASE_URL}${item.profilePictureSrc}` : 'https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'})` }} />
                              <div className='donor_name'>by {item.donor_name.substring(0, 18)}{item.donor_name.length > 18 && '...'}</div>
                            </div>
                          </div>
                        )
                      })
                    }
                  </>

                  :
                  <p className='text-danger my-5'>No Items Found</p>

                }
              </div>
            </>
          }
        </>
      }
    </div>
  )
}

export default AcceptedItems