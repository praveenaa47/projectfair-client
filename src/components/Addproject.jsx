import React, { useContext, useEffect, useState } from 'react'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectAPI } from '../services/allAPI';
import { addProjectResponseContext } from '../../ContextAPI/ContextShare';




function AddProject() {

const{addProjectResponse,setAddProjectResponse}=useContext(addProjectResponseContext)


  const [show, setShow] = useState(false);


  

  const handleClose = () => {setShow(false);  //when click cancel the given image need to refresh
  setProjectData({ title:"",languages:"",overview:"",github:"",website:"",projectImage:""})
  setPreview("")
}

  const handleShow = () => setShow(true);

  const[projectData,setProjectData]=useState({
    title:"",languages:"",overview:"",github:"",website:"",projectImage:""
  })

  const[fileStatus,setFileStatus]=useState(false)
  const[preview,setPreview]=useState("")
  console.log(projectData.projectImage.type);

useEffect(()=>{
  if(projectData.projectImage.type=='image/png' || projectData.projectImage.type=='image/jpeg' || projectData.projectImage.type=='image/jpg'){
    console.log("generate url")
    setPreview(URL.createObjectURL(projectData.projectImage))
    setFileStatus(false)
  }else{
    console.log("please provide following extension");
    setFileStatus(true)
    setProjectData({...projectData,projectImage:""})
  }
},[projectData.projectImage])
// console.log(projectData);

const handleAddProjects = async()=>{
  const{title,languages,overview,github,website,projectImage}=projectData

  if( !title || !languages || !overview || !github || !website || !projectImage){
 toast.error("please fill missing fields")
  }else{
   
     const reqBody=new FormData()

     reqBody.append("title",title)
     reqBody.append("languages",languages)
     reqBody.append("overview",overview)
     reqBody.append("github",github)
     reqBody.append("website",website)
     reqBody.append("projectImage",projectImage)



     const token=sessionStorage.getItem('token')

if(token){
  const reqHeader={
    "Content-Type":"multipart/form-data",
    "authorization":`Bearer ${token}`
   }

  // api call
  try{

    const result = await addProjectAPI(reqBody,reqHeader)
    console.log(result);
    if(result.status==200){
      handleClose()
      setAddProjectResponse(result.data)
    }else{
      toast.warning(result.response.data)
    }
    

  }catch(err){
    console.log(err);
    
  }
 
}
     
    

  }
}



  return (
    <>
    <Button variant="primary" onClick={handleShow} className='me-3'>
        Add Project
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-6">
              <label>
                <input type="file" style={{display:'none'}} onChange={e=>setProjectData({...projectData,projectImage:e.target.files[0]})} />
                <img style={{width:"300px",marginLeft:"35px",borderRadius:"20px",marginTop:"20px"}} src={preview?preview:"https://i.pinimg.com/originals/0c/b0/ae/0cb0aec97240b7d9746073cd3ba6c26f.gif"} alt="" />
              </label>
              {fileStatus&& <div className='"mt-3 text-danger'>Please upload the following file extension(jpeg/png/jpg)</div>}
            </div>
            <div className="col-6">
            <FloatingLabel
        controlId="floatingInput1"
        label="Project Title"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="Project Title" onChange={e=>setProjectData({...projectData,title:e.target.value})} />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput2"
        label="Languages Used"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="Languages Used" onChange={e=>setProjectData({...projectData,languages:e.target.value})}/>
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput3"
        label="Project Overview"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="Overview" onChange={e=>setProjectData({...projectData,overview:e.target.value})} />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput4"
        label="Github Link"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="Github"  onChange={e=>setProjectData({...projectData,github:e.target.value})}/>
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput5"
        label="Website Link"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="Website Link"  onChange={e=>setProjectData({...projectData,website:e.target.value})}/>
      </FloatingLabel>
            </div>

          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddProjects} >Add</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={2000} position='top-center' theme='colored' />

    </>
  )
}

export default AddProject