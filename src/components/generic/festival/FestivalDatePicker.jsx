import { configContext } from '../../../App';
import './festivaldatepicker.css';
import { useContext, useEffect, useMemo, useState } from "react"

export default function FestivalDatePicker({value,onChange}) {
	const config = useContext(configContext);
	const [targetDate,setTargetDate] = useState({
		value:value
			?new Date(value.getFullYear(),value.getMonth(),value.getDate())
			:new Date(),
		display:value
			?new Date(value.getFullYear(),value.getMonth(),value.getDate())
			:new Date(),
	})
	const [targetYear,targetMonth] = useMemo(()=>{
		return [targetDate.display.getFullYear(),targetDate.display.getMonth()];
	},[targetDate])
	//타겟핸들러
	const handleTargetDate = {
		set: (val)=>{
			setTargetDate({
				value:val,
				display:val
			})
		},
		setValue: (targetVal)=>{
			setTargetDate({
				value:targetVal,
				display:targetDate.display
			});
		},
		setDisplay: (displayVal)=>{
			setTargetDate({
				value:targetDate.value,
				display:displayVal
			});
		}
	}
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
			onChange(targetDate.value.getTime());
		}
	},[targetDate])
	//
	let localeString = ['축제일정','일','월','화','수','목','금','토'];
	switch (config.language) {
	case 'Eng' :
		localeString = ['Today','S','M','T','W','T','F','S'];
		break;
	case 'Jpn' :
		localeString = ['スケジュール','日','月','火','水','木','金','土'];
		break;
	}
	//return JSX
	return <>
		<div className={`festivalDatePicker shadowBox`}>
			<div className="top">
				<div className="left">
					{/* 연,월 디스플레이 */}
					<div className='fontMain'>
						{localeString[0]}
					</div>
					<div className='yearAndMonth fontSubTitle'>
						{targetDate.display.getFullYear()}.{targetDate.display.getMonth()+1}
					</div>
				</div>
				<div className="right">
					{/*연,월 페이징 버튼*/}
					<div className="btn previous" onClick={()=>{handleTargetDate.setDisplay(
						new Date(targetDate.display.getFullYear(),targetDate.display.getMonth(),0)
					)}}>
					</div>
					<div className="btn next" onClick={()=>{handleTargetDate.setDisplay(
						new Date(targetDate.display.getFullYear(),targetDate.display.getMonth()+1,1)
					)}}>
					</div>
				</div>
			</div>
			<div className="bottom">
				{/* 요일 */}
				<div className="dayColumns">
					<div className="dayColumn fontMain red">{localeString[1]}</div>
					<div className="dayColumn fontMain">{localeString[2]}</div>
					<div className="dayColumn fontMain">{localeString[3]}</div>
					<div className="dayColumn fontMain">{localeString[4]}</div>
					<div className="dayColumn fontMain">{localeString[5]}</div>
					<div className="dayColumn fontMain">{localeString[6]}</div>
					<div className="dayColumn fontMain blue">{localeString[7]}</div>
				</div>
				{/* 날짜 위젯들 */}
				<div className='days'>
					{/* 날짜위젯 뿌리기 */}
					{days.map((day,index)=>{
						return <div key={index} 
							className={`day fontMain ${
									String(day.dateValue)===String(targetDate.value)
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
								()=>{handleTargetDate.set(day.dateValue);}
							}
						>
							{day.display}
						</div>
					})}
				</div>
			</div>
		</div>
	</>
}