import { useEffect } from "react";
import IntroTitle from "./intro_components/IntroTitle"
import SubIntroPreservation_sec1 from "./SubIntroPreservationCompo/SubIntroPreservation_sec1"
import SubIntroPreservation_sec2 from "./SubIntroPreservationCompo/SubIntroPreservation_sec2"
import SubIntroPreservation_sec3 from "./SubIntroPreservationCompo/SubIntroPreservation_sec3"
import SubIntroPreservation_sec4 from "./SubIntroPreservationCompo/SubIntroPreservation_sec4"
import SubIntroPreservation_sec5 from "./SubIntroPreservationCompo/SubIntroPreservation_sec5"
import GenericButton from "../../generic/GenericButton";
import "./SubIntroPreservation.css"
export default function SubIntroPreservation({handleTabState,index}) {
	useEffect(()=>{
		handleTabState.set(index);
	},[])
	const tiketLink = () => {
		window.location.href = "https://www.ticketlink.co.kr/product/49248"; 
	  };
	return <>
	<IntroTitle introTitle={"예매안내"}/>
	<div className ="SubIntroPreservation_button" >
	<GenericButton onClick={tiketLink}>온라인 예약하기</GenericButton>
	</div>
	<SubIntroPreservation_sec1/>
	<SubIntroPreservation_sec2/>
	<SubIntroPreservation_sec3/>
	<SubIntroPreservation_sec4/>
	<SubIntroPreservation_sec5/>
	</>
}