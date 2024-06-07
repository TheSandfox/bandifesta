import './festival.css';

export default function FestivalSelect({handleValue,value}) {
	const changeCallback = (event)=>{
		handleValue.set(event.target.value);
	}
	return <select className='festivalSelect' onChange={changeCallback}>
		{value.map((strVal,index)=>{
			return <option>
				{strVal}
			</option>
		})}
	</select>
}