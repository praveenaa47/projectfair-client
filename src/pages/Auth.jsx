import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { Link,  useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAPI, registerAPI } from '../services/allAPI';
import { useContext } from 'react';
import { TokenAuthContext } from '../../ContextAPI/TokenAuth';






function Auth({register}) {
    const navigate = useNavigate()
    const{isAuthorized,setIsAuthorized}=useContext(TokenAuthContext)

    const isRegisterForm=register?true:false
 
    const [userData,setUserData]=useState({
        username:"",email:"",password:""
    })
 

   
   const handleRegister=async(e)=>{
    e.preventDefault()
    const{username,email,password}=userData
    if(!username || !email || !password){
        toast.error("please fill missing fields")
    }else{

    try{
        const result = await registerAPI(userData)
        if(result.status==200){
            toast.success(`${result.data.username} successfully registered`)
            navigate('/login')
            setUserData({username:"",email:"",passsword:""})

        }else{
            toast.warning(result.response.data)
        }
    }catch(err){
        console.log(err);
        
    }
}

 }


 //login

 const handleLogin=async(e)=>{
    e.preventDefault()
    const{email,password}=userData
    if( !email || !password ){
        toast.error("please fill missing fields")
    }else{
        try{
            //proceed to API call
            const result = await loginAPI({email,password})
            if(result.status==200){
                sessionStorage.setItem("username",result.data.existingUser.username)
                sessionStorage.setItem("token",result.data.token)
                setIsAuthorized(true)
                navigate('/')
                setUserData({email:"",password:""})
            }else{
                toast.warning(result.response.data)
            }
        }catch(err){
            console.log(err);
            
        }
    }
 }
   


  return (
    <>
     <div className='d-flex justify-content-center align-items-center'>
<div className='container w-75'>
<Link to={'/' } style={{textDecoration: 'none',color:'',fontweight:'bolder'}}><i class="fa-solid fa-house-chimney-user " style={{fontSize:"50px", marginTop:"30px"}}></i></Link>
<div className='card shadow p-3  mt-5'> 
    <div className='row align-item-center'>
        <div className='col-lg-6'>
           <img style={{width:"300px",borderRadius:"20px",marginLeft:"90px",marginTop:"30px"}} src="https://media0.giphy.com/media/E5pz6sWcsCEmzy0JeA/giphy.gif" alt="" width={"100%"}/>
        </div>
        
<div className='col-lg-6'>
    <div className="d-flex align-items-center flex-column">
        <h1 className='fw-bolder  mt-2'>Project fair</h1>
        <h5 className='fw-bolder  mt-2'>{
            isRegisterForm?"Sign up to your account":"Sign in to your account"
            }

<Form  className="mt-4 text-dark">

      {isRegisterForm&&<Form.Group  className="mb-3" controlId="exampleForm.ControlInput1">
        
          <Form.Control type="text" placeholder="Enter your username" onChange={e=>setUserData({...userData,username:e.target.value})} value={userData.username} />
       
      </Form.Group>}

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        
          <Form.Control type="email" placeholder="enter your email" onChange={e=>setUserData({...userData,email:e.target.value})} value={userData.email}/>
        
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
        
          <Form.Control type="password" placeholder="enter your password" onChange={e=>setUserData({...userData,password:e.target.value})} value={userData.password} />
        
      </Form.Group>
    </Form>

    {
        isRegisterForm?

        <div className='mt-3'>
            <button  className='btn btn-info' onClick={handleRegister}>Register</button>
            <p className=' mt-2'>Already have an account?Click here to <Link style={{textDecoration:"none",color:"green"}} to={'/login'}>Login</Link></p>
        </div>:<div className='mt-3'>
            <button className='btn btn-info'onClick={handleLogin} >Login</button>
            <p className=' mt-2'>Already have an account?Click here to <Link style={{textDecoration:"none",color:"red"}} to={'/register'}>Register</Link></p>
        </div>
    }

        </h5>

    </div>

</div>

</div>
   

</div>
</div>
     </div>
     <ToastContainer autoClose={2000} position='top-center' theme='colored' />
    </>
  )
}

export default Auth