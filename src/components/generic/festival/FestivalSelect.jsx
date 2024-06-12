import { useState } from 'react';
import './festival.css';

export default function FestivalSelect({handleValue,values,initialValue}) {
	const [value,setValue] = useState(initialValue||0);
	const changeCallback = (event)=>{
		setValue(event.target.value);
		handleValue.set(event.target.value);
	}
	return <div className='festivalSelectContainer'>
		<select className='festivalSelect fontMain' onChange={changeCallback} value={value}>
			{values.map((strVal,index)=>{
				return <option className='fontMain' key={index} value={index}>
					{strVal}
				</option>
			})}
		</select>
		<div className='festivalSelectArrow'>

		</div>
	</div>
}