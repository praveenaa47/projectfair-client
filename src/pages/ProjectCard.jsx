import React, { useState } from 'react'
import { Card, Col, Modal, Row } from 'react-bootstrap'

import { server_url } from '../services/server_url';



function ProjectCard({project}) {

  const[show,setShow]=useState(false);
  const handleClose=()=>setShow(false);
  const handleShow=()=>setShow(true);
  console.log(`${server_url}/uploads/${project.projectImage}`);
  console.log(project.projectImage);


  return (
    <>
     <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={`${server_url}/uploads/${project.projectImage}`} onClick={handleShow}/>
      <Card.Body>
        <Card.Title className='fw-bolder' style={{textAlign:"center"}}>{project?.title}</Card.Title>
       </Card.Body>
    </Card>

      
    <Modal  size="lg"show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title >Project-Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
            <img src={`${server_url}/uploads/${project.projectImage}`}width={"100%"} alt="" />
            </Col>
          <Col md={6}>
          <h1 className='fw-bolder'>{project?.title}</h1>
           <h3 >Language:{project?.languages}</h3>
           <p><span className='text-success'>Overview - </span>{project?.overview}</p>
           
          </Col>
          </Row>

          <div className='mt-2'>
            <a href={project?.github} target="_blank" className='me-3 btn '><i class="fa-brands fa-github-alt"></i></a>
            <a href={project?.website} target="_blank" className='me-3 btn '><i class="fa-solid fa-paperclip"></i></a>

          </div>

        </Modal.Body>
        
      </Modal>
    </>
  )
}

export default ProjectCard
