import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from "next/image";
import threeDot from "../../images/menu/three-dots-v.svg"
import profile1 from "../../images/menu/profile1.svg"
import profile2 from "../../images/menu/profile2.svg"
import calendar from "../../images/calendar.svg"
import setting from "../../images/setting.svg"
import deleteIcon from "../../images/delete.svg"
import { MyContext } from '../MyContext';


function ListItem(props) {

  const { setBugs } = useContext(MyContext);
  const handleSubmit = async (status) => {
    const headers = {
      'Content-Type': 'application/json',
    };
    try {
      const response = await axios.post('http://localhost:8000/api/user/' + props.user.id + '/bug/' + props.bug.id + '/update', {
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
  const handleDelete = async () => {
    try {
      const response = await axios.delete('http://localhost:8000/api/user/' + props.user.id + '/bug/' + props.bug.id + '/update')
      if (response.data.status == 200) {
        setBugs(response.data.bugs)
      }

    } catch (error) {
      alert('error')
    }
  };
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div role='button' ref={ref} onClick={e => {
      e.preventDefault();
      onClick(e);
    }}>
      <Image src={threeDot} alt='three doted icon' />
      {children}
    </div>
  ));
  function handleShowModal() {
    props.handleShows(props.bug)
  }
  return (
    <tr style={{ paddingTop: '50px' }} className="border-1" >
      <td >
        <div className="form-check ms-2">
          <input style={{ borderRadius: '3px' }} className="border-2 border-secondary form-check-input fs-5" type="checkbox" value="" id="flexCheckDefault" />
        </div>
      </td>
      <td className="pt-3" style={{ width: '450px', color: 'gray', fontSize: '14px' }} role={props.user.user_type=="qa"?"button":""}   onClick={props.user.user_type=="qa"?handleShowModal:null}>
        {props.bug.status == "completed" || props.bug.status == "resolved" ?
          <span className="dot" style={{ backgroundColor: '#00B894' }}></span> : (props.bug.status == "new" ? <span className="dot" style={{ backgroundColor: '#EC5962' }}></span> : <span className="dot" style={{ backgroundColor: '#3069FE' }}></span>)
        }
        {props.bug.title}
      </td>
      <td className="pt-3" style={{ fontSize: '14px ' }}>{props.bug.type}</td>
      <td className="pt-3">
        {props.bug.status == "completed" || props.bug.status == "resolved" ?
          <span className="badge bg-success bg-opacity-10 fw-normal" style={{ color: '#00B894' }}>{props.bug.status}</span> : (props.bug.status == "new" ? <span className="badge bg-danger bg-opacity-10 fw-normal" style={{ color: '#EC5962' }}>{props.bug.status}</span> : <span className="badge bg-primary bg-opacity-10 fw-normal" style={{ color: '#3069FE' }}>{props.bug.status}</span>)
        }
      </td>
      <td className="pt-3"> <Image className="ms-4" style={{ width: '20px' }} src={calendar} alt='calender icon' /> </td>
      <td >
        <div className="ms-4" style={{ position: 'relative' }}>
          <Image src={profile1} style={{ height: '40px' }} alt="profile image" />
          <Image src={profile2} style={{ position: 'absolute', left: '-20px', height: '40px' }} alt="profile image" />
        </div>
      </td>
      {props.user.user_type != 'manager' ? <td>
        <div className="d-flex bd-highlight">
          <ul className="nav ">
            <li className="nav-item dropdown">
              <Dropdown  >
                <Dropdown.Toggle as={CustomToggle}>
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ width: '150px', marginLeft: '15px' }}>
                  <Dropdown.Header style={{ fontSize: '10px', color: 'black', fontWeight: 'bold' }}>
                    <div className="row">
                      <div className="col-9 ">
                        Change Status
                      </div>
                      <div className="col-2">
                        <Image src={setting} alt='seeting icon' />
                      </div>
                    </div>
                  </Dropdown.Header>
                  <span role='button' className="dropdown-item pt-0 pb-0" name="status" onClick={(e) => handleSubmit("new")}>
                    <p className="badge bg-danger bg-opacity-10 m-0" style={{ fontSize: '10px', fontWeight: '500', color: '#EC5962' }}>New</p>
                  </span>
                  <span role='button' className="dropdown-item pt-0 pb-0" name="status" onClick={(e) => handleSubmit("started")}>
                    <p className="badge bg-primary bg-opacity-10 m-0" style={{ fontSize: '10px', fontWeight: '500', color: '#3069FE' }}>Started</p>
                  </span>
                  <span role='button' className="dropdown-item pt-0 pb-0" name="status" onClick={(e) => handleSubmit(props.bug.type == 'feature' ? "completed" : "resolved")}>
                    <p className="badge bg-success bg-opacity-10 m-0" style={{ fontSize: '10px', fontWeight: '500', color: '#00B894' }}>{props.bug.type == 'feature' ? "Completed" : "Resolved"} </p>
                  </span>
                  {props.user.user_type == 'qa' ? <><hr className="dropdown-divider ms-2 me-2" style={{ color: '#65676B', fontSize: '10px' }} />
                    <div className="row">
                      <div className="col-8">
                        <span className="text-danger ps-3" style={{ fontSize: '10px' }} >Delete</span>
                      </div>
                      <div role='button' className="col-2">
                        <span ><Image src={deleteIcon} alt='delete icon' onClick={handleDelete} /> </span>
                      </div>
                    </div> </> : <></>}
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </td> : <></>}
    </tr>
  );
}

export default ListItem;
