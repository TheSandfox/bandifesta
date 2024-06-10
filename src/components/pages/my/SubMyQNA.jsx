import { useEffect } from "react";

export default function SubMyQNA({handleTabState,index}) {
	useEffect(()=>{
		handleTabState.set(index);
	},[])
	return <>
	</>
}