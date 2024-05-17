'use client'
import axios from 'axios';

import Link from "next/link";
import React, { useState, useContext } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import { MyContext } from '../MyContext';
import Image from 'next/image';
import downIcon from '../../images/menu/down-icon.svg';
import search from '../../images/menu/search.svg';
import icon from '../../images/menu/icon.svg';
import galleryAdd from '../../images/gallery-add.svg';

function ProjectHeader(props) {
  // let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [deadline, setDeadline] = useState('');
  const [userIds, setUserIds] = useState([]);
  const { projects, setProjects, allUsers } = useContext(MyContext);
  const handleCheckBox = (e) =>{
    if(e.target.checked){
      userIds.push(e.target.value)
    }
    else{
      const index = userIds.indexOf(e.target.value);
      userIds.splice(index, 1);
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const headers = {
      'Content-Type': 'application/json',
    };
    try {
      const response = await axios.post('http://localhost:8000/api/user/' + JSON.parse(localStorage.getItem('user')).id + '/projects/', {
        name,
        details,
        deadline,
        userIds,
      },
        { headers })
      const data = response.data;
      if (response.status == 200) {
        setName('')
        setDetails('')
        setDeadline('')
        setShow(false)
        setProjects(data)
      }
    } catch (error) {
      console.log('error')

    }
  };

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div className="text-decoration-none text-black ms-5" ref={ref} onClick={e => {
      e.preventDefault();
      onClick(e);
    }}>
      My Project
      <Image role="button" src={downIcon} alt='down arrow icon' />
      {children}
    </div>
  ));
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <div className="d-flex align-items-center ">
        <div className="d-flex flex-column" style={{ height: '80px', width: '5px', backgroundColor: '#50A885' }}>
          <div className="vr"></div>
        </div>
        <div className="d-flex flex-column ms-3">
          <p className="m-0 p-0" style={{ fontWeight: '600', fontSize: '16px' }}>Projects</p>
          <p className="m-0 p-0" style={{ color: '#AEAEAE', fontWeight: '400', fontSize: '14px' }}>Hi {props.user.username}, welcome to ManageBug</p>
        </div>
        <div className="row height d-flex ms-4 ">
          <div className="col-md-8">
            <div className="search">
              <Image className="input-search" src={search} alt='search icon' />
              <input id="searchInput" type="text" className="form-control" placeholder="Search for Projects here"
                name="searchField" />
            </div>
          </div>
        </div>
        <div className="d-flex flex-column ms-3" style={{ width: '220px' }}>
          {props.user.user_type == "manager" ?
            <div type="button" className="btn btn-lg btn-primary button-color" onClick={handleShow} style={{ fontSize: '14px', fontWeight: '500', height: '45px', width: '180px', paddingTop: '12px' }}
            >+ Add New Project</div> : <></>}
        </div>
        <div style={{ width: '420px', fontSize: '14px', fontWeight: '400' }} >
          <div className="row ">
            <div className="col-5 pt-3">
              <div className="d-flex ms-5 ps-4 text-black ">
                Sort By
                <Image role="button" src={downIcon} alt='down arrow icon' />
              </div>
            </div>
            <div className="col-5 pt-3">
              <div className="d-flex flex-column">
                <Dropdown>
                  <Dropdown.Toggle as={CustomToggle}>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Header>Projects</Dropdown.Header>
                    {projects.map(project => {
                      return <Dropdown.Item key={project.id}> <Link className='text-decoration-none text-black' href={'/dashboard/project/' + project.id + '/bugs'}>{project.name}</Link></Dropdown.Item>
                    })}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className="col-2">
              <a type="button" className="btn btn-lg btn-primary button-color">
                <Image src={icon} alt='icon' /></a>
            </div>
          </div>
        </div>
      </div>
      <hr className="mt-0" style={{ color: 'gray' }} />
      <Modal
        size="lg"
        centered
        show={show}
        onHide={handleClose}
        keyboard={false}
      >
        <div className="modal-content">
          <div className="row ">
            <div className="col-8">
              <div className="modal-body m-4">
                <div>
                  <h1 className="modal-title mb-5" style={{ fontSize: '20px', fontWeight: '500' }} id="addProjectLabel">Add new Project</h1>
                  <form method="post" onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <label className="form-label text-black">Project name</label>
                      <input type="text" className="form-control form-control-lg " id="placeholdercolor" style={{ borderColor: '#F4F4F5', fontSize: '16px' }}
                        placeholder="Enter project name" value={name}
                        onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label text-black">Short details</label>
                      <input type="text" className="form-control form-control-lg" id="placeholdercolor" style={{ borderColor: '#F4F4F5', fontSize: '16px' }}
                        placeholder="Enter details here" value={details}
                        onChange={(e) => setDetails(e.target.value)} required />
                    </div>
                    <div className="form-outline mb-4">

                      <label className="form-label text-black">Deadline</label>
                      <input id="startDatea" className="form-control form-control-lg" style={{ borderColor: '#F4F4F5', fontSize: '16px' }} type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary me-2" style={{ width: '200px', height: '60px', fontSize: '18px' }}> Add</button>
                    <button type="button" className="btn btn-lg btn-secondary " style={{ width: '200px', height: '60px', fontSize: '18px', backgroundColor: 'white', color: 'black', borderColor: '#D4D4D8' }} onClick={handleClose} >Cancel</button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-4 row">

              <div class="list-group col-6">
                Dev
                {allUsers.map(user => {
                  return user.user_type == "developer" ? <label class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value={user.id} onChange={handleCheckBox}/>
                    {user.username}
                  </label> : <></>
                  // <Dropdown.Item key={project.id}> <Link className='text-decoration-none text-black' href={'/dashboard/project/' + project.id + '/bugs'}>{project.name}</Link></Dropdown.Item>
                })}
              </div>
              <div class="list-group col-6">
                QA
                {allUsers.map(user => {
                  return user.user_type == "qa" ? <label class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value={user.id} onChange={handleCheckBox}/>
                    {user.username}
                  </label> : <></>
                })}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>


  );
}

export default ProjectHeader;



