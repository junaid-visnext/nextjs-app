'use client'
import axios from 'axios';
import '../../globals.css'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import rightIcon from '../../images/right1.svg'
import login from '../../images/login.jpeg'
import user from '../../images/user.svg'
import mail from '../../images/mail.svg'
import lock from '../../images/lock.png'
import { FormFooter } from './FormFooter';
import { ArrowButton } from './ArrowButton';
import { InputField } from './InputField';
import { InputFormHead } from './InputFormHead';
import { InputForm } from './InputForm';

function Signup() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [user_type, setUserType] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    const user_type = searchParams.get('user_type')
    if (!user_type) {
      router.push("/");
    }
    else {
      setUserType(user_type)
    }

  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault();
    const headers = {
      'Content-Type': 'application/json',
    };
    try {
      const response = await axios.post('http://localhost:8000/auth/signup', {
        username,
        email,
        user_type,
        password,
      },
        { headers })
      const data = response.data;
      if (response.status == 200) {
        localStorage.setItem('token', data.jwt_token);
        localStorage.setItem('user', JSON.stringify(data.message))
        router.push("/dashboard");
      }

    } catch (error) {
      alert('user already exist')

    }
  };
  return (

    <section className="vh-100" style={{ width: '99%' }}>
      <div className="row">
        <div id="img" className="imgss col-lg-5 d-flex align-items-center " style={{ backgroundColor: 'black', overflow: 'hidden', width: '40%' }}>
          <Image src={login}
            alt="auth image" className="vh-100" style={{ objectFit: 'cover', objectPosition: 'left', opacity: '0.4' }} />
        </div>
        <InputForm handleSubmit={handleSubmit}>
          <InputFormHead title="Signup" details="Please fill your information below" />
          <InputField value={username} setValue={setUsername} img={user} label="User Name" inputType='text' minlength="4" />
          <InputField value={email} setValue={setEmail} img={mail} label="E-mail" inputType='email' />
          <InputField value={password} setValue={setPassword} img={lock} label="Password" inputType='password' minlength="8" />
          <ArrowButton value="Sign Up" img={rightIcon} />
          <FormFooter title="Already have an account?" label="Login to your account" url="/login" />
        </InputForm>
      </div>
    </section>
  );
}

export default Signup;



