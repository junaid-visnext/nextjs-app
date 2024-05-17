import React from 'react'

export const InputFormHead = (props) => {
  return (
    <div>
      <h3 className="mb-3 pb-3" style={{ fontSize: '28px', color: '#2F3367', fontWeight: '700' }}>{props.title}</h3>
      <p style={{ fontSize: '16px', color: '#8692A6', fontWeight: '500' }}>{props.details}</p>
    </div>
  )
}
