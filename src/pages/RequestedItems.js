import React, { useContext, useEffect, useState } from 'react'
import { TfiDropboxAlt } from 'react-icons/tfi'
import { useNavigate } from 'react-router-dom'
import ProtectedAxios from '../api/protectedAxios'
import { UserContext } from '../context/UserProvider'

const RequestedItems = () => {
  const [user] = useContext(UserContext)
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const [itemsBackup, setItemsBackup] = useState([])
  const [selectedFilter, setSelectedFilter] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchItems()
  }, [])

  useEffect(() => {
    filterItems()
  }, [selectedFilter])

  const fetchItems = () => {
    setLoading(true)
    ProtectedAxios.post('/needy/getAllRequestedItems', { user_id: user.user_id })
      .then(res => {
        console.log('all item of donor - ', res.data);
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
          console.log(selectedFilter);
          console.log(item.request_status);
          if (item.request_status === selectedFilter) {
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
                <p className='text-center'>We're sorry, there are currently no donation items available to display. We appreciate your patience and encourage you to check back later or browse other categories to find what you need.</p>
                <button className="button button-main" onClick={() => navigate(-1)}>Go Back</button>
              </div>
            </div>

            :
            <>
              <div className='heading-container'>
                <h3>Requested Items</h3>
                <div className='legend-container'>
                  <span className={`legend legend-pending ${selectedFilter === 0 && 'active'}`} onClick={() => { if (selectedFilter !== 0) { setSelectedFilter(0) } else { setSelectedFilter('') } }}>Pending</span>
                  <span className={`legend legend-accepted ${selectedFilter === 1 && 'active'}`} onClick={() => { if (selectedFilter !== 1) { setSelectedFilter(1) } else { setSelectedFilter('') } }}>Accepted</span>
                  <span className={`legend legend-rejected ${selectedFilter === -1 && 'active'}`} onClick={() => { if (selectedFilter !== -1) { setSelectedFilter(-1) } else { setSelectedFilter('') } }}>Rejected</span>
                </div>
              </div>
              <div className='item-list-container'>
                {items.length > 0
                  ?
                  <>
                    {
                      items.map((item, i) => {
                        return (
                          <div className='item' key={i} onClick={() => navigate(`/item/${item.item_id}`)}>
                            <div className='image' style={{ backgroundImage: `url('${process.env.REACT_APP_BASE_URL}${item.pictureSrc}')` }} />
                            <div className='item-status-container'>
                              <span className={`item-status ${item.request_status === 0 ? 'status-pending' : item.request_status === 1 ? 'status-accepted' : 'status-rejected'}`}></span>
                              <div>
                                <div className='name' title={item.name}>{item.name.substring(0, 24)} {item.name.length > 24 && '...'}</div>
                                <div className='desc'>{item.description.substring(0, 55)} {item.description.length > 55 && '....'}</div>
                                {/* <div className='date'>{new Date(item.request_timestamp).toLocaleString('en-US')}</div> */}
                              </div>
                            </div>
                            <div className='item-profile-container'>
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

export default RequestedItems