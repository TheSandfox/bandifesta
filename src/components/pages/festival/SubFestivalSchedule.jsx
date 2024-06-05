import { useEffect } from "react"

export default function SubFestivalSchedule({handleTabState,index}) {
	useEffect(()=>{
		handleTabState.set(index);
	})
	return <>
		싸-부
	</>
}