import { useEffect } from "react";
import IntroTitle from "./intro_components/IntroTitle"
export default function SubIntroLocation({handleTabState,index}) {
	useEffect(()=>{
		handleTabState.set(index);
	},[])
	return <>
			<IntroTitle introTitle={"프로그램 소개"}/>
			
	</>
}