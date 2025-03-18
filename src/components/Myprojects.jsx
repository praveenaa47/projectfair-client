import React, { useContext, useEffect, useState } from 'react'
import AddProject from './Addproject'
import { deleteProjectAPI, getUserProjectAPI } from '../services/allAPI'
import { addProjectResponseContext, editProjectResponseContext } from '../../ContextAPI/ContextShare'
import EditProject from './EditProject'




function MyProject() {

  const[allProjects,setAllProjects]=useState([])
const{addProjectResponse,setAddProjectResponse}=useContext(addProjectResponseContext)
const{editProjectResponse,setEditProjectResponse}=useContext(editProjectResponseContext)


  const getUserProjects=async()=>{

    const token=sessionStorage.getItem('token')
    if(token){
      const reqHeader={
        "Content-Type":"multipart/form-data",
        'authorization':`Bearer ${token}`
       
        }

        try{
          const result = await getUserProjectAPI(reqHeader)

          if(result.status==200){
            setAllProjects(result.data)
          }
          else{
            console.log(result);
          }

        }catch(err){
console.log(err);

        }
    }
  }
 

  console.log(allProjects)

  useEffect(()=>{
    getUserProjects()
  },[addProjectResponse,editProjectResponse])


  const deleteProjects=async(pid)=>{
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader={
        "Content-Type":"application/json",
        "authorization":`Bearer ${token}`
      }
      //api call
      try{
        const result = await deleteProjectAPI(pid,reqHeader)
        if(result.status==200){
          getUserProjects()
        }else{
          console.log(result);
        }
      }catch(err){
        console.log(err);
        
      }
    }
  }
  

return (
    <>

    <div className="card shadow mt-5 ">
      <div className="d-flex m-2">
        <h2>My Projects</h2>
        </div>
        <div className="ms-auto">
        <AddProject/>
      </div>
       

      
     {
     allProjects?.length>0?allProjects.map((project,index)=>(
     <div key={index} className="mt-4 border container-fluid d-flex">
        
        <h3 className='fw bolder'>{project?.title}</h3>
          <div className="ms-auto d-flex align-items-center">
            <EditProject project={project}/> 

          <a className='me-3 btn text-dark' href={project?.github} target='_blank'><i class="fa-brands fa-github-alt"></i></a>
          <button className='me-3 btn text-dark'onClick={()=>deleteProjects(project._id)}><i class="fa-solid fa-trash"></i></button>
        
        </div>

        </div>
        )): <p className="fw-bolder" style={{color:"#6A9AB0"}}>No Projects Added Yet</p>

          

        }
      
    </div>
      
    </>
  )
}

export default MyProject