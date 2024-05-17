import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import projectImg from "../../images/project1.svg"


function CardItem(props) {
  const [totalTask, setTotalTask] = useState(0)
  const [remainingTask, setRemainingTask] = useState(0)
  useEffect(() => {
    try {
      axios.get('http://localhost:8000/api/user/' + JSON.parse(localStorage.getItem('user')).id + '/project/' + props.project.id + '/bugs', {
      })
        .then(res => {
          if (res.data.status == 200) {
            const bugs = res.data.bugs;
            let remaining = 0;
            let total = 0
            for (let bug in bugs) {
              if (bugs[bug].status != "completed" && bugs[bug].status != "resolved") {
                remaining += 1
                setRemainingTask(remaining)
              }
              total += 1
              setTotalTask(total)
            }
          }
        })
    } catch (error) {
      console.log("error")
    };
  }, [])
  return (
    <div className="col">
      <div className="card shadow-sm rounded hover-border border link">
        <Link className="card align-items-start border-0 text-decoration-none"
          href={"/dashboard/project/[id]/bugs}"} as={`/dashboard/project/${props.project.id}/bugs`}>
          <div className="ms-4 mt-4"> <Image src={projectImg}
            className="img-fluid" style={{ height: '60px', width: '60px' }} alt="Profile image" />
          </div>
          <div className="card-body">
            <div className="card-body">
              <h5 className="card-title d-flex align-items-start" style={{ fontSize: '14px', fontWeight: '600' }}>{props.project.name}</h5>
              <p className="card-title d-flex align-items-start" style={{ color: '#87888C', fontSize: '12.67px', fontWeight: '400' }}>{props.project.details} </p>
              <p className="card-title" style={{ fontSize: '12.67px', fontWeight: '400' }}><span style={{ color: '#87888C', fontWeight: '500' }}>Task Done: </span>{remainingTask}/{totalTask}</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
export default CardItem;