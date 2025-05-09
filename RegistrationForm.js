import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './RegistrationForm.css';
import Header from './Header';
import Footer from './Footer';
import PasswordChecklist from "react-password-checklist"; 

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollNo: '',
    section: '',
    address: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const rollNoPattern = /^[A-Za-z0-9]+$/;
    if (!rollNoPattern.test(formData.rollNo)) {
      alert('Roll number must be a mixture of letters and numbers.');
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailPattern.test(formData.email)) {
  alert('Please enter a valid email address.');
  return;
}


    const { name, email, rollNo, section, address, password } = formData;
    if (!name || !email || !rollNo || !section || !address || !password) {
      alert('Please fill in all the fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Registration successful!');
        setSubmitted(true);
        navigate('/login');  // Redirect to login page after registration
      } else {
        alert('Registration failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting form.');
    }
  };

  return (
    <div className="form-container">
      <Header/>
      <form onSubmit={handleSubmit}>
      <h2 >Registration Form</h2>
        <label>Name:</label>
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />

        <label>Email Address:</label>
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />

        <label>Roll No:</label>
        <input 
          type="text" 
          name="rollNo" 
          value={formData.rollNo} 
          onChange={handleChange} 
          required 
        />
        
        <label>Section:</label>
        <input 
          type="text" 
          name="section" 
          value={formData.section} 
          onChange={handleChange} 
          required 
        />
        
        <label>Address:</label>
        <input 
          type="text" 
          name="address" 
          value={formData.address} 
          onChange={handleChange} 
          required 
        />

        <label>Password:</label>
        <div className="password-wrapper">
  <input 
    type={showPassword ? 'text' : 'password'}
    name="password"
    value={formData.password}
    onChange={handleChange}
    onDoubleClick={() => {
      setShowPassword(true);
      setTimeout(() => setShowPassword(false), 10000); 
    }}
    required 
  />

  <PasswordChecklist
    rules={["minLength", "specialChar", "number", "capital"]}
    minLength={5}
    value={formData.password}
  />
</div>


        <button type="submit">Submit</button>
      </form>
<Footer/>
      {submitted && <div className="success-message">Thank you for registering!</div>}
    </div>
  );
}

export default RegistrationForm;
