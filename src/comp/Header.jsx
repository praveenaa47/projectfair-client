import React, { useContext } from 'react'
import { Button, Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { TokenAuthContext } from '../../ContextAPI/TokenAuth'





const Header = ({insideDashboard}) => {
  const navigate= useNavigate()
  const{isAuthorized,setIsAuthorized}=useContext(TokenAuthContext)

  const handleLogOut=()=>{
    sessionStorage.removeItem("username")
    sessionStorage.removeItem("token")
    setIsAuthorized(false)
    navigate('/')
  }
  return (
    <>
      <Navbar style={{background:"#6482AD"}}>
        <Container>
          <Navbar.Brand>
            <Link to={'/'} style={{textDecoration:'none',color:"#E2DAD6"}}>
            <i className="fa-solid fa-list-ol"></i>
            PROJECT-FAIR
            </Link>
              </Navbar.Brand>
              {insideDashboard&& <Button className='btn btn-outline-warning text-light' onClick={handleLogOut}>LOGOUT</Button>}
        </Container>
      </Navbar>
      
    </>
  )
}


export default Header

