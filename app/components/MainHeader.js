'use client'

import React from 'react'
import Link from "next/link";
import Image from 'next/image'
import logoImg from '../images/menu/logo.svg'
import projects from '../images/menu/projects.svg'
import tasks from '../images/menu/tasks.svg'
import manage from '../images/menu/manage.svg'
import users from '../images/menu/users.svg'
import notification from '../images/menu/notification.svg'
import message from '../images/menu/message.svg'
import profile from '../images/menu/profile.svg'
import downIcon from '../images/menu/down-icon.svg'
import Dropdown from 'react-bootstrap/Dropdown';
import { useRouter } from 'next/navigation'

const MainHeader = (props) => {
  const router = useRouter()
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div style={{ cursor: 'pointer' }} ref={ref} onClick={e => {
      e.preventDefault();
      onClick(e);
    }}>
      <Image src={downIcon} alt='down icon'/>
      {children}
    </div>
  ));
  function handleSubmit() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login') 
  };
  return (
    <div className='container'>
    <nav className="navbar navbar-expand-lg" style={{ height: '150px' }}>
      <div className="container-fluid">
        <Link href="/dashboard">
          <Image src={logoImg} alt='logo Img'/>
        </Link>
        <button className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 ms-5 mb-lg-0  container d-flex align-items-center justify-content-center" style={{ fontSize: '12px', fontWeight: '500' }}>
            <li className="nav-item" >
              <div className="row" >
                <div className="col-1 pt-1">
                  <Image src={projects} alt='project icon'/>
                </div>
                <div className="col-9">
                  <Link className="nav-link " aria-current="page" href="/dashboard" style={{ color: '#2F3367' }}> Projects</Link>
                </div>
              </div>
            </li>
            <li className="nav-item ms-3">
              <div className="row">
                <div className="col-1 pt-1">
                  <Image src={tasks} alt='task icon'/>
                </div>
                <div className="col-9">
                  <Link className="nav-link" aria-current="page" href="/#" style={{ fontSize: '13px' }}>Tasks</Link>
                </div>
              </div>
            </li>
            <li className="nav-item ms-3">
              <div className="row">
                <div className="col-1 pt-1">
                <Image src={manage} alt='manage icon'/>
                </div>
                <div className="col-9">
                  <Link className="nav-link " aria-current="page" href="/#" style={{ fontSize: '13px' }}>Manage</Link>
                </div>
              </div>
            </li>
            <li className="nav-item ms-3">
              <div className="row">
                <div className="col-1 pt-1">
                <Image src={users} alt='users icon'/>
                </div>
                <div className="col-9">
                  <Link className="nav-link" aria-current="page" href="/#" style={{ fontSize: '13px' }}>Users</Link>
                </div>
              </div>
            </li>
          </ul>
          <div className="pe-5">
            <div className="row">
              <div className="col-2 me-3">
                <Image src={notification} alt='notification icon'/>
              </div>
              <div className="col-2">
                <Image src={message} alt='message icon'/>
              </div>
            </div>
          </div>
          <div className="row ps-2 pe-3 p-2 rounded" style={{ backgroundColor: '#F5F6F8',height:'60px' }}>
            <div className="col-4 ">
              <Image className="pt-1" src={profile} alt='profile logo'/>
            </div>
            <div className="col-4">
              <p className="pt-2 ms-2 me-2"  > {props.user.username}</p>
            </div>
            <div className="col-4">
              <ul className="nav ps-3 pt-2">
                <li className="nav-item dropdown">
                  <Dropdown >
                    <Dropdown.Toggle as={CustomToggle}>
                    </Dropdown.Toggle>
                    <Dropdown.Menu size="sm" title="">
                      <Dropdown.Header>{props.user.username}</Dropdown.Header>
                      <Dropdown.Item> <div style={{ textDecoration: 'none' }} onClick={handleSubmit}> Logout </div></Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <hr className="mt-0" style={{ color: 'gray' }} />
  </div>
  );
};

export default MainHeader;