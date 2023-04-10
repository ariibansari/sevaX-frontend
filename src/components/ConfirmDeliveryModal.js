import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { AiOutlineClose } from 'react-icons/ai';
import { MdCelebration } from 'react-icons/md';
import ProtectedAxios from '../api/protectedAxios';

const ConfirmDeliveryModal = ({ item_name, user_id, profilePictureSrc, needy_name, delivery_id, fetchItems }) => {

  const [codeModal, setCodeModal] = useState(false)
  const closeCodeModal = () => {
    if (!confirming) {
      setCodeModal(false)
    }
    if (delivered) {
      fetchItems()
    }
    setError("")
    setDeliveryCode("")
  }
  const showCodeModal = () => { setCodeModal(true) }

  const [deliveryCode, setDeliveryCode] = useState('')
  const [confirming, setConfirming] = useState(false)
  const [error, setError] = useState("")

  const [delivered, setDelivered] = useState(false)

  useEffect(() => {
    setError("")
  }, [deliveryCode])

  const confirmDelivery = e => {
    e.preventDefault()
    setConfirming(true)
    setError("")
    ProtectedAxios.post("/donor/item/confirmDelivery", { delivery_id, user_id, delivery_code: deliveryCode })
      .then(res => {
        if (res.data) {
          setDelivered(true)
          setConfirming(false)
        }
      })
      .catch(error => {
        if (error.response.status === 400) {
          setError(error.response.data.error)
        }
        if (error.response.status === 500) {
          alert(error.response.data.error)
        }
        setConfirming(false)
      })
  }

  return (
    <>
      <button className='button button-sec mt-1 mb-4' onClick={showCodeModal}>Confirm Delivery</button>

      <Modal className='show-code-modal' show={codeModal} onHide={closeCodeModal} centered size="sm">
        <Modal.Header >
          <Modal.Title className='h-100 w-100 d-flex justify-content-between align-center'>
            Confirm Delivery
            <AiOutlineClose className='' style={{ cursor: 'pointer' }} role='button' onClick={closeCodeModal} />
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={confirmDelivery}>
          < Modal.Body >
            {!delivered
              ?
              <>
                <div className='show-code-container'>
                  <p className='item-name' title={item_name}>{item_name} - </p>
                  <div className='item-profile-container my-3 px-0 justify-content-start'>
                    <div className='item-card-profile mx-0' title={needy_name} style={{ backgroundImage: `url(${profilePictureSrc ? `${process.env.REACT_APP_BASE_URL}${profilePictureSrc}` : 'https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'})` }} />
                    <div className='donor_name'>Deliver to {needy_name.substring(0, 16)}{needy_name.length > 16 && '...'}</div>
                  </div>
                  <div className='input-grp mt-4'>
                    <label htmlFor="delivery-code">Delivery Code <span className='text-danger'>*</span></label>
                    <input required autoFocus type="number" id="delivery-code" value={deliveryCode} onChange={e => setDeliveryCode(e.target.value)} />
                  </div>
                </div>
                <p className='text-danger mt-1'>{error}</p>
              </>

              :
              <div className='d-flex flex-column justify-content-center align-items-center'>
                <img style={{ width: "40%" }} src="https://developers.giphy.com/branch/master/static/confetti-0f9eab9b22b390e18bf9b433aedc27c2.gif" />
                <h5>Delivery Confirmed</h5>
                <p className='text-center'>Thanks for your donation. Your donation is completed and is received by <span style={{ textTransform: "capitalize", fontWeight: "600" }}>{needy_name}</span>.</p>
              </div>
            }
          </Modal.Body>
          <Modal.Footer>
            {!delivered
              ?
              <button type='submit' className='button my-4 mx-3' disabled={confirming}>
                {confirming
                  ?
                  <>
                    Confirm
                    <div className="mx-2 spinner-border spinner-border-sm" role="status">
                      <span className="sr-only"></span>
                    </div>
                  </>
                  : "Confirm"
                }
              </button>

              :
              <button type="button" onClick={closeCodeModal} className='btn btn-danger my-3'>close</button>
            }
          </Modal.Footer>
        </form>
      </Modal >
    </>
  )
}

export default ConfirmDeliveryModal