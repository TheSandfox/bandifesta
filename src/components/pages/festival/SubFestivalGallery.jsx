import { useEffect } from "react"

export default function SubFestivalGallery({handleTabState,index}) {
	useEffect(()=>{
		handleTabState.set(index);
	},[])
	return <>
		갤라리
	</>
}