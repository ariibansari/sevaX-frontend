import React, { useContext, useEffect, useState } from 'react'
import { TfiDropboxAlt } from 'react-icons/tfi'
import { useNavigate } from 'react-router-dom'
import ProtectedAxios from '../api/protectedAxios'
import { UserContext } from '../context/UserProvider'
import { CiUser } from 'react-icons/ci'
import { FaUserInjured, FaUserFriends } from 'react-icons/fa'
import { MdOutlineDone, MdPending } from 'react-icons/md'
import ConfirmDeliveryModal from '../components/ConfirmDeliveryModal'


const AllItems = () => {
  const [user] = useContext(UserContext)
  const [items, setItems] = useState([])
  const [itemsBackup, setItemsBackup] = useState([])
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  const [selectedFilter, setSelectedFilter] = useState('')

  useEffect(() => {
    fetchItems()
  }, [])

  useEffect(() => {
    filterItems()
  }, [selectedFilter])

  const fetchItems = () => {
    setLoading(true)
    ProtectedAxios.post('/donor/items', { user_id: user.user_id })
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
      if (selectedFilter === 0) {
        const a =
          itemsBackup.filter(item => {
            if (item.request_count > 0 && item.delivery_status === null) {
              return item
            }
          })
        setItems(a)
      }
      else if (selectedFilter === 1) {
        const a =
          itemsBackup.filter(item => {
            if (item.delivery_status === 0) {
              return item
            }
          })
        setItems(a)
      }
      else {
        const a =
          itemsBackup.filter(item => {
            if (item.delivery_status === 1) {
              return item
            }
          })
        setItems(a)
      }

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
                <p className='text-center'>There are currently no items to display for your account. Take a moment to add new items and make a positive impact.</p>
                <button className="button button-main" onClick={() => navigate('/add-item')}>Add Item</button>
              </div>
            </div>

            :
            <>
              <div className='heading-container'>
                <h3>All Items</h3>
                <div className='legend-container'>
                  <span className={`legend px-4 ${selectedFilter === '' && 'active'}`} onClick={() => { if (selectedFilter !== "") { setSelectedFilter('') } else { setSelectedFilter('') } }}>All</span>
                  <span className={`legend px-4 ${selectedFilter === 0 && 'active'}`} onClick={() => { if (selectedFilter !== 0) { setSelectedFilter(0) } else { setSelectedFilter('') } }}>Requests</span>
                  <span className={`legend px-4 ${selectedFilter === 1 && 'active'}`} onClick={() => { if (selectedFilter !== 1) { setSelectedFilter(1) } else { setSelectedFilter('') } }}>Delivery Pending</span>
                  <span className={`legend px-4 ${selectedFilter === 2 && 'active'}`} onClick={() => { if (selectedFilter !== 2) { setSelectedFilter(2) } else { setSelectedFilter('') } }}>Delivered</span>
                </div>
              </div>
              <div className='item-list-container'>
                {items.length > 0
                  ?
                  <>
                    {items.map((item, i) => {
                      return (
                        <div className='item' key={i}>
                          <div onClick={() => navigate(`/item/${item.item_id}`)} className='image' style={{ backgroundImage: `url('${process.env.REACT_APP_BASE_URL}${item.pictureSrc}')` }} />
                          <div onClick={() => navigate(`/item/${item.item_id}`)} className='name' title={item.name}>{item.name.substring(0, 25)} {item.name.length > 25 && '...'}</div>
                          <div onClick={() => navigate(`/item/${item.item_id}`)} className='desc'>
                            {item.delivery_status === null
                              ?
                              item.description.substring(0, 180)
                              :
                              item.description.substring(0, 90)
                            }
                            {item.description.length > 90 && '....'}
                          </div>
                          <div className='mx-4' style={{ height: "" }}>
                            {item.delivery_status === 0
                              &&
                              <ConfirmDeliveryModal item_id={item.item_id} item_name={item.name} needy_name={item.needy_name} profilePictureSrc={item.profilePictureSrc} user_id={item.user_id} delivery_id={item.delivery_id} fetchItems={fetchItems} />
                            }
                            {item.delivery_status === 1
                              &&
                              <div className='item-profile-container px-0 mb-4 justify-content-start' style={{ marginTop: "10px" }}>
                                <div className='item-card-profile mx-0' title={item.needy_name} style={{ backgroundImage: `url(${item.profilePictureSrc ? `${process.env.REACT_APP_BASE_URL}${item.profilePictureSrc}` : 'https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'})` }} />
                                <div className='donor_name'>to {item.needy_name.substring(0, 16)}{item.needy_name.length > 16 && '...'}</div>
                              </div>
                            }
                          </div>
                          <div className='requests-container'>
                            {item.delivery_status !== null
                              ?
                              <>
                                {item.delivery_status === 0
                                  ? <><MdPending style={{ fill: "var(--clr-status-pending)" }} /><div className='requests'>Delivery Pending</div></>
                                  : <><MdOutlineDone style={{ fill: "var(--clr-status-accepted)" }} /><div className='requests'>Delivered on {new Date(item.delivered_on).toDateString()}</div></>
                                }
                              </>

                              :
                              <>
                                <FaUserFriends /><div className='requests'><span className={`${item.request_count > 0 && 'text-success'}`}>{item.request_count}</span> requests</div>
                              </>
                            }
                          </div>
                          {item.delivery_status === null && item.request_count > 0
                            &&
                            <span className='active' />
                          }
                        </div>
                      )
                    })}
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

export default AllItems