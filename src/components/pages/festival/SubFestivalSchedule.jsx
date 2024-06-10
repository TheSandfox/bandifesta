import { useEffect } from "react"
import FestivalDatePicker from "../../generic/festival/FestivalDatePicker";

export default function SubFestivalSchedule({handleTabState,index}) {
	useEffect(()=>{
		handleTabState.set(index);
	},[])

	return <>
		<FestivalDatePicker value={new Date()}/>
	</>
}