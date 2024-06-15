import "./PageNotice.css";
import { LeftTab, LeftTabContainer, LeftTabTitle } from "../../generic/LeftTab";
import { useState } from "react";
import { useParams } from "react-router";
import { MobileTab, MobileTabContainer } from '../../generic/MobileTab';
import TopBanner from "../../generic/TopBanner";
import SubNoticeMain from "./SubNoticeMain";
import SubNoticeFAQ from "./SubNoticeFAQ";

export default function PageNotice({}) {
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
		jsx = <SubNoticeMain handleTabState={handleTabState} index={0} />;
		break;
		case "faq":
		jsx = <SubNoticeFAQ handleTabState={handleTabState} index={1} />;
		break;
		default:
	}
	return (<>
		<TopBanner>알려드립니다</TopBanner>
		<div className="innerbox">
			<MobileTabContainer>
				<MobileTab to={'/notice/main'} active={tabState===0}>공지사항</MobileTab>
				<MobileTab to={'/notice/faq'} active={tabState===1}>자주하는 질문</MobileTab>
			</MobileTabContainer>
			<div className="mainContent">
				<div className="tabContentDivision">
				<LeftTabContainer>
					<LeftTabTitle>알려드립니다</LeftTabTitle>
					<LeftTab to={"/notice/main"} active={tabState === 0}>
						공지사항
					</LeftTab>
					<LeftTab to={"/notice/faq"} active={tabState === 1}>
						자주하는 질문
					</LeftTab>
				</LeftTabContainer>
				<div className="PageNoticeWrap">
					{jsx}
				</div>
				</div>
			</div>
		</div>
	</>
	);
}
