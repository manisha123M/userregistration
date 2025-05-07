import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

   const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { email, password } = formData;
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Login successful!');
        navigate('/dashboard');
        // Redirect to a protected page or home
      } else {
        alert('Login failed.');
      
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error logging in.');
    }
  };

  return (
    <div className="form-container">
        <Header/>
      <form onSubmit={handleSubmit}>
      <h2>Login Form</h2>
        <label>Email Address:</label>
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />

        <label>Password:</label>
        <input 
          type="password" 
          name="password" 
          value={formData.password} 
          onChange={handleChange} 
          required 
        />

        <button type="submit">Login</button>
        <h4 >if not registered <a href='/register'>create a new account</a></h4>
      </form>
      <Footer/>
    </div>
  );
}

export default LoginForm;
