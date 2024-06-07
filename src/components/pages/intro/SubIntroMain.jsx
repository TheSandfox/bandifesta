import { useEffect } from "react"
import IntroTitle from "./intro_components/IntroTitle"
import SubIntroMainSec1 from "./introMainCompo/SubIntroMainSec1"
import SubIntroMainSec2 from "./introMainCompo/SubIntroMainSec2"
import SubIntroMainSec3 from "./introMainCompo/SubIntroMainSec3"
import SubIntroMainSec4 from "./introMainCompo/SubIntroMainSec4"
export default function SubIntroMain({handleTabState,index}) {
	useEffect(()=>{
		handleTabState.set(index);
	},[])
	return <>
		<SubIntroMainSec1 />
		<IntroTitle introTitle={"프로그램 소개"}/>
		<SubIntroMainSec2 />
		<SubIntroMainSec3 />
		<SubIntroMainSec4 />
	</>
}