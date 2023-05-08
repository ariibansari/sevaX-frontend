import React, { useEffect, useState } from 'react'
import { TfiDropboxAlt } from 'react-icons/tfi';
import { MdKeyboardBackspace } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom'
import ProtectedAxios from '../api/protectedAxios';
import RequestList from '../components/RequestList';

const Item = () => {
    const { item_id } = useParams();
    const [loading, setLoading] = useState(true)
    const [item, setItem] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        fetchItem()
    }, [])

    const fetchItem = () => {
        setLoading(true)
        ProtectedAxios.get(`/donor/item/${item_id}`)
            .then(res => {
                console.log('item details - ', res.data);
                if (res.data.length !== 0) {
                    console.log('here');
                    setItem(res.data[0])
                }
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
                    {item === ''
                        ?
                        <div className='container box'>
                            <div className='flexed-container column'>
                                <TfiDropboxAlt className='pending-icon' />
                                <h2>Item Not Found</h2>
                                <p className='text-center'>The item you are looking for does not exists. Please check the url or refresh the page.</p>
                                <button className="button button-main" onClick={() => navigate('/add-item')}>Go Back</button>
                            </div>
                        </div>

                        :
                        <>
                            <div className='item-view-container'>
                                <div className='item-view-left'>
                                    <div className='item-img' style={{ backgroundImage: `url('${process.env.REACT_APP_BASE_URL}${item.pictureSrc}')` }} />
                                    {/* <img src={`${process.env.REACT_APP_BASE_URL}${item.pictureSrc}`} /> */}
                                </div>
                                <div className='item-view-right'>
                                    <div className='item-header'>
                                        <button className='edit-btn' title='back' onClick={(e) => { navigate(-1) }}><MdKeyboardBackspace className='edit-icon back-icon ' /></button>
                                        <h3>{item.name}</h3>
                                    </div>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                            <RequestList item_id={item_id} item_name={item.name} />
                        </>
                    }
                </>
            }
        </div>
    )
}

export default Item