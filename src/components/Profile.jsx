import React, { useState } from 'react'
import { Collapse } from 'react-bootstrap';

function Profile() {
  const [open, setOpen] = useState(false);
  return (
    <>
    <div style={{marginTop:"50px"}}>
       <div className="card shadow p-3 mt-5 me-3">
        <div className="d-flex justify-content-between">
          <h1>Profile</h1>
          <button  onClick={() => setOpen(!open)} className="btn"><i class="fa-solid fa-arrow-turn-down"></i></button>
        </div>
       </div>
    </div>
   <Collapse  in={open}>

    <div style={{marginTop:"50px"}}>
      <div className="row d-flex justify-content-center p-5">
        <label>
          <input type="file" style={{display:"none"}}/>
          <img style={{marginLeft:"65px"}} width={'50%'} height={'200px'} src='https://cdn-icons-png.flaticon.com/512/4128/4128253.png' alt='profile'/>
        </label>
        <div className="mt-5">
          <input type='text' placeholder='GitHub Link' className='form-control'/>
          <br/>
          <input type='text' placeholder='LinkedIn Link' className='form-control'/>
        </div>
        <div className="d-grid mt-5">
          <button style={{background:"#7E60BF",color:"white"}} className="btn ">Update</button>
        </div>
      </div>
      
    </div>
   </Collapse>
   </>
  )
}

export default Profile