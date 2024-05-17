'use client'
import axios from 'axios';
import '../../globals.css'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import rightIcon from '../../images/right1.svg'
import login from '../../images/login.jpeg'
import lock from '../../images/lock.png'
import user from '../../images/user.svg'
import { InputField } from './InputField';
import { ArrowButton } from './ArrowButton';
import { InputFormHead } from './InputFormHead';
import { FormFooter } from './FormFooter';
import { InputForm } from './InputForm';

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const headers = {
      'Content-Type': 'application/json',
    };
    try {
      const response = await axios.post('http://localhost:8000/auth/login', { username, password },
        { headers })
      const data = response.data;
      if (response.status == 200) {
        localStorage.setItem('token', data.jwt_token);
        localStorage.setItem('user', JSON.stringify(data.message))
        router.push('/dashboard')
      }

    } catch (error) {
      alert('Invalid credentials')

    }
  };
  return (
    <section className="vh-100" style={{ width: '99%' }}>
      <div className="row">
        <div id="img" className=" col-lg-5 d-flex align-items-center " style={{ backgroundColor: 'black', overflow: 'hidden', width: '40%' }}>
          <Image src={login}
            alt="Auth image" className="vh-100" style={{ objectFit: 'cover', objectPosition: 'left', opacity: '0.4' }} />
        </div>
        <InputForm handleSubmit={handleSubmit}>
          <InputFormHead title="Login" details="Please Enter your Login details Here" />
          <InputField value={username} setValue={setUsername} img={user} label="User Name" inputType='text' />
          <InputField value={password} setValue={setPassword} img={lock} label="Password" inputType='password' minlength="8"/>
          <ArrowButton value="Login" img={rightIcon} />
          <FormFooter title="Don't have an account?" label="Create account" url="/" />
        </InputForm>
      </div>
    </section>
  );
}

export default Login;


