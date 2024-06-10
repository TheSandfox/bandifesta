import { useEffect } from "react";

export default function SubMyFavorites({handleTabState,index}) {
	useEffect(()=>{
		handleTabState.set(index);
	},[])
	return <>
	</>
}