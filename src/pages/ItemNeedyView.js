import React, { useContext, useEffect, useState } from 'react'
import { TfiDropboxAlt } from 'react-icons/tfi';
import { MdKeyboardBackspace, MdDone, MdOutlineDone, MdOutlineCancel } from 'react-icons/md';
import { BsClockHistory } from 'react-icons/bs';
import { FcCancel } from 'react-icons/fc';
import { useNavigate, useParams } from 'react-router-dom'
import ProtectedAxios from '../api/protectedAxios';
import { UserContext } from '../context/UserProvider'
import { RiTruckFill } from 'react-icons/ri'
import { MdPending } from 'react-icons/md'
import ShowDeliveryCodeModal from '../components/ShowDeliveryCodeModal';


const Item = () => {
    const [user] = useContext(UserContext)
    const { item_id } = useParams();
    const [loading, setLoading] = useState(true)
    const [loadingRequestStatus, setLoadingRequestStatus] = useState(true)
    const [item, setItem] = useState('')
    const [itemRequestStatus, setItemRequestStatus] = useState([])
    const [applied, setApplied] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        fetchItemRequestStatus()
        fetchItem()
    }, [])

    const fetchItemRequestStatus = () => {
        setLoadingRequestStatus(true)
        ProtectedAxios.post(`/needy/item/requestStatus`, { user_id: user.user_id, item_id })
            .then(res => {
                setItemRequestStatus(res.data)
                setLoadingRequestStatus(false)
            })
            .catch(err => {
                alert(err.response.data.error)
                setLoadingRequestStatus(false)
            })
    }
    const fetchItem = () => {
        setLoading(true)
        ProtectedAxios.get(`/donor/item/${item_id}`, { user_id: user.user_id })
            .then(res => {
                if (res.data.length !== 0) {
                    setItem(res.data[0])
                }
                setLoading(false)
            })
            .catch(err => {
                alert(err.response.data.error)
                setLoading(false)
            })
    }

    const requestForItem = () => {
        setLoading(true)
        ProtectedAxios.post(`/needy/item/addRequest`, { user_id: user.user_id, item_id })
            .then(res => {
                if (res.data) {
                    fetchItemRequestStatus()
                    setLoading(false)
                }
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
                                <div className='btn-container' style={{ alignItems: 'flex-start' }}>
                                    <p className='subtitle text-danger'>{ }</p>
                                    <>
                                        {!itemRequestStatus.length
                                            ?
                                            <button
                                                type="submit"
                                                className={`button button-main`}
                                                disabled={loading}
                                                onClick={() => requestForItem()}
                                            >
                                                {loading
                                                    ? <div className="spinner-border spinner-border-sm" role="status">
                                                        <span className="sr-only"></span>
                                                    </div>

                                                    :
                                                    "Request for item"
                                                }
                                            </button>

                                            :
                                            <>
                                                <div className='request-status-container'>
                                                    {itemRequestStatus[0].request_status === 0
                                                        ?
                                                        <>
                                                            <BsClockHistory className='status-icon pending' />
                                                            <p className='status-msg'>Request Sent</p>
                                                        </>
                                                        :
                                                        <>
                                                            {itemRequestStatus[0].request_status === 1
                                                                ?
                                                                <>
                                                                    {itemRequestStatus[0].delivery_status === 1
                                                                        ?
                                                                        <>
                                                                            <MdOutlineDone className='status-icon accepted' />
                                                                            <p className='status-msg'>Item Received on {new Date(itemRequestStatus[0].delivered_at).toDateString()}</p>
                                                                        </>

                                                                        :
                                                                        <div className=''>
                                                                            <div className='d-flex align-items-center gap-2'>
                                                                                <MdPending className='status-icon pending' />
                                                                                <p className='status-msg'>Request Accepted, delivery pending</p>
                                                                            </div>
                                                                            <div className='my-4'>
                                                                                <ShowDeliveryCodeModal code={itemRequestStatus[0].delivery_code} item_name={item.name} />
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                </>
                                                                :
                                                                <>
                                                                    <FcCancel className='status-icon rejected' />
                                                                    <p className='status-msg'>Request Rejected</p>
                                                                </>
                                                            }
                                                        </>
                                                    }
                                                </div>
                                            </>

                                        }
                                    </>
                                </div>
                            </div>


                        </div>
                    }
                </>
            }
        </div>
    )
}

export default Item