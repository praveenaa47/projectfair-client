import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import MyProjects from '../components/Myprojects'
import Profile from '../components/Profile'
import Header from '../Components/Header'



function Dashboard() {
  const[username,setUsername]=useState("")

  useEffect(()=>{
    if(sessionStorage.getItem("username")){
      setUsername(sessionStorage.getItem("username"))
    }else{
      setUsername("")
    }
  },[])
  return (
    <div>
      <Header insideDashboard/>
      <Row>
        {/* my projects */}
        <Col sm={12} md={8}>
        <h1>Welcome <span className='text-warning fw-bolder'>{username}</span></h1>
        <MyProjects/>
        </Col>

          {/* profile */}
          <Col sm={12} md={4}>
          <Profile/>
          </Col>

      </Row>
      
    </div>
  )
}

export default Dashboard
