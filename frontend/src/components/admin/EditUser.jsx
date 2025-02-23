// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';

// const EditUser = () => {
//   // Navigate hook for routing after form submission
//   const navigate = useNavigate();

//   // Use params hook to get user ID from URL for fetching user data
//   const { userId } = useParams();

//   // State to hold the form data (removed prnNo field)
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     dob: '',
//     gender: '',
//     phone: ''
//   });

//   // Effect hook to fetch user data on component mount (remove dummy data)
//   useEffect(() => {
//     // Here you can fetch user data from an API using userId
//     // Example: fetch(`/api/users/${userId}`).then(res => res.json()).then(data => setFormData(data));
//   }, [userId]);

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();  
//     console.log('User updated:', formData);  
//     navigate('/users');  
//   };

//   // Handle input changes and update form data
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value  
//     }));
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-8 col-lg-6">
//           <div className="card shadow-lg p-4 mb-5 bg-white rounded">
//             <h1 className="h3 font-weight-bold mb-4 text-dark">Edit User</h1>

//             <form onSubmit={handleSubmit}>
//               {/* First Name Input Field */}
//               <div className="form-group mb-4">
//                 <label className="font-weight-bold text-secondary">First Name</label>
//                 <input
//                   type="text"
//                   name="firstName"
//                   className="form-control"
//                   onChange={handleInputChange}
//                   value={formData.firstName}
//                   required  
//                 />
//               </div>

//               {/* Last Name Input Field */}
//               <div className="form-group mb-4">
//                 <label className="font-weight-bold text-secondary">Last Name</label>
//                 <input
//                   type="text"
//                   name="lastName"
//                   className="form-control"
//                   onChange={handleInputChange}
//                   value={formData.lastName}
//                   required
//                 />
//               </div>

//               {/* Email Input Field */}
//               <div className="form-group mb-4">
//                 <label className="font-weight-bold text-secondary">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   className="form-control"
//                   onChange={handleInputChange}
//                   value={formData.email}
//                   required
//                 />
//               </div>

//               {/* Date of Birth Input Field */}
//               <div className="form-group mb-4">
//                 <label className="font-weight-bold text-secondary">Date of Birth</label>
//                 <input
//                   type="date"
//                   name="dob"
//                   className="form-control"
//                   onChange={handleInputChange}
//                   value={formData.dob}
//                   required
//                 />
//               </div>

//               {/* Gender Dropdown Field */}
//               <div className="form-group mb-4">
//                 <label className="font-weight-bold text-secondary">Gender</label>
//                 <select
//                   name="gender"
//                   className="form-control"
//                   onChange={handleInputChange}
//                   value={formData.gender}
//                   required
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>

//               {/* Phone Number Input Field */}
//               <div className="form-group mb-4">
//                 <label className="font-weight-bold text-secondary">Phone Number</label>
//                 <input
//                   type="text"
//                   name="phone"
//                   className="form-control"
//                   onChange={handleInputChange}
//                   value={formData.phone}
//                   required
//                 />
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 className="btn btn-primary btn-block"
//               >
//                 <i className="fas fa-edit mr-2"></i> Update User
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditUser;


import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    gender: '',
    phone: ''
  });

  useEffect(() => {
    // Fetch user data using userId
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User updated:', formData);
    navigate('/users');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4">Edit User</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">First Name</label>
                <input type="text" name="firstName" className="form-control" onChange={handleInputChange} value={formData.firstName} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input type="text" name="lastName" className="form-control" onChange={handleInputChange} value={formData.lastName} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" name="email" className="form-control" onChange={handleInputChange} value={formData.email} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Date of Birth</label>
                <input type="date" name="dob" className="form-control" onChange={handleInputChange} value={formData.dob} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Gender</label>
                <select name="gender" className="form-select" onChange={handleInputChange} value={formData.gender} required>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input type="text" name="phone" className="form-control" onChange={handleInputChange} value={formData.phone} required />
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-primary w-100">
                  <i className="fas fa-edit me-2"></i> Update User
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;

