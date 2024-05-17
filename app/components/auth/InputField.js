
import React from 'react'
import Image from 'next/image'

export const InputField = (props) => {
    return (
        <div data-mdb-input-init className="user-input-wrp mt-4">
            <Image style={{ position: 'absolute', top: '20px', left: '20px' }} src={props.img} alt='icon' />
            <input type={props.inputType} className="form-control-lg input-fields" value={props.value} onChange={(e) => {props.setValue(e.target.value)}} minlength={props.minlength}  required />
            <span className="floating-label ">{props.label}</span>
        </div>
    )
}
