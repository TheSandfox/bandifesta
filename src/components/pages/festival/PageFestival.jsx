import { useParams } from "react-router-dom"
import SubFestivalGallery from "./SubFestivalGallery";
import { useState } from "react";
import SubFestivalSchedule from "./SubFestivalSchedule";
import { SsangTab, SsangTabContainer } from "../../generic/SsangTab";
import { MobileTab, MobileTabContainer } from "../../generic/MobileTab";
import TopBanner from "../../generic/TopBanner";
import GoTop from "../../generic/GoTop";

export default function PageFestival({handleConfig}) {
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
			jsx = <SubFestivalGallery handleTabState={handleTabState} index={0} handleConfig={handleConfig}/>
			break;
		case 'schedule':
			jsx = <SubFestivalSchedule handleTabState={handleTabState} index={1} handleConfig={handleConfig}/>
			break;
		default:
	}
	return <>
		<TopBanner>축제둘러보기</TopBanner>
		<div className="innerbox">
			<MobileTabContainer>
				<MobileTab to={'/festival/gallery'} active={tabState===0}>전체보기</MobileTab>
				<MobileTab to={'/festival/schedule'} active={tabState===1}>달력으로 보기</MobileTab>
			</MobileTabContainer>
			<div className="mainContent">
				<div className="tabContentDivisionAlter">
					<SsangTabContainer>
						<SsangTab to={'/festival/gallery'} active={tabState===0}>전체보기</SsangTab>
						<SsangTab to={'/festival/schedule'} active={tabState===1}>달력으로 보기</SsangTab>
					</SsangTabContainer>
					<div>
						{jsx}
					</div>
				</div>
			</div>
		</div>
		<GoTop/>
	</>
}