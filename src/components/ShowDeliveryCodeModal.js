import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { AiOutlineClose } from 'react-icons/ai';

const ShowDeliveryCodeModal = ({ code, item_name, delivery_status=0, delivered_at }) => {

  const [codeModal, setCodeModal] = useState(false)
  const closeCodeModal = () => { setCodeModal(false) }
  const showCodeModal = () => { setCodeModal(true) }

  return (
    <>
      {delivery_status === 0
        ?
        <button className='button button-sec mt-1 mb-4' onClick={showCodeModal}>Show Delivery Code</button>
        :
        <button className='button button-ghost mt-1 mb-4'>Received on {new Date(delivered_at).toDateString()}</button>
      }
      {/* <button className='button button-sec mt-1 mb-4' onClick={showCodeModal}>Show Delivery Code</button> */}
      <Modal className='show-code-modal' show={codeModal} onHide={closeCodeModal} centered size="sm">
        <Modal.Header >
          <Modal.Title className='h-100 w-100 d-flex justify-content-between align-center'>
            Delivery Code
            <AiOutlineClose className='' style={{ cursor: 'pointer' }} role='button' onClick={closeCodeModal} />
          </Modal.Title>
        </Modal.Header>
        < Modal.Body >
          <div className='show-code-container'>
            <p className='item-name'>{item_name} - </p>
            <p className='item-code'>{code}</p>
            <p className='info'>This is a secret code only share it with the donor once you receive the donation item.</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={closeCodeModal} className='btn btn-danger my-4 mx-3'>
            Close
          </button>
        </Modal.Footer>
      </Modal >
    </>
  )
}

export default ShowDeliveryCodeModal