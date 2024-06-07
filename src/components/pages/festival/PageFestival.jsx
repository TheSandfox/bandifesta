import { useParams } from "react-router-dom"
import SubFestivalGallery from "./SubFestivalGallery";
import { useState } from "react";
import SubFestivalSchedule from "./SubFestivalSchedule";
import { SsangTab, SsangTabContainer } from "../../generic/SsangTab";

export default function PageFestival({}) {
	const { tabName } = useParams();
	const [tabState,setTabState] = useState(0);
	const handleTabState = {
		set:(index)=>{
			setTabState(index);
		}
	}
	let jsx = <></>
	switch (tabName) {
		case 'gallery':
			jsx = <SubFestivalGallery handleTabState={handleTabState} index={0}/>
			break;
		case 'schedule':
			jsx = <SubFestivalSchedule handleTabState={handleTabState} index={1}/>
			break;
		default:
	}
	return <div className="mainContent">
		<div className="tabContentDivision">
			<SsangTabContainer>
				<SsangTab to={'/festival/gallery'} active={tabState===0}>갤러리뷰</SsangTab>
				<SsangTab to={'/festival/schedule'} active={tabState===1}>스케쥴뷰</SsangTab>
			</SsangTabContainer>
			<div>
				{jsx}
			</div>
		</div>
	</div>
}