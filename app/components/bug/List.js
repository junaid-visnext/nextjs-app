
import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import { MyContext } from "../MyContext";
import ListItem from "./ListItem";
import Image from "next/image";
import circleDot from "../../images/circle-doted.svg"
import profile2 from "../../images/menu/profile2.svg"
import galleryAdd from "../../images/gallery-add.svg"
import cloud from "../../images/cloud.svg"
import calendarDot from "../../images/calendar-doted.svg"
import plus from "../../images/plus.svg"
import downIcon from "../../images/menu/down-icon.svg"
import { TableHead } from "./TableHead";

function List(props) {
  const [show, setShow] = useState(false);
  const [b_id, setBId] = useState("");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [deadline, setDeadline] = useState("");
  const [image, setImage] = useState("");
  const [user, setUser] = useState("");
  const [statusChange, setStatusChange] = useState("");

  const handleClose = () => setShow(false);

  const handleShow = (bug) => {
    setBId(bug.id)
    setTitle(bug.title)
    setStatus(bug.status)
    setUser(bug.assign_to)
    if (bug.type == "feature") {
      setStatusChange("Completed")
    }
    else {
      setStatusChange("Resolved")
    }
    setType(bug.type)
    setShow(true)
  };  
  const handleImageChange = (e) => {
    setImage(e.target.files[0])
  };
  const { bugs,setBugs } = useContext(MyContext);
  const handleStatusChange = async (e) => {
    setStatus(e.target.value);
    let status = e.target.value;
    const headers = {
      'Content-Type': 'application/json',
    };
    try {
      const response = await axios.post('http://localhost:8000/api/user/' + props.user.id + '/bug/' + b_id+ '/update', {
        status,
      },
        { headers })
      if (response.data.status == 200) {
        setBugs(response.data.bugs)
      }

    } catch (error) {
      alert('error')
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const headers = {
  //     'content-type': 'multipart/form-data'
  //   }
  //   try {
  //     let form_data = new FormData();
  //     form_data.append('image', image, image.name);
  //     form_data.append('title', title);
  //     form_data.append('description', description);
  //     form_data.append('type', type);
  //     form_data.append('status', status);
  //     form_data.append('deadline', deadline);
  //     form_data.append('user', user);
  //     const response = await axios.put('http://localhost:8000/api/user/' + props.user.id + '/project/' + props.project.id + '/bugs/'+b_id+'/edit' , form_data,
  //       { headers })
  //     const data = response.data;
  //     if (response.data.status == 200) {
  //       setTitle("");
  //       setDescription("")
  //       setDeadline("")
  //       setImage("")
  //       setShow(false)
  //       setBugs(response.data.bugs)
  //     }
  //     if (response.data.status == 401) {
  //       alert('Please fill the form correctlys')
  //     }
  //   } catch (error) {
  //     alert('user already exist')
  //   }
  // };
  return (
    <>
      <table className="table">
        <TableHead user_type={props.user.user_type}/>
        <tbody>
          {bugs.map(bug => {
            return <ListItem handleShows={handleShow} bug={bug} user={props.user} key={bug.id} />
          })}
        </tbody>
      </table>
      <Modal
        size="xl"
        centered
        show={show}
        onHide={handleClose}
        keyboard={false}
      >
        <div>
          <div className="text-end p-2" style={{ backgroundColor: '#F5F6F8' }}>
            <button type="button" className="btn bg-black text-white " onClick={handleClose}>X </button>
          </div>
          <div className="row">
            <div className="col-7" >
              <div className="modal-header" style={{ width: '680px' }}>
                <div className="row ms-2">
                  <div className="col-6 row" style={{ width: '320px' }}>
                    <div className=" col-4 p-2 rounded text-center pt-3 " style={{ width: '142px', height: '50px', color: '#3069FE', fontWeight: '600', fontSize: '16px', backgroundColor: '#EEF3FF' }}>
                      {status}
                    </div>
                    <div className="col-4 p-2 ms-1 rounded text-center  pt-3" style={{ width: '50px', height: '50px', backgroundColor: '#EEF3FF' }}>
                      <svg width="20" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.29289 8.20711C7.68342 8.59763 8.31658 8.59763 8.70711 8.20711L15.0711 1.84314C15.4616 1.45262 15.4616 0.819452 15.0711 0.428928C14.6805 0.0384037 14.0474 0.0384041 13.6569 0.428929L8 6.08579L2.34314 0.428936C1.95262 0.0384115 1.31945 0.0384119 0.928928 0.428937C0.538404 0.819461 0.538405 1.45263 0.928929 1.84315L7.29289 8.20711ZM7 6.5L7 7.5L9 7.5L9 6.5L7 6.5Z" fill="#3069FE" />
                      </svg>
                      <select role="button" class="form-select form-select-sm" style={{opacity:'0',position:'relative',top:'-30px', width:'30px',backgroundColor: '#EEF3FF'}} value={status} onChange={(e)=>handleStatusChange(e)}>
                  <option value="new">New</option>
                  <option value="started">Started</option>
                  <option value={statusChange.toLowerCase()}>{statusChange}</option>
                </select>
                    </div>
                  </div>
                  <div className="col-4" style={{ width: '260px' }}>
                  <div style={{ position: 'relative' }}>
                    <Image src={circleDot} style={{ position: 'absolute', top: '2px' }} role="button" height={40} alt="circle doted icon" />
                    <p style={{ position: 'absolute', left: '25px', top: '20px' }}>
                      <Image style={{ borderRadius: '20px', padding: '3px', height: '16px', width: '16px', backgroundColor: '#9BA4B4' }} role="button" src={plus} />
                    </p>
                    <Image src={profile2} style={{ position: 'absolute', left: '-25px' }} height={45} alt="profile image" />
                    <Image src={profile2} style={{ position: 'absolute', left: '-45px' }} height={45} alt="profile image" />
                  </div>
                  <select role="button" style={{ opacity: '0', marginTop: '10px', width: '0px' }} value={user} class="form-select form-select-sm" >
                    {(props.project_users).map(function (user) {
                      return (
                        <option key={user.id} value={user.id}>{user.username}</option>
                      );
                    })}
                  </select>
                </div>
                  <div className="col-1  pt-3" >
                    <svg width="27" height="7" viewBox="0 0 27 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.25 3.5C20.25 5.425 21.7687 7 23.625 7C25.4812 7 27 5.425 27 3.5C27 1.575 25.4813 -6.63867e-08 23.625 -1.47526e-07C21.7688 -2.28665e-07 20.25 1.575 20.25 3.5ZM16.875 3.5C16.875 1.575 15.3562 -5.08964e-07 13.5 -5.90104e-07C11.6438 -6.71243e-07 10.125 1.575 10.125 3.5C10.125 5.425 11.6437 7 13.5 7C15.3562 7 16.875 5.425 16.875 3.5ZM6.75 3.5C6.75 1.575 5.23125 -9.51542e-07 3.375 -1.03268e-06C1.51875 -1.11382e-06 -6.88454e-08 1.575 -1.5299e-07 3.5C-2.37134e-07 5.425 1.51875 7 3.375 7C5.23125 7 6.75 5.425 6.75 3.5Z" fill="#3A3541" fill-opacity="0.54" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="m-4" style={{ fontWeight: "400", fontSize: '16.26px', height: '745px', width: '630px' }}>
                <div className="form-outline ">
                </div>
                <div className="pt-1 mb-4">
                <textarea id="titleid" type="textarea" className="mt-5  border-0"
                style={{ fontSize: '32px', paddingLeft: '0px' }} placeholder="Add title here" value={title}
                onChange={(e) => setTitle(e.target.value)} required ></textarea>
                  {/* <div style={{ fontSize: '27.35px', fontWeight: '500', width: '450px', marginBottom: '20px' }}>
                  {title}

                  </div> */}
                  <div className="dropzone w-100" style={{ backgroundColor: '#FAFBFC' }}>
                    <Image src={galleryAdd} className="upload-icon" alt="gallery image" />
                    <p > Add image here</p>
                    <input type="file" className="upload-input"  onChange={handleImageChange}/>
                  </div>
                </div>
                <div data-mdb-input-init className="form-outline pt-4 ">
                  <label className="form-label">Bug details</label>
                  <input type="" className="form-control form-control-lg" name="description" value={description}
                onChange={(e) => setDescription(e.target.value)} required />
                </div>
              </div>
              <div className="" style={{ height: '79px', width: '676px', boxShadow: '0px  2px 7px gray' }}>
                <div className="text-center">
                  <Image src={cloud} alt="cloud icon" />
                  <label className="form-label ms-2" role="button" style={{ fontSize: '17px', fontWeight: '500', color: 'rgba(76, 83, 95, 0.4)' }}>Drag any file here <a className="text-decoration-none" style={{ color: '#007DFA' }}>
                    browse</a></label>
                  <input id="fileImage" className="upload-input" style={{ top: '-35px', height: '20px' }} type="file" name="image"
                  />
                  <p id="imagename"></p>
                </div>
              </div>
            </div>
            <div className="col-5" style={{ width: '470px' }}>
              <div className="modal-header bg-white" style={{ borderLeft: "1px solid rgba(217, 217, 217, 1)", borderTopLeftRadius: "0px 0px", height: '83px' }}>
                <div className="ms-4" style={{ color: 'rgba(149, 146, 152, 0.3)', fontWeight: '600', fontSize: '15px' }}>
                  Created
                  <div style={{ color: 'rgba(141, 152, 170, 1)', fontWeight: '500', fontSize: '14px' }}> Aug 10, 6:16 pm</div>
                </div>
                <div class="vr ms-3 me-3 m-2"></div>
                <Image className="" src={calendarDot} alt="circle doted icon" />
              </div>
              <div style={{ backgroundColor: '#F5F6F8', fontWeight: "400", fontSize: '16.26px', height: '792px', width: '460px' }}>
              </div>
              <div className="text-start bg-white " style={{ boxShadow: '0px  3px 7px gray', width: '460px', height: '80px' }}>
                <p className="pt-3 ps-3" style={{ color: 'rgba(76, 83, 95, 0.4)' }}>Comment or type here</p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default List;
