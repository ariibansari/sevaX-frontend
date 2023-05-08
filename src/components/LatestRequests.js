import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserProvider'
import { NavLink, useNavigate } from 'react-router-dom'
import ProtectedAxios from '../api/protectedAxios'

const LatestRequests = () => {
    const [user] = useContext(UserContext)
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetchItems()
    }, [])

    const fetchItems = () => {
        setLoading(true)
        ProtectedAxios.post('/donor/getLatestRequests', { user_id: user.user_id, limit: 3 })
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
        <section className='pt-4'>
            <div className='header d-flex justify-content-between align-items-center'>
                <h3>New Requests</h3>
                {items.length > 2
                    &&
                    <NavLink to='/all-item'>show all</NavLink>
                }
            </div>
            {loading
                ? "loading"
                :
                <div className='item-list-container'>
                    {items.length === 0
                        ? <p className='subtitle'>You don't have any requests.</p>
                        :
                        <>
                            {items.map((item, i) => {
                                return (
                                    <div className='item mt-3' style={{}} key={i} onClick={() => navigate(`/item/${item.item_id}`)}>
                                        <div className='image' style={{ backgroundImage: `url('${process.env.REACT_APP_BASE_URL}${item.item_pictureSrc}')` }} />
                                        <div className='name' title={item.item_name}>{item.item_name.substring(0, 25)} {item.item_name.length > 25 && '...'}</div>
                                        <div className='desc'>{item.item_description.substring(0, 60)} {item.item_description.length > 60 && '....'}</div>
                                        <div className='item-profile-container'>
                                            <div className='item-card-profile' title={item.needy_name} style={{ backgroundImage: `url(${item.needy_profilePictureSrc ? `${process.env.REACT_APP_BASE_URL}${item.needy_profilePictureSrc}` : 'https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'})` }} />
                                            <div className='donor_name'>by {item.needy_name.substring(0, 18)}{item.needy_name.length > 18 && '...'}</div>
                                        </div>
                                    </div>
                                )
                            })}
                        </>
                    }
                </div>
            }
        </section>
    )
}

export default LatestRequests