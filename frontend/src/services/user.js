import axios from 'axios'
import {createUrl}  from '../config'

//template
// export async function get....(){
//     try{
        
//     }catch(ex){
//         return {status: 'error', error:ex}
//     }
// }

export async function login(email, password) {
  try {
    const url = createUrl('user/login')
    const body = {
        email,
        password
    }
    const response = await axios.post(url, body)

    return response.data
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}

export async function register(firstName, lastName, email, phone, password, address, enrollment) {
    try {
      const url = createUrl('user/register')
      const body = {
        firstName, 
        lastName, 
        email,
        password,
        phone,
        address,
        enrollment,
      }
      const response = await axios.post(url, body)
      return response.data
    } catch (ex) {
      return { status: 'error', error: ex }
    }
}

export async function changePassword(newPassword) {
try {
    const url = createUrl('user/change-password')
    const body = {
    newPassword,
    }
    const token = sessionStorage['token']
    const response = await axios.put(url, body, {
    headers: { token },
    })
    return response.data
} catch (ex) {
    return { status: 'error', error: ex }
}
}

export async function getMyProfile() {
    try {
      const url = createUrl('user/profile')
      const token = sessionStorage['token']
      const response = await axios.get(url, {
        headers: {
          token,
        },
      })
      return response.data
    } catch (ex) {
      return { status: 'error', error: ex }
    }
}

export async function editMyProfile(firstName, lastName, phone, email, address, enrollment ) {
    try {
      const url = createUrl('user/profile')
      const token = sessionStorage['token']
      const body = {
        firstName,
        lastName,
        phone,
        email,
        address,
        enrollment
      }
      const response = await axios.put(url, body, {
        headers: {
          token,
        },
      })
      return response.data
    } catch (ex) {
      return { status: 'error', error: ex }
    }
}

export async function getBorrowedBooks(){
    try{
        const url = createUrl('user/getBorrowedBooks')
        const token = sessionStorage['token']
        const response = await axios.get(url, {
            heades:{
                token,
            }
        })
        return response.data;
    }catch(ex){
        return {status: 'error', error:ex}
    }
}
  
export async function getFineDetails(){
    try{
        const url = createUrl('user/getFineDetails')
        const token = sessionStorage['token']
        const response = await axios.get(url, {
            headers:{
                token,
            }
        }) 
        return response.data;      
    }catch(ex){
        return {status: 'error', error:ex}
    }
}

export async function getAllBooks(){
  try{
      const url = createUrl('user/getBooks')
      const token = sessionStorage['token']
      const response = await axios.get(url,{
        headers:{
          token,
        }
      })
      return response.data;
  }catch(ex){
      return {status: 'error', error:ex}
  }
}


//incomplete
export async function getBooksByGenre(genreId){
  try{
      const url = createUrl('user/getBooksByGenre'+genreId)
      const token = sessionStorage['token']
      const response = await axios.get(url,{
        headers:{
          token,
        }
      })
      return response.data;
  }catch(ex){
      return {status: 'error', error:ex}
  }
}

//incomplete
export async function getBooksByAuthor(authorId){
  try{
      const url = createUrl('user/getBooksByGenre'+ authorId)
      const token = sessionStorage['token']
      const response = await axios.get(url,{
        headers:{
          token,
        }
      })
      return response.data;
  }catch(ex){
      return {status: 'error', error:ex}
  }
}


