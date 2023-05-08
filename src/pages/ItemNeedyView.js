import React, { useContext, useEffect, useState } from 'react'
import { TfiDropboxAlt } from 'react-icons/tfi';
import { MdKeyboardBackspace, MdDone, MdOutlineDone, MdOutlineCancel } from 'react-icons/md';
import { BsClockHistory, BsFillInfoCircleFill } from 'react-icons/bs';
import { FcCancel } from 'react-icons/fc';
import { useNavigate, useParams } from 'react-router-dom'
import ProtectedAxios from '../api/protectedAxios';
import { UserContext } from '../context/UserProvider'
import { RiTruckFill } from 'react-icons/ri'
import { MdPending } from 'react-icons/md'
import ShowDeliveryCodeModal from '../components/ShowDeliveryCodeModal';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineClose } from 'react-icons/ai'
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'


const Item = () => {
    const [user] = useContext(UserContext)
    const { item_id } = useParams();
    const [loading, setLoading] = useState(true)
    const [loadingRequestStatus, setLoadingRequestStatus] = useState(true)
    const [item, setItem] = useState('')
    const [itemRequestStatus, setItemRequestStatus] = useState([])
    const [applied, setApplied] = useState(false)
    const navigate = useNavigate()

    const [requestMessage, setRequestMessage] = useState('')

    const [confirmRequestModal, setConfirmRequestModal] = useState(false);
    const closeConfirmRequestModal = () => { setConfirmRequestModal(false) };
    const showConfirmRequestModal = () => { setConfirmRequestModal(true) };

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

    const requestForItem = e => {
        e.preventDefault()
        setLoading(true)
        ProtectedAxios.post(`/needy/item/addRequest`, { user_id: user.user_id, item_id, request_message: requestMessage })
            .then(res => {
                if (res.data) {
                    fetchItemRequestStatus()
                    setLoading(false)
                    closeConfirmRequestModal()
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
                                                onClick={() => showConfirmRequestModal()}
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

            {/* Confirm Request Modal */}
            <Modal className='full-width-modal' show={confirmRequestModal} onHide={closeConfirmRequestModal} centered size="md">
                <Modal.Header >
                    <Modal.Title className='h-100 w-100 d-flex justify-content-between align-center'>
                        Confirm Request
                        <AiOutlineClose className='' style={{ cursor: 'pointer' }} role='button' onClick={closeConfirmRequestModal} />
                    </Modal.Title>
                </Modal.Header>
                <form onSubmit={requestForItem}>
                    < Modal.Body >
                        <div className='input-grp my-4 px-2'>
                            <label htmlFor="address-textarea">
                                Note for donor
                                <OverlayTrigger
                                    delay={{ hide: 450, show: 300 }}
                                    overlay={(props) => (
                                        <Tooltip {...props}>
                                            anything that the donor should know that would help them choose you for the donation
                                        </Tooltip>
                                    )}
                                    placement="right"
                                >
                                    <button type="button" className='tooltip-button'><BsFillInfoCircleFill /></button>
                                </OverlayTrigger>
                            </label>
                            <textarea id="address-textarea"
                                placeholder='leave blank if N/A'
                                value={requestMessage} onChange={e => setRequestMessage(e.target.value)} />
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <button type='button' onClick={() => closeConfirmRequestModal()} className='button button-danger my-4 mx-3'>
                            Close
                        </button>
                        <button type='submit' className='button my-4 mx-3' disabled={loading}>
                            {loading
                                ?
                                <>
                                    Send request
                                    <div className="mx-2 spinner-border spinner-border-sm" role="status">
                                        <span className="sr-only"></span>
                                    </div>
                                </>

                                :
                                "Send request"
                            }
                        </button>
                    </Modal.Footer>
                </form>
            </Modal >
        </div>
    )
}

export default Item