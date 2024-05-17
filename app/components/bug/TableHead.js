import React from 'react'
import { TableHeadElement } from './TableHeadElement'

export const TableHead = (props) => {
	return (
		<thead style={{ height: '60px' }} >
			<tr >
				<th className="pb-3 " scope="col" style={{ backgroundColor: '#F9FAFC', width: '30px' }}>
					<div className="form-check ms-2">
						<input style={{ borderRadius: '3px' }} className="border-2 border-secondary form-check-input fs-5" type="checkbox" value="" id="flexCheckDefault" />
						<span style={{ color: 'lightgray', fontSize: '14px' }}>|</span>
					</div>
				</th>
				<TableHeadElement title="TITLE"/>
				<TableHeadElement title="STATE"/>
				<TableHeadElement title="STATUS"/>
				<TableHeadElement title="DUE DATE"/>
				<TableHeadElement title="ASSIGNED TO"/>
				{props.user_type != "manager" ? <TableHeadElement title="ACTION"/>: <></>}
			</tr>
		</thead>
	)
}
