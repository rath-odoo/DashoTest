//src/components/RegistrationForm.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../actions/registrationActions';



const RegistrationForm = () => {
  

  const dispatch = useDispatch();
  const registration = useSelector((state) => state.onlineregistration);
  const [formData, setFormData] = useState({ "username": "dhhsdgsd", "email": "swjhw@gmail.com", "phoneno": "+9187637" });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  // console.log("formData: ", formData);

   console.log('Component Registration State:', registration);



  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />

      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
            	  
      <input
        type="text"
        placeholder="PhoneNo"
        value={formData.phoneno}
        onChange={(e) => setFormData({ ...formData, phoneno: e.target.value })}
      />
      
      <button type="submit">Register</button>
      {registration.loading && <p>Loading...</p> }
      {registration.error && <p>Error: {registration.error.message}</p>}
    </form>
  );
};

export default RegistrationForm;

