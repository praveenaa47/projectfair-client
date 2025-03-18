import React, { useContext, useEffect, useState } from 'react'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { server_url } from '../services/server_url';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateProjectAPI } from '../services/allAPI';
import { editProjectResponseContext } from '../../ContextAPI/ContextShare';






function EditProject({ project }) {
  // console.log(project);

const{editProjectResponse,setEditProjectResponse}=useContext(editProjectResponseContext)

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setProjectData({
      title: project?.title,
      languages: project?.languages,
      overview: project?.overview,
      github: project?.github,
      website: project?.website,
      projectImage: ""
    })

  }
  const handleShow = () => setShow(true);

  const [projectData, setProjectData] = useState({
    id: project?._id,
    title: project?.title,
    languages: project?.languages,
    overview: project?.overview,
    github: project?.github,
    website: project?.website,
    projectImage: ""
  })



  const [preview, setPreview] = useState("")

  useEffect(() => {
    if (projectData.projectImage) {
      setPreview(URL.createObjectURL(projectData.projectImage))
    } else {
      setPreview("")
    }
  }, [])

  const handleUpdate = async () => {
    const { id, title, languages, overview, github, website, projectImage } = projectData

    if (!title || !languages || !overview || !github || !website) {
      toast.error("please fill missing fields")
    } else {

      const reqBody = new FormData()

      reqBody.append("title", title)
      reqBody.append("languages", languages)
      reqBody.append("overview", overview)
      reqBody.append("github", github)
      reqBody.append("website", website)
      preview ? reqBody.append("projectImage", projectImage) : reqBody.append("projectImage", project.projectImage)



      const token = sessionStorage.getItem('token')

      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "authorization": `Bearer ${token}`
        }
        //api call
        try {
          const result = await updateProjectAPI(id, reqBody, reqHeader)
          if (result.status == 200) {
            handleClose()
            setEditProjectResponse(result.data)
          } else {
            toast.warning(result.data.response)
          }

        } catch (err) {
          console.log(err);


        }
      }

    }
  }

  return (
    <>
      <button style={{border:"none",background: ""}} onClick={handleShow} >
        <a className='me-3 btn text-dark'><i class="fa-solid fa-pen-to-square"></i></a>
      </button>
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
                <input type="file" style={{ display: 'none' }} onChange={e => setProjectData({ ...projectData, projectImage: e.target.files[0] })} />
                <img style={{ width: "300px", marginLeft: "35px", borderRadius: "20px", marginTop: "20px" }} src={preview ? preview : `${server_url}/uploads/${project?.projectImage}`} alt="" />
              </label>
            </div>
            <div className="col-6">
              <FloatingLabel
                controlId="floatingInput1"
                label="Project Title"
                className="mb-3"
              >
                <Form.Control type="text" placeholder="Project Title" value={projectData?.title} onChange={e => setProjectData({ ...projectData, title: e.target.value })} />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput2"
                label="Languages Used"
                className="mb-3"
              >
                <Form.Control type="text" placeholder="Languages Used" value={projectData?.languages} onChange={e => setProjectData({ ...projectData, languages: e.target.value })} />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput3"
                label="Project Overview"
                className="mb-3"
              >
                <Form.Control type="text" placeholder="Overview" value={projectData?.overview} onChange={e => setProjectData({ ...projectData, overview: e.target.value })} />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput4"
                label="Github Link"
                className="mb-3"
              >
                <Form.Control type="text" placeholder="Github" value={projectData?.github} onChange={e => setProjectData({ ...projectData, github: e.target.value })} />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput5"
                label="Website Link"
                className="mb-3"
              >
                <Form.Control type="text" placeholder="Website Link" value={projectData?.website} onChange={e => setProjectData({ ...projectData, website: e.target.value })} />
              </FloatingLabel>
            </div>

          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>Update</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={2000} position='top-center' theme='colored' />

    </>
  )
}

export default EditProject
