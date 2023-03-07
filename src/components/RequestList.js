import React, { useEffect, useState } from 'react'
import ProtectedAxios from '../api/protectedAxios'
import { BsFillImageFill } from 'react-icons/bs'
import Modal from 'react-bootstrap/Modal';
import { AiOutlineClose } from 'react-icons/ai'

const RequestList = ({ item_id }) => {
    const [loading, setLoading] = useState(true)
    const [requests, setRequests] = useState([])


    const [selectedImgSrc, setSelectedImgSrc] = useState('')
    const [showImage, setShowImage] = useState(false);
    const closeImageModal = () => { setShowImage(false) };
    const showImageModal = () => { setShowImage(true) };



    useEffect(() => {
        fetchItemRequests()
    }, [])

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
    return (
        <div className='mt-5 pt-5'>
            <h4>Requests</h4>
            {!loading
                &&
                <div className='request-list-container'>
                    {!requests.length
                        ? <p className='text-danger mt-3'>No Requests Found</p>

                        :
                        <div className='request-list-container'>
                            {requests.map((request, i) => {
                                return (
                                    <div className='request'>
                                        {/* <div className='profile-picture' style={{ backgroundImage: `url(${request.profilePictureSrc ? `${process.env.REACT_APP_BASE_URL}${request.profilePictureSrc}` : 'https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'})` }} /> */}
                                        <div className='details'>
                                            <div className='details-top'>{request.name}</div>
                                            <div className='details-bottom'>{request.yearlyIncome}</div>
                                        </div>
                                        <div className='actions'>
                                            <div className='edit-btn-container'>
                                                <button className='edit-btn' value={request.rationCardSrc} onClick={(e) => { setSelectedImgSrc(e.target.value); showImageModal() }}><BsFillImageFill className='edit-icon' /></button>
                                                <button>Accept</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    }
                </div>
            }



            {/* View ration card image modal */}
            <Modal className='full-width-modal' show={showImage} onHide={closeImageModal} centered size="xl">
                <Modal.Header >
                    <Modal.Title className='h-100 w-100 d-flex justify-content-between align-center'>
                        View Image
                        <AiOutlineClose className='' style={{ cursor: 'pointer' }} role='button' onClick={closeImageModal} />
                    </Modal.Title>
                </Modal.Header>
                < Modal.Body >
                    <div className='ration-car-img-container'>
                        <img src={`${process.env.REACT_APP_BASE_URL}${selectedImgSrc}`} className='ration-card-img' />
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