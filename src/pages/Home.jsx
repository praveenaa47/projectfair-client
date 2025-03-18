import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import image from '../assets/project gif.gif'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getHomeProjectAPI } from '../services/allAPI'
import ProjectCard from './ProjectCard';


function Home() {

const[isLoggedIn,setIsLoggenIn]=useState(false)
const[allProjects,setAllProjects]=useState([])
const navigate=useNavigate()

useEffect(()=>{
  getHomeProjects()
  if(sessionStorage.getItem("token")){
    setIsLoggenIn(true)
  }else{
    setIsLoggenIn(false)
  }
},[])

const getHomeProjects=async()=>{
  const result = await getHomeProjectAPI()
  if(result.status==200){
    setAllProjects(result.data)
  }else{
    console.log(result);
    

  }
}

console.log(allProjects);



const handleProjectsPage=()=>{
  if(sessionStorage.getItem("token")){
    navigate('/projects')
  }else{
    toast.warning("please login to explore our projects...")
  }
}


  return (
    <>
      <div className="container-fluid rounded" style={{width:"100%",height:"90vh"}}>
        <Row className="d-flex align-items-center p-5">
          <Col sm={12} md={6} className="mt-5">
          <h1 style={{fontSize:"80px"}} className='fw-bolder'><i className="fa-solid fa-list-ol"></i>PROJECT-FAIR</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum totam veniam dolores ab maxime accusantium. Nisi iusto inventore vero minus quae doloribus, ducimus magnam. Porro ut pariatur hic eos. Consequatur!
          Quia ducimus explicabo facere, fugit nostrum natus sint obcaecati nam autem voluptates dignissimos distinctio asperiores quibusdam illum soluta quos consequuntur quis cumque. Quas recusandae sint autem quo deleniti velit commodi.
          Voluptate veritatis eaque officia quaerat cupiditate asperiores nemo necessitatibus! Nam asperiores eum placeat eius accusamus, vitae qui libero quis, maxime quia sapiente! Repudiandae molestiae dignissimos doloremque iusto, pariatur eveniet earum.
          Quam amet autem voluptatibus exercitationem nihil officia esse, laudantium dicta libero, voluptatum facere voluptatem sed corrupti tenetur. Ipsam dolorum aspernatur assumenda quae, fugit error molestias, a, nemo ex accusantium corrupti!</p>
{isLoggedIn?

          <Link to={'/dashboard'} className="btn" style={{background:"#A594F9" , color:"#F5EFFF"}}>Manage your projects</Link>:
          <Link to={'/login'} className="btn" style={{background:"#A594F9" , color:"#F5EFFF"}}>Start to Explore</Link>}
          </Col>
          <Col sm={12} md={6} className='mt-5'>
          <img src={image} width={"500px"} style={{marginLeft:"95px",borderRadius:"10px"}} alt="" /></Col>
        </Row>
      </div>
      
        
   


{/* all projects */}


<div className="all-projects mt-5">
  <h1 className=' fw-bolder text-center' style={{textDecoration:"underline"}}>Explore Your Projects</h1>
  <marquee scrollAmount={25}>
<Row>
 { allProjects?.length>0?allProjects.map(project=>(
   
   <Col sm={12} md={6} lg={4}>
  <ProjectCard project={project}/>
  </Col>
  )):null
  
}

  
</Row>
</marquee>
</div>

<div className="d-flex justify-content-center mt-5 btn fs-2"onClick={handleProjectsPage}><p>View More Projects</p>
</div>
<ToastContainer autoClose={2000} position='top-center' theme='colored' />
</>


  )
}

export default Home
