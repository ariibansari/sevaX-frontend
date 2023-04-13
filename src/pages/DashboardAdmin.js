import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserProvider'
import { SlRefresh } from 'react-icons/sl'
import ProtectedAxios from '../api/protectedAxios'
import Table from 'react-bootstrap/Table';
import { BsFillImageFill } from 'react-icons/bs'
import Modal from 'react-bootstrap/Modal';
import { AiOutlineClose } from 'react-icons/ai'
import { RiCheckLine, RiCloseLine } from 'react-icons/ri'
import { thousandSeperator } from '../utils/helper';


const DashboardAdmin = () => {
  const [user, setUser] = useContext(UserContext)

  const [donorStats, setDonorStats] = useState('')
  const [refreshDonorStatus, setRefreshDonorStatus] = useState(false);

  const [needyStats, setNeedyStats] = useState('')
  const [refreshNeedyStats, setRefreshNeedyStats] = useState(false);

  const [donationStats, setDonationStats] = useState('')
  const [refreshDonationStats, setRefreshDonationStats] = useState(false);

  const [needyRequests, setNeedyRequests] = useState('')
  const [refreshNeedyRequests, setRefreshNeedyRequests] = useState(false)

  const [selectedNeedy, setSelectedNeedy] = useState('')
  const [showImage, setShowImage] = useState(false);
  const closeImageModal = () => { setShowImage(false) };
  const showImageModal = () => { setShowImage(true) };

  const [showCompleteNote, setShowCompleteNote] = useState(false);
  const closeNoteModal = () => { setShowCompleteNote(false) };
  const showNoteModal = () => { setShowCompleteNote(true) };

  useEffect(() => {
    getDonorStats()
  }, [refreshDonorStatus])

  useEffect(() => {
    getNeedyStats()
  }, [refreshNeedyStats])

  useEffect(() => {
    getNeedyRequests()
  }, [refreshNeedyRequests])

  const getDonorStats = () => {
    ProtectedAxios.get('/admin/donorStats')
      .then(res => {
        console.log('donor stats - ', res.data[0]);
        setDonorStats(res.data[0])
      })
      .catch(err => {
        alert(err.response.data.error)
      })
  }
  const getNeedyStats = () => {
    ProtectedAxios.get('/admin/needyStats')
      .then(res => {
        console.log('needy stats - ', res.data[0]);
        setNeedyStats(res.data[0])
      })
      .catch(err => {
        alert(err.response.data.error)
      })
  }

  const getNeedyRequests = () => {
    ProtectedAxios.get('/admin/needyRequests')
      .then(res => {
        console.log('needy requests - ', res.data);
        setNeedyRequests(res.data)
      })
      .catch(err => {
        alert(err.response.data.error)
      })
  }

  const acceptNeedyRequests = (_needyId) => {
    console.log('selected needyId - ', _needyId);
    ProtectedAxios.post('/admin/acceptNeedyRequest', { needy_id: _needyId })
      .then(res => {
        console.log('is needy request accepted  - ', res.data);
        if (res.data) {
          setRefreshNeedyRequests(!refreshNeedyRequests)
        }
      })
      .catch(err => {
        alert(err.response.data.error)
      })
  }

  const rejectNeedyRequests = (_needyId) => {
    console.log('selected needyId - ', _needyId);
    ProtectedAxios.post('/admin/rejectNeedyRequest', { needy_id: _needyId })
      .then(res => {
        console.log('is needy request rejected  - ', res.data);
        if (res.data) {
          setRefreshNeedyRequests(!refreshNeedyRequests)
        }
      })
      .catch(err => {
        alert(err.response.data.error)
      })
  }


  return (
    <div className='container py-5'>
      <h2>Welcome, {user.name}</h2>
      <div className='stats-container'>
        <span className='stat stat1'>
          <div className='header'>
            <p className='stat-title'>Total Donors</p>
            <SlRefresh style={{ transform: refreshDonorStatus ? 'rotate(-170deg)' : 'rotate(0deg)' }} onClick={() => setRefreshDonorStatus(!refreshDonorStatus)} className='refresh-icon' />
          </div>
          <div className='body'>
            <p className='stat-data'>{donorStats ? donorStats.totalDonors : '-'}</p>
          </div>
          <div className='footer'>
            {donorStats ? <>{donorStats.noOfDonorsRegisteredToday <= 0 ? <span className='text-danger'>{donorStats.noOfDonorsRegisteredToday}</span> : <span className='text-success'>+{donorStats.noOfDonorsRegisteredToday}</span>}</> : '-'} joined today
          </div>
        </span>
        <span className='stat stat2'>
          <div className='header'>
            <p className='stat-title'>Total Needy</p>
            <SlRefresh style={{ transform: refreshNeedyStats ? 'rotate(-170deg)' : 'rotate(0deg)' }} onClick={() => setRefreshNeedyStats(!refreshNeedyStats)} className='refresh-icon' />
          </div>
          <div className='body'>
            <p className='stat-data'>{needyStats ? needyStats.totalNeedy : '-'}</p>
          </div>
          <div className='footer'>
            {needyStats ? <>{needyStats.noOfNeedyRegisteredToday <= 0 ? <span className='text-danger'>{needyStats.noOfNeedyRegisteredToday}</span> : <span className='text-success'>+{needyStats.noOfNeedyRegisteredToday}</span>}</> : '-'} joined today
          </div>
        </span>
        <span className='stat stat3'>
          <div className='header'>
            <p className='stat-title'>Total Donations</p>
            <SlRefresh style={{ transform: refreshDonationStats ? 'rotate(-170deg)' : 'rotate(0deg)' }} onClick={() => setRefreshDonationStats(!refreshDonationStats)} className='refresh-icon' />
          </div>
          <div className='body'>
            <p className='stat-data'>1,520</p>
          </div>
          <div className='footer'>
            +5 than yesterday
          </div>
        </span>
      </div>

      <section className='section'>
        <h4 className='section-title'>Needy Requests</h4>
        <p className='subtitle'>Note: Once request is granted, it can't be revoked.</p>

        <div className='table-container'>
          <Table className='my-table' striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>No. of family member(s)</th>
                <th>Earning member(s) in family</th>
                <th>Yearly income</th>
                <th>Source of income</th>
                <th>Regn. date</th>
                <th>Documents</th>
                <th>Note from needy</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {needyRequests.length > 0
                ?
                <>
                  {needyRequests.map((request, i) => {
                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{request.name}</td>
                        <td>{request.email}</td>
                        <td>{request.noOfFamilyMembers}</td>
                        <td>{request.totalEarningMembersInFamily}</td>
                        <td>{thousandSeperator(request.yearlyIncome)}</td>
                        <td>{request.sourceOfIncome}</td>
                        <td>{new Date(request.registrationTimeStamp).toLocaleString('en-us')}</td>
                        <td>
                          <div className='edit-btn-container'>
                            <button className='edit-btn' value={JSON.stringify(request)} onClick={(e) => { setSelectedNeedy(JSON.parse(e.target.value)); showImageModal() }}><BsFillImageFill className='edit-icon' /></button>
                          </div>
                        </td>
                        <td>{request.noteForAdmin.length < 40 ? request.noteForAdmin : <>{request.noteForAdmin.substring(0, 40)}...<br /><button className='text-only-button' value={JSON.stringify(request)} onClick={e => { console.log(e.target.value); setSelectedNeedy(JSON.parse(e.target.value)); showNoteModal() }}>read more</button></>}<br /><br /></td>
                        <td>
                          <div className='edit-btn-container'>
                            <button title='accept request' className='edit-btn' value={request.needy_id} onClick={(e) => { acceptNeedyRequests(e.target.value) }}><RiCheckLine className='edit-icon accept-icon ' /></button>
                            <button title='reject request' className='edit-btn' value={request.needy_id} onClick={(e) => { rejectNeedyRequests(e.target.value) }}><RiCloseLine className='edit-icon reject-icon ' /></button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </>


                :
                <tr>
                  <td colSpan={11} className='text-center p-5 text-danger'>No Requests</td>
                </tr>
              }


            </tbody>
          </Table>
        </div>
      </section>


      {/* View ration card image modal */}
      <Modal className='full-width-modal' show={showImage} onHide={closeImageModal} centered size="xl">
        <Modal.Header >
          <Modal.Title className='h-100 w-100 d-flex justify-content-between align-center'>
            View Documents
            <AiOutlineClose className='' style={{ cursor: 'pointer' }} role='button' onClick={closeImageModal} />
          </Modal.Title>
        </Modal.Header>
        < Modal.Body >
          <p className='px-2 fw-bolder'>Ration Card -</p>
          <div className='ration-car-img-container'>
            <img src={`${process.env.REACT_APP_BASE_URL}${selectedNeedy.rationCardSrc}`} className='ration-card-img' />
          </div>
          <br />
          <hr />
          <br />
          <p className='px-2 fw-bolder'>Aadhar Card -</p>
          <div className='ration-car-img-container'>
            <img src={`${process.env.REACT_APP_BASE_URL}${selectedNeedy.aadharCardSrc}`} className='ration-card-img' />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => closeImageModal()} className='btn btn-danger my-4 mx-3'>
            Close
          </button>
        </Modal.Footer>
      </Modal >

      <Modal className='' show={showCompleteNote} onHide={closeNoteModal} centered size="lg">
        <Modal.Header >
          <Modal.Title className='h-100 w-100 d-flex justify-content-between align-center'>
            Note from {selectedNeedy.name}
            <AiOutlineClose className='' style={{ cursor: 'pointer' }} role='button' onClick={closeNoteModal} />
          </Modal.Title>
        </Modal.Header>
        < Modal.Body >
          <p className='py-4 px-2'>
            {selectedNeedy.noteForAdmin}
          </p>
        </Modal.Body>
        <Modal.Footer className='m-0 p-0'>
          <button onClick={() => closeNoteModal()} className='btn btn-danger my-4 mx-3'>
            Close
          </button>
        </Modal.Footer>
      </Modal >
    </div>
  )
}

export default DashboardAdmin