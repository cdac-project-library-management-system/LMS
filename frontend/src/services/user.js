import axios from 'axios'
import {createUrl, getAuthHeaders}  from '../config'
import { getUserInfo } from './api';

//template
// export async function get....(){
//     try{
        
//     }catch(ex){
//         return {status: 'error', error:ex}
//     }
// }

const USERS_API_URL = createUrl("users");

// Fetch all users
export async function getUsers() {
  try {
    const response = await axios.get(createUrl("users"), {
      headers: getAuthHeaders(),
    });
    // Check if response contains an array
    if (Array.isArray(response.data)) {
      return response.data; // ✅ Return as expected
    } else if (response.data && Array.isArray(response.data.items)) {
      return response.data.items; // ✅ Adjust if API wraps it inside `items`
    } else {
      console.error("Unexpected response format:", response.data);
      return []; // ✅ Return empty array to prevent crash
    }
  } catch (ex) {
    console.error("Error fetching users:", ex);
    return []; 
  }
}

// Fetch user by ID
export async function getUserById(userId) {
  try {
    const url = `${USERS_API_URL}/${userId}`;
    const response = await axios.get(url, {
      headers: getAuthHeaders(),
    });
    return response.data; // Assuming API returns user object directly
  } catch (ex) {
    console.error(`Error fetching user with ID ${userId}:`, ex);
    return { status: "error", error: ex };
  }
}


// Delete a user
export async function deleteUser(id) {
  try {
    const url = `${USERS_API_URL}/${id}`;
    const response = await axios.delete(url, {
      headers: getAuthHeaders(),
    });
    return response.status === 200;
  } catch (ex) {
    console.error("Error deleting user:", ex);
    return { status: "error", error: ex };
  }
}

// const API_URL = createUrl("users");

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
      const user = getUserInfo();
      if (!user || !user.userId) {
          throw new Error("User ID not found in token.");
      }

      const url = createUrl(`users/${user.userId}`); // Pass userId in URL
      const response = await axios.get(url, {
          headers: getAuthHeaders(), // Ensure authentication headers are included
      });

      return response.data;
  } catch (ex) {
      console.error("Error fetching profile:", ex);
      return { status: "error", error: ex.message };
  }
}


export async function editMyProfile(firstName, lastName, phone, email, address, enrollment ) {
    try {
      const url = createUrl('users')
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
      console.log(response.data)
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


