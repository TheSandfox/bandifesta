import { useEffect } from "react"
import FestivalDatePicker from "../../generic/festival/FestivalDatePicker";
import './subfestivalschedule.css';

export default function SubFestivalSchedule({handleTabState,index}) {
	useEffect(()=>{
		handleTabState.set(index);
	},[])

	const dateChangeCallback = (val)=>{
		console.log(val);
	}

	return <div className="subFestivalSchedule">
		<div className="top">
			{/* 달력 */}
			<FestivalDatePicker value={new Date()} onChange={dateChangeCallback}/>
			{/* 리스트 */}
			<div className="festivalListContainer shadowBox">

			</div>
		</div>
	</div>
}