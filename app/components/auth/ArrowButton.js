import React from 'react'
import Image from 'next/image'

export const ArrowButton = (props) => {
  return (
    <div className="pt-1 mb-4 mt-4">
      <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary" style={{ width: '176px', height: '70px', fontSize: '22px', fontWeight: '600' }} type="submit">
        <div className='row'>
          <div className='col-8'>
            {props.value}
          </div>
          <div className='col-2'>
            <Image src={props.img} alt='right arrow icon' />
          </div>
        </div>
      </button>
    </div>
  )
}
