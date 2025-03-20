
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Auth from './pages/Auth'
import Footer from './comp/Footer'
import { useContext } from 'react'
import { TokenAuthContext } from '../ContextAPI/TokenAuth'


function App() {
  const{isAuthorized,setIsAuthorized}=useContext(TokenAuthContext)


  return (
    <>
    <Routes>

      <Route path='/' element={<Home/>}/>
      <Route path='/dashboard' element={isAuthorized?<Dashboard/>:<Home/>}/>
      <Route path='/login' element={<Auth/>}/>
      <Route  path='/register' element={<Auth register/>}/>
      <Route  path='/projects' element={isAuthorized?<Projects/>:<Home/>}/>
      {/* for giving path to the route for  */}
      <Route  path='/' element={<Navigate to={'/'}/>}/>       
    </Routes>
    <Footer/>
     
    </>
  )
}

export default App
