import { commonAPI } from "./commonAPI";
import {server_url} from './server_url'

//registerAPI

export const registerAPI = async(user)=>{
    return await commonAPI('POST',`${server_url}/register`,user,"")
}


//loginAPI

export const loginAPI = async(user)=>{
   
    return await commonAPI('POST',`${server_url}/login`,user,"")
    
}

// addprojectAPI

export const addProjectAPI = async(reqBody,reqHeader)=>{
    return await commonAPI('POST',`${server_url}/addproject`,reqBody,reqHeader)
}

// gethomeprojectapi

export const getHomeProjectAPI = async()=>{
    return await commonAPI('GET',`${server_url}/homeprojects`,"","")
}


// getallprojectsAPI

export const getAllProjectAPI = async(searchKey,reqHeader) => {
    return await commonAPI('GET', `${server_url}/allprojects?search=${searchKey}`,"",reqHeader)
}

// getuserprojectsAPI


export const getUserProjectAPI = async(reqHeader)=>{
    return await commonAPI('GET',`${server_url}/userprojects`,"",reqHeader)
}


// updateProjectAPI

export const updateProjectAPI = async(id,reqBody,reqHeader)=>{
    return await commonAPI('PUT',`${server_url}/projects/edit/${id}`,reqBody,reqHeader)
}

// delete ProjectAPI`

export const deleteProjectAPI = async(id,reqHeader)=>{
    return await commonAPI('DELETE',`${server_url}/projects/remove/${id}`,{},reqHeader) 
}