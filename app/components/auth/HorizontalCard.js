import React from 'react'
import Image from 'next/image'

export const HorizontalCard = (props) => {
  return (
    <a style={{ textDecoration: 'none' }} href={props.redirect}>
      <div className="shadow-sm p-4 mb-5 bg-body  hover-border">
        <div className="row ">
          <div className="col-lg-2 d-flex align-items-center">
            <div className='text-center' style={{ border: ' 1.5px solid #007DFA', borderRadius: '100px', height: "45px", width: '45px',paddingTop:'10px' }} >
              <Image  src={props.icon} alt='icon'/>
              </div>
          </div>
          <div className="col-lg-9 d-flex align-items-center">
            <div className="d-flex flex-column">
              <p className="m-0 p-0" style={{ color: '#2F3367', fontSize: '16px', fontWeight: '500' }}>{props.title}</p>
              <p className="m-0 p-0 " style={{ color: '#8692A6', fontSize: '14px', fontWeight: '400' }}>{props.description}
              </p>
            </div>
          </div>
          <div style={{ fontSize: '24px' }} className="col-lg-1 d-flex align-items-center hover-text">
            {'>'}
          </div>
        </div>
      </div>
    </a>
  )
}
