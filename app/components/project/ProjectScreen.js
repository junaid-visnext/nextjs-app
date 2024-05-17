'use client'
import '../../globals.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import MainHeader from "../MainHeader";
import ProjectHeader from "./ProjectHeader";
import Card from './Card';
import { MyContext } from '../MyContext';
import { useRouter } from 'next/navigation'


function ProjectScreen() {
  const router = useRouter()

  const [user, setUser] = useState([])
  const [projects, setProjects] = useState([])
  const [allUsers, setAllUsers] = useState([])
  
  useEffect(() => {
    try {
      axios.get('http://localhost:8000/api/user/'+ JSON.parse(localStorage.getItem('user')).id +'/projects/',{
      })
      .then(res => {
        setProjects(res.data.projects)
        setAllUsers(res.data.users)
      })
    } catch (error) {
      console.log("error")

    };
  }, [])

  useEffect(() => {
    
    if (localStorage.getItem("user") === null || localStorage.getItem("token") === null) {
      router.push('/login')
    }
    else
    {
      setUser(JSON.parse(localStorage.getItem('user')))
    }
  }, [])
  document.body.style.backgroundColor = '#F5F6F8'
  return (
    <div className="container" >
      <MyContext.Provider value={{ projects, setProjects ,allUsers, setAllUsers}}>
        <MainHeader user={user} />
        <ProjectHeader user={user} />
        <Card/>
      </MyContext.Provider>
    </div>

  );
}

export default ProjectScreen;