'use client'
import '../../globals.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'
import MainHeader from '../MainHeader';
import BugHeader from "./BugHeader";
import { MyContext } from '../MyContext';
import List from "./List";
import { useRouter } from 'next/navigation'

function BugScreen() {
  const router = useRouter()
  const pathname = usePathname()
  document.body.style.backgroundColor = 'white'
  const [user, setUser] = useState([])
  const [bugs, setBugs] = useState([])
  const [project, setProject] = useState([])
  const [users, setUsers] = useState([])
  

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user === null || token === null) {
      router.push('/login')
    }
    else{
    let url = pathname;
    let arr = url.split("project/", 2);
    let pro_id = arr[1].split("/bugs")
    try {
      axios.get('http://localhost:8000/api/user/' + JSON.parse(localStorage.getItem('user')).id + '/project/' + pro_id[0] + '/bugs', {
      })
        .then(res => {
          if (res.data.status == 200) {
            setUsers(res.data.users)
            setBugs(res.data.bugs)
            setProject(res.data.project)
          }
          else {
            setBugs([])
          }
        })
    } catch (error) {
      console.log("error")
    };
    setUser(JSON.parse(localStorage.getItem('user')))
  }
  }, [])
  return (
    <div className="container">
      <MyContext.Provider value={{ bugs, setBugs }}>
        <MainHeader user={user} />
        <BugHeader  user={user} project={project} project_users ={users}/>
        <List user={user} project_users ={users}/>
      </MyContext.Provider>
    </div>
  );
}
export default BugScreen;