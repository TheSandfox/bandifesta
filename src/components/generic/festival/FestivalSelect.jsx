import './festival.css';

export default function FestivalSelect({handleValue,value}) {
	const changeCallback = (event)=>{
		handleValue.set(event.target.value);
	}
	return <div className='festivalSelectContainer'>
		<select className='festivalSelect fontMain' onChange={changeCallback}>
			{value.map((strVal,index)=>{
				return <option className='fontMain' key={index} value={index}>
					{strVal}
				</option>
			})}
		</select>
		<div className='festivalSelectArrow'>

		</div>
	</div>
}