import React, { useEffect, useState } from 'react'
import axios from 'axios';
function Mgmt() {
  const [pendingLeave, setPendingLeave] = useState();
  const [approvedLeave, setApprovedLeave] = useState();
  const [totalEmp, setTotalEmp] = useState();
  const [todayLeave, setTodayLeave] = useState();
  const leaveStatus = () => {
    axios.get('http://localhost:4000/api/emp/leave-status').then(data => {
      // console.log('data',data.data.approvedLeave)
      setPendingLeave(data.data.pendingLeave)
      setApprovedLeave(data.data.approvedLeave)
      setTotalEmp(data.data.totalEmp)
      setTodayLeave(data.data.todayLeaveCount)
    }).catch(err => {
      console.log('err', err.message)
    })
  }

  useEffect(() => {
    leaveStatus()

  }, [])
  return (
    <div>

      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css" />
        <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" />
        <link rel="stylesheet" type="text/css" href="https://pixinvent.com/stack-responsive-bootstrap-4-admin-template/app-assets/css/bootstrap-extended.min.css" />
        <link rel="stylesheet" type="text/css" href="https://pixinvent.com/stack-responsive-bootstrap-4-admin-template/app-assets/fonts/simple-line-icons/style.min.css" />
        <link rel="stylesheet" type="text/css" href="https://pixinvent.com/stack-responsive-bootstrap-4-admin-template/app-assets/css/colors.min.css" />
        <link rel="stylesheet" type="text/css" href="https://pixinvent.com/stack-responsive-bootstrap-4-admin-template/app-assets/css/bootstrap.min.css" />
        <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet"></link>
        <title>Bootstap 5 Responsive Admin Dashboard</title>
      </head>
      {

      }
      <div className="grey-bg container-fluid" style={{ padding: "2px" }}>
        <section id="minimal-statistics" >
          <div className='row'>
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card" style={{ width: "90%", marginTop: '30px' }}>
                <div className="card-content">
                  <div className="card-body">
                    <div className="media d-flex">
                      <div className="media-body text-left">
                        <h3 className="success">{totalEmp}</h3>
                        <span>Employees</span>
                      </div>
                      <div className="align-self-center">
                        <i className="icon-user success font-large-2 float-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card" style={{ width: "90%", marginTop: '30px' }}>
                <div className="card-content">
                  <div className="card-body">
                    <div className="media d-flex">
                      <div className="align-self-center">
                        <i className="bi bi-patch-check-fill   success font-large-2 float-left"></i>
                      </div>
                      <div className="media-body text-right">
                        <h3>{approvedLeave}</h3>
                        <span>APPROVERD LEAVES</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card" style={{ width: "90%", marginTop: '30px' }}>
                <div className="card-content">
                  <div className="card-body">
                    <div className="media d-flex">
                      <div className="align-self-center">
                        <i className="bi bi-hourglass-top red font-large-2 float-left"></i>
                      </div>
                      <div className="media-body text-right">
                        <h3>{pendingLeave}</h3>
                        <span >PENDING LEAVES</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card" style={{ width: "90%", marginTop: '30px' }}>
                <div className="card-content">
                  <div className="card-body">
                    <div className="media d-flex">
                      <div className="align-self-center">
                        <i className="bi bi-person-dash-fill primary font-large-2 float-left"></i>
                      </div>
                      <div className="media-body text-right">
                        <h3>{todayLeave}</h3>
                        <span>TODAY LEAVE</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Mgmt