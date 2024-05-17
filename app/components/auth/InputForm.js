import React from 'react'


export const InputForm = (props) => {
   
  return (
    <div className="col-sm-7 text-black">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <form method="post" style={{ width: '30rem' }} onSubmit={props.handleSubmit}>
        {props.children}
      </form>
    </div>
  </div>
  )
}
