import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import ProtectedAxios from '../api/protectedAxios';
import { RiCheckLine, RiCloseLine } from 'react-icons/ri'


const ManageDonors = () => {
  const [donors, setDonors] = useState([])
  const [refreshDonorList, setRefreshDonorList] = useState(false)

  useEffect(() => {
    fetchAllDonors()
  }, [refreshDonorList])

  const fetchAllDonors = () => {
    ProtectedAxios.get('/admin/allDonors')
      .then(res => {
        console.log('all donors - ', res.data);
        setDonors(res.data)
      })
      .catch(err => {
        alert(err.response.data.error)
      })
  }

  const disableUser = (_userId) => {
    ProtectedAxios.post('/admin/disableUser', {user_id:_userId})
      .then(res => {
        console.log('disable user status - ', res.data);
        setRefreshDonorList(!refreshDonorList)
      })
      .catch(err => {
        alert(err.response.data.error)
      })
    }
    
    const activateUser = (_userId) => {
      ProtectedAxios.post('/admin/activateUser', {user_id:_userId})
      .then(res => {
        console.log('activate user status - ', res.data);
        setRefreshDonorList(!refreshDonorList)
      })
      .catch(err => {
        alert(err.response.data.error)
      })
  }

  return (
    <div className='container py-5'>
      <h2>Manage Donors</h2>
      <p className='subtitle'>Note: Disabling the donor account will prevent donors from loggin in and accessing their dashboard</p>

      <div className='table-container'>
        <Table className='my-table' striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Regn. date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {donors.length > 0
              ?
              <>
                {donors.map((donor, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{donor.name}</td>
                      <td>{donor.email}</td>
                      <td>{donor.phone}</td>
                      <td>{donor.address}</td>
                      <td>{new Date(donor.registrationTimeStamp).toLocaleString('en-us')}</td>
                      <td>{donor.isActive ?'Active' :'Disabled'}</td>
                      <td>
                        <div className='edit-btn-container'>
                          {donor.isActive
                            ?
                            <button className='edit-btn' title='disable account' value={donor.user_id} onClick={(e) => { disableUser(e.target.value) }}><RiCloseLine className='edit-icon reject-icon ' /></button>

                            :
                            <button className='edit-btn' title='activate account' value={donor.user_id} onClick={(e) => { activateUser(e.target.value) }}><RiCheckLine className='edit-icon accept-icon ' /></button>
                          }
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </>


              :
              <tr>
                <td colSpan={7} className='text-center p-5 text-danger'>no donors found</td>
              </tr>
            }


          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default ManageDonors