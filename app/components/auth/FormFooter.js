import React from 'react'

export const FormFooter = (props) => {
  return (
    <div> <hr style={{ width: '443px', color: 'lightgray' }} />
      <div className='pt-3' style={{ width: '450px' }} >
        <div className='row'>
          <div className='col-6'>
            {props.title}
          </div>
          <div className='col-6  text-end'>
            <a href={props.url} className="text-decoration-none" style={{ color: '#007DFA', fontSize: '16px', fontWeight: '600' }}>{props.label}</a>
          </div>
        </div>
      </div>
    </div>
  )
} 
