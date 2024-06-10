import { useEffect, useMemo, useState } from "react"

export default function FestivalDatePicker({value,onChange}) {
	const [dateValue,setDateValue] = useState(value);
	const [targetDate,setTargetDate] = useState(new Date(value.getFullYear(),value.getMonth(),value.getDate()));
	//타겟 년,월
	const [targetYear,targetMonth] = useMemo(()=>{
		return [targetDate.getFullYear(),targetDate.getMonth()];
	},[targetDate])
	//요일오프셋
	const weekdayOffset = useMemo(()=>{
		return new Date(targetYear,targetMonth,1).getDay();
	},[targetMonth])
	//day배열(맵으로 뿌릴거)
	const days = useMemo(()=>{
		return new Array(42).fill('').map((temp,index)=>{
			let now = new Date();
			let newDate = new Date(targetYear,targetMonth,(index+1)-weekdayOffset)
			return {
				display:newDate.getDate(),
				dateValue:newDate,
				today:newDate.getFullYear()===now.getFullYear()
					&&newDate.getMonth()===now.getMonth()
					&&newDate.getDate()===now.getDate(),
				inMonth:targetMonth===newDate.getMonth()
			};
		})
	},[weekdayOffset])
	//외부 onChange
	useEffect(()=>{
		if(onChange) {
			onChange(dateValue);
		}
	},[dateValue])
	const select = ()=>{
		setDateValue(targetDate);
		setEditMode(false);
	}
	//선택버튼클릭
	const selectButtonCallback = ()=>{
		select();
	}
	//엔터치기
	const dblClickCallback = (e)=>{
		select();
	}
	//return JSX
	return <>
		<div className={`festivalDatePicker`}>
			{/* 연,월 디스플레이 */}
			<div className='yearAndMonth'>
				{targetDate.getFullYear()}-{targetDate.getMonth()+1}
			</div>
			{/* 날짜 위젯들 */}
			<div className='days'>
				{/* 날짜위젯 뿌리기 */}
				{days.map((day,index)=>{
					return <div key={index} 
						className={`day ${
								String(day.dateValue)===String(targetDate)
								?'active'
								:''
							} ${
								day.today?'today':''
							} ${
								day.inMonth?'inMonth':''
							} ${
								day.dateValue.getDay()===0?'red':''
							} ${
								day.dateValue.getDay()===6?'blue':''
							}`
						} 
						onClick={
							()=>{setTargetDate(day.dateValue);}
						}
						onDoubleClick={
							dblClickCallback
						}
					>
						{day.display}
					</div>
				})}
			</div>
			{/* 하단 선택버튼 */}
			<div className='bottom'>
				<button onClick={selectButtonCallback}>선택</button>
			</div>
		</div>
	</>
}