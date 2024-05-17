import React from 'react'

export const TableHeadElement = (props) => {
    return (
        <th className="pb-3" scope="col" style={{ backgroundColor: '#F9FAFC', color: 'rgba(58, 53, 65, 0.87)', fontSize: '12.3px', fontWeight: '600' }}> {props.title}  <span className="float-end me-4" style={{ color: 'lightgray', fontSize: '14px' }}>|</span>
        </th>
    )
}
