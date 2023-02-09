import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import ProtectedAxios from '../api/protectedAxios';
import { RiCheckLine, RiCloseLine } from 'react-icons/ri'
import Modal from 'react-bootstrap/Modal';
import { BsFillImageFill } from 'react-icons/bs'
import { AiOutlineClose, AiOutlineDash } from 'react-icons/ai'
import { thousandSeperator } from '../utils/helper';



const ManageNeedy = () => {
  const [needy, setNeedy] = useState([])
  const [refreshNeedyList, setRefreshNeedyList] = useState(false)


  const [selectedImgSrc, setSelectedImgSrc] = useState('')
  const [showImage, setShowImage] = useState(false);
  const closeImageModal = () => { setShowImage(false) };
  const showImageModal = () => { setShowImage(true) };


  useEffect(() => {
    fetchAllNeedy()
  }, [refreshNeedyList])

  const fetchAllNeedy = () => {
    ProtectedAxios.get('/admin/allNeedy')
      .then(res => {
        console.log('all needy - ', res.data);
        setNeedy(res.data)
      })
      .catch(err => {
        alert(err.response.data.error)
      })
  }

  const disableUser = (_userId) => {
    ProtectedAxios.post('/admin/disableUser', { user_id: _userId })
      .then(res => {
        console.log('disable user status - ', res.data);
        setRefreshNeedyList(!refreshNeedyList)
      })
      .catch(err => {
        alert(err.response.data.error)
      })
  }

  const activateUser = (_userId) => {
    ProtectedAxios.post('/admin/activateUser', { user_id: _userId })
      .then(res => {
        console.log('activate user status - ', res.data);
        setRefreshNeedyList(!refreshNeedyList)
      })
      .catch(err => {
        alert(err.response.data.error)
      })
  }

  return (
    <div className='container py-5'>
      <h2>Manage Needy</h2>
      <p className='subtitle'>Note: Disabling the needy account will prevent needy from loggin in and accessing their dashboard</p>

      <div className='table-container'>
        <Table className='my-table' striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>No. of family members</th>
              <th>Earning member(s) in family</th>
              <th>Yearly income</th>
              <th>Source of income</th>
              <th>Regn. date</th>
              <th>Ration card</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {needy.length > 0
              ?
              <>
                {needy.map((needy, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{needy.name}</td>
                      <td>{needy.email}</td>
                      <td>{needy.phone}</td>
                      <td>{needy.address}</td>
                      <td>{needy.noOfFamilyMembers}</td>
                      <td>{needy.totalEarningMembersInFamily}</td>
                      <td>{thousandSeperator(needy.yearlyIncome)}</td>
                      <td>{needy.sourceOfIncome}</td>
                      <td>{new Date(needy.registrationTimeStamp).toLocaleString('en-GB')}</td>
                      <td>
                        <div className='edit-btn-container'>
                          <button className='edit-btn' value={needy.rationCardSrc} onClick={(e) => { setSelectedImgSrc(e.target.value); showImageModal() }}><BsFillImageFill className='edit-icon' /></button>
                        </div>
                      </td>
                      <td>{needy.isVerified === 1 ? <>{needy.isActive ? 'Active' : 'Disabled'}</> : 'Request Declined'}</td>
                      <td>
                        <div className='edit-btn-container'>
                          {needy.isVerified === 2
                            ?
                            <button disabled className='edit-btn' title="can't activate/disable account for declined users"><AiOutlineDash className='edit-icon reject-icon' /></button>

                            : <>
                              {needy.isActive
                                ?
                                <button className='edit-btn' title='disable account' value={needy.user_id} onClick={(e) => { disableUser(e.target.value) }}><RiCloseLine className='edit-icon reject-icon ' /></button>

                                :
                                <button className='edit-btn' title='activate account' value={needy.user_id} onClick={(e) => { activateUser(e.target.value) }}><RiCheckLine className='edit-icon accept-icon ' /></button>
                              }
                            </>
                          }
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </>


              :
              <tr>
                <td colSpan={7} className='text-center p-5 text-danger'>no needy found</td>
              </tr>
            }


          </tbody>
        </Table>
      </div>

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

export default ManageNeedy