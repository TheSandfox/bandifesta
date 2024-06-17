import { useEffect } from "react";
import IntroTitle from "./intro_components/IntroTitle"
import MyComponent from "../../generic/googlemap/MyComponent"
import SubIntroLocation_sec1 from './SubIntroLocation/SubIntroLocation_sec1'
export default function SubIntroLocation({handleTabState,index}) {
	useEffect(()=>{
		handleTabState.set(index);
	},[])

	return <>
			<IntroTitle introTitle={"오시는 길"}/>
			<MyComponent />
			<SubIntroLocation_sec1 />
	</>
}