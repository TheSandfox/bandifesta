import "./PageIntro.css";
import SubIntroLocation from "./SubIntroLocation";
import SubIntroMain from "./SubIntroMain";
import SubIntroPreservation from "./SubIntroPreservation";
import { LeftTab, LeftTabContainer, LeftTabTitle } from "../../generic/LeftTab";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import TopBanner from "../../generic/TopBanner";
import { MobileTab, MobileTabContainer } from "../../generic/MobileTab";
import GoTop from "../../generic/GoTop";

export default function PageIntro({}) {
	const { tabName } = useParams();
	const [tabState, setTabState] = useState(0);
	const handleTabState = {
		set: (index) => {
		setTabState(index);
		},
	};
	let jsx = <></>;
	switch (tabName) {
		case "main":
		jsx = <SubIntroMain handleTabState={handleTabState} index={0} />;
		break;
		case "preservation":
		jsx = <SubIntroPreservation handleTabState={handleTabState} index={1} />;
		break;
		case "location":
		jsx = <SubIntroLocation handleTabState={handleTabState} index={2} />;
		break;
		default:
	}
	//탭바뀌면 탑으로
	useEffect(()=>{
		window.scrollTo(0, 0);
	},[tabState]);
	return (<>
		<TopBanner>경복궁별빛야행</TopBanner>
		<div className="innerbox">
			<MobileTabContainer>
				<MobileTab to={'/intro/main'} active={tabState===0}>행사 소개</MobileTab>
				<MobileTab to={'/intro/preservation'} active={tabState===1}>예매 안내</MobileTab>
				<MobileTab to={'/intro/location'} active={tabState===2}>오시는 길</MobileTab>
			</MobileTabContainer>
			<div className="mainContent">
				<div className="tabContentDivision">
				<LeftTabContainer>
					<LeftTabTitle>경복궁별빛야행</LeftTabTitle>
					<LeftTab to={"/intro/main"} active={tabState === 0}>
					행사 소개
					</LeftTab>
					<LeftTab to={"/intro/preservation"} active={tabState === 1}>
					예매 안내
					</LeftTab>
					<LeftTab to={"/intro/location"} active={tabState === 2}>
					오시는 길
					</LeftTab>
				</LeftTabContainer>
				<div className="PageIntroWrap">{jsx}</div>
				</div>
			</div>
		</div>
		<GoTop/>
	</>
	);
}
