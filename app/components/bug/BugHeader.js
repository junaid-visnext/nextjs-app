import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import Modal from 'react-bootstrap/Modal';
import Image from "next/image";
import rightArrow from "../../images/menu/right-arrow.svg";
import star from "../../images/menu/star.svg";
import threeDots from "../../images/menu/three-dots.svg";
import searchSm from "../../images/menu/search-sm.svg";
import downIcon from "../../images/menu/down-icon.svg";
import funnel from "../../images/menu/funnel.svg";
import fourSquare from "../../images/menu/four-squares.svg";
import sortDesc from "../../images/menu/sort-desc.svg";
import line from "../../images/menu/lines.svg";
import circleDot from "../../images/circle-doted.svg";
import profile2 from "../../images/menu/profile2.svg";
import plus from "../../images/plus.svg";
import calendarDot from "../../images/calendar-doted.svg";
import cloud from "../../images/cloud.svg";
import { MyContext } from "../MyContext";


function BugHeader(props) {
  const { setBugs } = useContext(MyContext);
  const [show, setShow] = useState(false);
  const [type, setType] = useState("bug");
  const [status, setStatus] = useState("new");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [image, setImage] = useState("");
  const [user, setUser] = useState("");
  const [statusChange, setStatusChange] = useState("Resolved");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleTypeChange = (e) => {
    if (e.target.value == "feature") {
      setStatusChange("Completed")
    }
    else {
      setStatusChange("Resolved")
    }
    setType(e.target.value);
  };
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };
  const handleUserChange = (e) => {
    setUser(e.target.value);
  };
  
  const handleImageChange = (e) => {
    setImage(e.target.files[0])
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const headers = {
      'content-type': 'multipart/form-data'
    }
    try {
      let form_data = new FormData();
      form_data.append('image', image, image.name);
      form_data.append('title', title);
      form_data.append('description', description);
      form_data.append('type', type);
      form_data.append('status', status);
      form_data.append('deadline', deadline);
      form_data.append('user', user);
      const response = await axios.post('http://localhost:8000/api/user/' + props.user.id + '/project/' + props.project.id + '/bugs', form_data,
        { headers })
      const data = response.data;
      if (response.data.status == 200) {
        setTitle("");
        setDescription("")
        setDeadline("")
        setImage("")
        setShow(false)
        setBugs(response.data.bugs)
      }
      if (response.data.status == 401) {
        alert('Please fill the form correctlys')
      }
    } catch (error) {
      alert('user already exist')
    }
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg " style={{ height: '80px' }}>
        <div className="container-fluid">
          <div className="d-flex flex-column ms-3 mt-3">
            <p className='mb-2' style={{ fontSize: '12px', fontFamily: 'Inter', fontWeight: '400' }}> <a className="text-secondary text-decoration-none" href="/dashboard" >Projects </a>
              <Image className="ms-1" src={rightArrow} alt="right arrow icon" /> <span
                className="text-black ms-1">{props.project.name}</span></p>
            <div className="row">
              <div className="col-10 pt-0">
                <h3 className="m-0 p-0" style={{ fontFamily: 'Inter', fontWeight: '700', fontSize: '36px', color: '#252C32' }}> All bugs listing</h3>
              </div>
              <div className="col-1 mt-3 ps-1">
                <span className="badge bg-danger bg-opacity-10" style={{ color: '#EC5962', fontWeight: '500', fontSize: '12.7px' }}>Bugs</span>
              </div>
            </div>
          </div>
          <div className="d-flex ">
            <div className='row align-items-end justify-content-end'>
              <div className=' col-1 pe-0'>
                <a type="button" className="btn p-2" style={{ backgroundColor: 'white', color: 'black', borderColor: '#D4D4D8' }} >
                  <Image src={star} alt="star icon" />
                </a>
              </div>
              <div className=' col-1 ms-4'>
                <a type="button" className="btn p-2" style={{ backgroundColor: 'white', color: 'black', borderColor: '#D4D4D8' }} >
                  <Image src={threeDots} alt="three dots icon" />
                </a>
              </div>
              <div className='col-6 ms-4 pe-0' style={props.user.user_type != "qa" ? { width: '100px' } : {}}>
                {props.user.user_type == "qa" ? <a type="button" className="btn btn-primary " onClick={handleShow} style={{ fontSize: '14px', fontWeight: '600', fontFamily: 'Inter', height: '43px', width: '160px', padding: '10px' }}>+ New Task bug </a>
                  : <></>}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <hr className="mb-0 " style={{ color: 'gray' }} />
      <div className="d-flex justify-content-between pt-2 pb-2" >
        <div className="p-2 ms-4 bd-highlight">
          <div className="search">
            <Image className="input-search" style={{ top: '11px' }} src={searchSm} alt="input search icon" />
            <input id="searchInput" type="text" style={{ fontSize: '14px', fontWeight: '400' }} className="form-control h-75 bg-body w-75" placeholder="Search"
              name="searchField" />
          </div>
        </div>
        <div className="row me-5 bd-highlight align-items-center" style={{ width: '500px', color: '#252C32', fontSize: '14px', fontWeight: '400' }} >
          <div className="col-4">
            Subtasks
            <Image src={downIcon} alt="down arrow icon" />
          </div>
          <div className="col-2">
            Me
            <Image src={downIcon} alt="down arrow icon" />
          </div>
          <div className="col-4 ms-4">
            Assignees
            <Image src={downIcon} alt="down arrow icon" />
          </div>
        </div>
        <div className="p-2  me-3 bd-highlight mt-1">
          <a type="button" className="btn p-1" style={{ backgroundColor: 'white', color: 'black', borderColor: '#D4D4D8' }} > <Image style={{ height: '15px', width: '20px' }} src={funnel} alt="funnel icon" /> </a>
          <a type="button" className="btn p-1 ms-2" style={{ backgroundColor: 'white', color: 'black', borderColor: '#D4D4D8' }} > <Image style={{ height: '15px', width: '20px' }} src={sortDesc} alt="sort desc icon" /> </a>
          <a type="button" className="btn p-1 ms-2" style={{ borderTopRightRadius: '0px', borderBottomRightRadius: '0px', backgroundColor: '#F9FAFC', color: 'black', borderColor: '#D4D4D8' }} > <Image style={{ height: '15px', width: '20px' }} src={fourSquare} alt="four square icon" /> </a>
          <a type="button" className="btn p-1" style={{ borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px', backgroundColor: '#F9FAFC', color: 'black', borderColor: '#D4D4D8' }} > <Image style={{ height: '15px', width: '20px' }} src={line} alt="lines icon" /> </a>
        </div>
      </div>
      <hr className="mt-0" style={{ color: 'gray' }} />
      <Modal
        size="lg"
        centered
        show={show}
        onHide={handleClose}
        keyboard={false}>
        <div className="modal-content  rounded-5 " style={{ height: '975px' }}>
          <div className="text-end p-2" style={{ backgroundColor: '#F5F6F8' }}>
            <button type="button" className="btn bg-black text-white " onClick={handleClose}>X </button>
          </div>
          <div className="modal-header">
            <h1 className="m-2 ms-4" style={{ fontSize: '27.35px', fontWeight: '500' }} id="addBugLabel">Add new bug</h1>
          </div>
          <form method="post" onSubmit={handleSubmit}>
            <div className="modal-body m-4" style={{ fontWeight: "400", height: '700px', fontSize: '16.26px' }}>
              <div className="row ms-0">
                <div className="col-2 ps-0 pt-2" style={{ width: '110px' }}>
                  Assign to
                </div>
                <div className="col-4" style={{ width: '90px' }}>
                  <div style={{ position: 'relative' }}>
                    <Image src={circleDot} style={{ position: 'absolute', top: '2px' }} role="button" height={40} alt="circle doted icon" />
                    <p style={{ position: 'absolute', left: '25px', top: '20px' }}>
                      <Image style={{ borderRadius: '20px', padding: '3px', height: '16px', width: '16px', backgroundColor: '#9BA4B4' }} role="button" src={plus} />
                    </p>
                    <Image src={profile2} style={{ position: 'absolute', left: '-25px' }} height={45} alt="profile image" />
                    <Image src={profile2} style={{ position: 'absolute', left: '-45px' }} height={45} alt="profile image" />
                  </div>
                  <select role="button" style={{ opacity: '0', marginTop: '10px', width: '0px' }} class="form-select form-select-sm" onChange={e => handleUserChange(e)} required>
                  <option disabled> option</option>

                    {(props.project_users).map(function (user) {
                      return (
                        <option key={user.id} value={user.id}>{user.username}</option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-4 ps-0 " >
                  Add due date
                  <Image className="ps-3" src={calendarDot} alt="calender icon" />
                  <input role="button" id="startDatea" style={{ opacity: '0', borderColor: '#F4F4F5', fontSize: '16px', position: 'relative', top: '0px', left: '-20px', cursor: 'pointer', width: '20px' }} type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)} required />
                </div>
              </div>
              <div className="w-50 mt-3">
                Status
                <select class="form-select form-select-sm" onChange={e => handleTypeChange(e)}>
                  <option value="bug">Bug</option>
                  <option value="feature">Feature</option>
                </select>
              </div>
              <div className="w-50 mt-3" >
                Status
                <select class="form-select form-select-sm" onChange={e => handleStatusChange(e)}>
                  <option value="new">New</option>
                  <option value="started">Started</option>
                  <option value={statusChange.toLowerCase()}>{statusChange}</option>
                </select>
              </div>
              <input id="titleid" type="text" className="form-control-lg mt-5  border-0"
                style={{ fontSize: '32px', paddingLeft: '0px' }} placeholder="Add title here" value={title}
                onChange={(e) => setTitle(e.target.value)} required />
              <div data-mdb-input-init className="form-outline ">
                <label className="form-label">Bug details</label>
                <input type="" className="form-control form-control-lg" value={description}
                  onChange={(e) => setDescription(e.target.value)} required />
              </div>
              <div data-mdb-input-init className="form-outline mb-4 mt-5 row">
                <div className="d-flex justify-content-center">
                  <div style={{ width: '280px', height: '70px' }}>
                    <Image src={cloud} alt="cloud icon" />
                    <label className="form-label ms-2" role="button" style={{ fontSize: '17px', fontWeight: '500', color: 'rgba(76, 83, 95, 0.4)' }}>Drag any file here <a className="text-decoration-none" style={{ color: '#007DFA' }}>
                      browse</a></label>
                    <input id="fileImage" className="upload-input" style={{ top: '-35px', height: '20px' }} type="file" name="image" onChange={handleImageChange}
                    />
                  </div>
                </div>
                <div className="text-center">
                  {image != "" ? <img src={URL.createObjectURL(image)} style={{ height: '150px', width: '200px' }} alt="Image" /> : <></>}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-lg btn-primary">Add</button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
export default BugHeader;
