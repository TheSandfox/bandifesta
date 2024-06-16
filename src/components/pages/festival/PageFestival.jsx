import { useParams } from "react-router-dom"
import SubFestivalGallery from "./SubFestivalGallery";
import { useContext, useEffect, useState } from "react";
import SubFestivalSchedule from "./SubFestivalSchedule";
import { SsangTab, SsangTabContainer } from "../../generic/SsangTab";
import { MobileTab, MobileTabContainer } from "../../generic/MobileTab";
import TopBanner from "../../generic/TopBanner";
import GoTop from "../../generic/GoTop";
import { configContext } from "../../../App";

export default function PageFestival({handleConfig}) {
	const config = useContext(configContext);
	const { tabName } = useParams();
	const [tabState,setTabState] = useState(0);
	const handleTabState = {
		set:(index)=>{
			setTabState(index);
		}
	}
	let jsx = <></>
	//맨위로
	useEffect(()=>{
		window.scrollTo(0,0);
	},[])
	//앱의 뷰형식 바꿔주기
	useEffect(()=>{
		switch (parseInt(tabState)) {
		case 0 :
			handleConfig.setFestivalView('gallery');
			break;
		case 1 :
			handleConfig.setFestivalView('schedule');
			break;
		}
	},[tabState]);
	switch (tabName) {
		case 'gallery':
			jsx = <SubFestivalGallery handleTabState={handleTabState} index={0} handleConfig={handleConfig}/>
			break;
		case 'schedule':
			jsx = <SubFestivalSchedule handleTabState={handleTabState} index={1} handleConfig={handleConfig}/>
			break;
		default:
	}
	let localeString = ['','',''];
	switch (config.language) {
	case 'Kor' :
		localeString[0] = '축제둘러보기';
		localeString[1] = '전체보기';
		localeString[2] = '달력으로 보기';
		break;
	case 'Eng' :
		localeString[0] = 'FESTIVALS';
		localeString[1] = 'Gallery View';
		localeString[2] = 'Schedule View';
		break;
	case 'Jpn' :
		localeString[0] = '祭り一見';
		localeString[1] = 'ギャラリー表示';
		localeString[2] = 'カレンダー表示';
		break;
	}
	return <>
		<TopBanner>{localeString[0]}</TopBanner>
		<div className="innerbox">
			<MobileTabContainer>
				<MobileTab to={'/festival/gallery'} active={tabState===0}>{localeString[1]}</MobileTab>
				<MobileTab to={'/festival/schedule'} active={tabState===1}>{localeString[2]}</MobileTab>
			</MobileTabContainer>
			<div className="mainContent">
				<div className="tabContentDivisionAlter">
					<SsangTabContainer>
						<SsangTab to={'/festival/gallery'} active={tabState===0}>{localeString[1]}</SsangTab>
						<SsangTab to={'/festival/schedule'} active={tabState===1}>{localeString[2]}</SsangTab>
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