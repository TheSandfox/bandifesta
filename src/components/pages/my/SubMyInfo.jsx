import { useEffect } from "react";

export default function SubMyInfo({handleTabState,index}) {
	useEffect(()=>{
		handleTabState.set(index);
	},[])
	return <>
	</>
}