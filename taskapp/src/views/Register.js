import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { URL } from "../config";

const Register = (props) => {
	const [ formData, setFormData ] = useState({
		email: '',
		password: '',
		password2: '',
    admin: false,
	});
	const [ message, setMessage ] = useState('');

	const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
		debugger
		e.preventDefault();
		try {
			const response = await axios.post(`${URL}/users/register`, {
				email: formData.email,
				password: formData.password,
				password2: formData.password2
			});
			setMessage(response.data.message);
			//console.log(response)
			if (response.data.ok) {
				setTimeout(() => {
					navigate('/login');
				}, 500);
			}
		} catch (error) {
			console.log(error);
		}
	};

  return (

    <div>
        <h1>Add User</h1>

    <div className="formContainer">
      <form onSubmit={handleSubmit}>
        <label>
          Email Address:
          <input 
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>

        <label>
          Password:
          <input 
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <label>
          Repeat Password:
          <input 
            type="password"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
          />
        </label>
        <label>
  <span>Admin</span><input 
  type="checkbox"
  name="admin"
  checked={formData.admin}
            onChange={handleChange}/>
  <span class="slider round"></span>
</label>
        <button type="submit">Submit</button>
      </form>
      <div class="registerMessage">
      <p>{message}</p>
      </div>
      </div>
    </div>
  );
};

export default Register;