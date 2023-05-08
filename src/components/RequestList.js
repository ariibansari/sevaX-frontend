import React, { useContext, useEffect, useState } from 'react'
import ProtectedAxios from '../api/protectedAxios'
import { BsFillImageFill, BsFillInfoCircleFill } from 'react-icons/bs'
import Modal from 'react-bootstrap/Modal';
import { AiOutlineClose } from 'react-icons/ai'
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { UserContext } from '../context/UserProvider';
import ConfirmDeliveryModal from './ConfirmDeliveryModal';

const RequestList = ({ item_id, item_name }) => {
    const [user, setUser] = useContext(UserContext)
    const [loading, setLoading] = useState(true)
    const [requests, setRequests] = useState([])
    const [deliveryStatus, setDeliveryStatus] = useState([])
    const [loadingDeliveryStatus, setLoadingDeliveryStatus] = useState(true)

    const [selectedImgSrc, setSelectedImgSrc] = useState('')
    const [showImage, setShowImage] = useState(false);
    const closeImageModal = () => { setShowImage(false) };
    const showImageModal = () => { setShowImage(true) };

    const [selectingNeedy, setSelectingNeedy] = useState(false)
    const [selectingNeedyError, setSelectingNeedyError] = useState(false)
    const [deliveryAddress, setDeliveryAddress] = useState('')
    const [isDeliveryAddressSameAsMainAddress, setIsDeliveryAddressSameAsMainAddress] = useState(false)
    const [selectedNeedy, setSelectedNeedy] = useState(null)
    const [selectNeedyModal, setSelectNeedyModal] = useState(false);
    const closeSelectNeedyModal = () => { setSelectNeedyModal(false) };
    const showSelectNeedyModal = () => { setSelectNeedyModal(true) };

    useEffect(() => {
        fetchItemDeliveryStatus()
        fetchItemRequests()
    }, [])

    const fetchItemDeliveryStatus = () => {
        setLoadingDeliveryStatus(true)
        ProtectedAxios.post('/donor/item/deliveryStatus', { item_id })
            .then(res => {
                console.log('delivery status - ', res.data);
                setDeliveryStatus(res.data)
                setLoadingDeliveryStatus(false)
            })
            .catch(err => {
                alert(err.response.data.error)
                setLoadingDeliveryStatus(false)
            })
    }
    const fetchItemRequests = () => {
        setLoading(true)
        ProtectedAxios.post('/donor/item/requestList', { item_id })
            .then(res => {
                console.log('requests - ', res.data);
                setRequests(res.data)
                setLoading(false)
            })
            .catch(err => {
                alert(err.response.data.error)
                setLoading(false)
            })
    }
    const selectNeedy = () => {
        setSelectingNeedyError('')
        let address = '';
        if (isDeliveryAddressSameAsMainAddress) {
            address = user.address
        } else {
            address = deliveryAddress
        }

        if (address === '') {
            setSelectingNeedyError('Please add a delivery address')
        } else {
            setSelectingNeedy(true)
            ProtectedAxios.post('/donor/item/acceptRequest', { needy_id: selectedNeedy.user_id, donor_id: user.user_id, item_id, delivery_address: address })
                .then(res => {
                    console.log('select needy status - ', res.data);
                    if (res.data) {
                        closeSelectNeedyModal()
                        fetchItemDeliveryStatus()
                        setSelectingNeedy(false)
                    }
                })
                .catch(err => {
                    alert(err.response.data.error)
                    setSelectingNeedy(false)
                })
        }
    }
    return (
        <div className='mt-5 pt-5'>
            {!loadingDeliveryStatus
                &&
                <>
                    {deliveryStatus.length > 0
                        ?
                        <>
                            <h4>Selected Needy</h4>
                            <div className='request'>
                                <div className='profile-picture-container'>
                                    <div className='profile-picture' style={{ backgroundImage: `url(${deliveryStatus[0]?.profilePictureSrc ? `${process.env.REACT_APP_BASE_URL}${deliveryStatus[0]?.profilePictureSrc}` : 'https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'})` }} />
                                </div>
                                <div className='request-right'>
                                    <div className='details'>
                                        <div className='details-top'>{deliveryStatus[0]?.name}</div>
                                        <div className='details-bottom'>
                                            <span className='detail'>₹{deliveryStatus[0]?.yearlyIncome.toLocaleString()}/yr</span>
                                            <span className='seperator' />
                                            <span className='detail'>{deliveryStatus[0]?.sourceOfIncome}</span>
                                            <span className='seperator' />
                                            <span className='detail'>{deliveryStatus[0]?.noOfFamilyMembers} Family Members</span>
                                            <span className='seperator' />
                                            <span className='detail'>{deliveryStatus[0]?.isHeadOfFamily ? 'Head of Family' : 'Not Head of Family'}</span>
                                            {/* <span className='seperator' /> */}
                                        </div>
                                    </div>
                                    <div className='actions'>
                                        {deliveryStatus[0].delivery_status
                                            ? <button className='button button-success cursor-' style={{ minWidth: "20rem", cursor: "inherit" }}>Delivered on {new Date(deliveryStatus[0].updated_at).toDateString()}</button>
                                            : <ConfirmDeliveryModal item_id={item_id} item_name={deliveryStatus[0].item_name} needy_name={deliveryStatus[0]?.name} profilePictureSrc={deliveryStatus[0]?.profilePictureSrc} user_id={user.user_id} delivery_id={deliveryStatus[0]?.delivery_id} fetchItems={fetchItemDeliveryStatus} />
                                        }
                                    </div>
                                </div>
                            </div>
                        </>

                        :
                        <>
                            {!loading
                                &&
                                <>
                                    <h4>Requests</h4>
                                    <div className='request-list-container mt-4'>
                                        {!requests.length
                                            ? <p className='text-danger mt-3'>No Requests Found</p>

                                            :
                                            <div className='request-list-container'>
                                                {requests.map((request, i) => {
                                                    return (
                                                        <div className='request'>
                                                            <div className='profile-picture-container'>
                                                                <div className='profile-picture' style={{ backgroundImage: `url(${request.profilePictureSrc ? `${process.env.REACT_APP_BASE_URL}${request.profilePictureSrc}` : 'https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'})` }} />
                                                            </div>
                                                            <div className='request-right'>
                                                                <div className='details'>
                                                                    <div className='details-top'>{request.name}</div>
                                                                    <div className='details-bottom'>
                                                                        <span className='detail'>₹{request.yearlyIncome.toLocaleString()}/yr</span>
                                                                        <span className='seperator' />
                                                                        <span className='detail'>{request.sourceOfIncome}</span>
                                                                        <span className='seperator' />
                                                                        <span className='detail'>{request.noOfFamilyMembers} Family Members</span>
                                                                        <span className='seperator' />
                                                                        <span className='detail'>{request.isHeadOfFamily ? 'Head of Family' : 'Not Head of Family'}</span>
                                                                        {/* <span className='seperator' /> */}
                                                                    </div>
                                                                    <div className='request-message'>
                                                                        <p>Note from needy: </p>
                                                                        {!request.request_message
                                                                            ? 'no notes'
                                                                            : request.request_message
                                                                        }
                                                                        {/* {request.request_message} */}
                                                                    </div>
                                                                </div>
                                                                <div className='actions'>
                                                                    <div className='edit-btn-container'>
                                                                        <button className='edit-btn' title='view documents' value={JSON.stringify(request)} onClick={(e) => { setSelectedNeedy(JSON.parse(e.target.value)); showImageModal() }}><BsFillImageFill className='edit-icon' /></button>
                                                                        <button className='button button-main' value={JSON.stringify(request)} onClick={e => { setSelectedNeedy(JSON.parse(e.target.value)); showSelectNeedyModal() }}>Accept</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        }
                                    </div>
                                </>
                            }
                        </>
                    }
                </>
            }



            {/* select needy modal */}
            <Modal className='full-width-modal' show={selectNeedyModal} onHide={closeSelectNeedyModal} centered size="xl">
                <Modal.Header >
                    <Modal.Title className='h-100 w-100 d-flex justify-content-between align-center'>
                        Select Needy
                        <AiOutlineClose className='' style={{ cursor: 'pointer' }} role='button' onClick={closeSelectNeedyModal} />
                    </Modal.Title>
                </Modal.Header>
                < Modal.Body >
                    <div className='select-needy-details-container'>
                        <div className='request mt-5 mb-4' style={{ boxShadow: 'none' }}>
                            <div className='profile-picture-container'>
                                <div className='profile-picture' style={{ backgroundImage: `url(${selectedNeedy?.profilePictureSrc ? `${process.env.REACT_APP_BASE_URL}${selectedNeedy?.profilePictureSrc}` : 'https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'})` }} />
                            </div>
                            <div className='request-right'>
                                <div className='details'>
                                    <div className='details-top'>{selectedNeedy?.name}</div>
                                    <div className='details-bottom'>
                                        <span className='detail'>₹{selectedNeedy?.yearlyIncome.toLocaleString()}/yr</span>
                                        <span className='seperator' />
                                        <span className='detail'>{selectedNeedy?.sourceOfIncome}</span>
                                        <span className='seperator' />
                                        <span className='detail'>{selectedNeedy?.noOfFamilyMembers} Family Members</span>
                                        <span className='seperator' />
                                        <span className='detail'>{selectedNeedy?.isHeadOfFamily ? 'Head of Family' : 'Not Head of Family'}</span>
                                        {/* <span className='seperator' /> */}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='input-grp px-4 mb-4'>
                            <div>
                                <label htmlFor="address-textarea">Delivery address <span className='text-danger'>*</span></label>
                                &nbsp;
                                <OverlayTrigger
                                    delay={{ hide: 450, show: 300 }}
                                    overlay={(props) => (
                                        <Tooltip {...props}>
                                            This is the address where you will hand over donation item(s) to '{selectedNeedy?.name}'
                                        </Tooltip>
                                    )}
                                    placement="right"
                                >
                                    <button className='edit-btn'><BsFillInfoCircleFill className='edit-icon' /></button>
                                </OverlayTrigger>
                            </div>
                            <textarea id="address-textarea"
                                required
                                value={isDeliveryAddressSameAsMainAddress ? user.address : deliveryAddress}
                                onChange={e => { setDeliveryAddress(e.target.value); setSelectingNeedyError('') }}
                                disabled={isDeliveryAddressSameAsMainAddress}
                            />

                            <div className='password-options'>
                                <div className='show-password'>
                                    <input type='checkbox' checked={isDeliveryAddressSameAsMainAddress} onChange={() => setIsDeliveryAddressSameAsMainAddress(!isDeliveryAddressSameAsMainAddress)} />
                                    <label onClick={() => { setIsDeliveryAddressSameAsMainAddress(!isDeliveryAddressSameAsMainAddress); setSelectingNeedyError('') }}>same as my address</label>
                                </div>
                                {/* <NavLink to="/">forgot password?</NavLink> */}
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-between align-items-center'>
                    <p className='text-danger mx-4'>{selectingNeedyError}</p>
                    <button onClick={() => selectNeedy()} className='button button-success my-4 mx-3' disabled={selectingNeedy}>
                        {selectingNeedy
                            ?
                            <>
                                Confirming
                                <div className="mx-2 spinner-border spinner-border-sm" role="status">
                                    <span className="sr-only"></span>
                                </div>
                            </>

                            : "Confirm"
                        }
                    </button>
                </Modal.Footer>
            </Modal >


            {/* View ration card image modal */}
            <Modal className='full-width-modal' show={showImage} onHide={closeImageModal} centered size="xl">
                <Modal.Header >
                    <Modal.Title className='h-100 w-100 d-flex justify-content-between align-center'>
                        View Image
                        <AiOutlineClose className='' style={{ cursor: 'pointer' }} role='button' onClick={closeImageModal} />
                    </Modal.Title>
                </Modal.Header>
                < Modal.Body >
                    <p className='px-2 fw-bolder'>Ration Card -</p>
                    <div className='ration-car-img-container'>
                        <img src={`${process.env.REACT_APP_BASE_URL}${selectedNeedy?.rationCardSrc}`} className='ration-card-img' />
                    </div>
                    <br />
                    <hr />
                    <br />
                    <p className='px-2 fw-bolder'>Aadhar Card -</p>
                    <div className='ration-car-img-container'>
                        <img src={`${process.env.REACT_APP_BASE_URL}${selectedNeedy?.aadharCardSrc}`} className='ration-card-img' />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={() => closeImageModal()} className='btn btn-danger my-4 mx-3'>
                        Close
                    </button>
                </Modal.Footer>
            </Modal >
        </div>
    )
}

export default RequestList