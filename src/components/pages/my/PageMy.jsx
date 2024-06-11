import { useParams } from "react-router-dom"
import { useState } from "react";
import { SsangTab, SsangTabContainer } from "../../generic/SsangTab";
import SubMyFavorites from "./SubMyFavorites";
import SubMyQNA from "./SubMyQNA";
import SubMyInfo from "./SubMyInfo";
import TopBanner from "../../generic/TopBanner";
import { MobileTab, MobileTabContainer } from "../../generic/MobileTab";
import './pagemy.css';

export default function PageMy({}) {
	const { tabName } = useParams();
	const [tabState,setTabState] = useState(0);
	const handleTabState = {
		set:(index)=>{
			setTabState(index);
		}
	}
	let jsx = <></>
	switch (tabName) {
		case 'info':
			jsx = <SubMyInfo handleTabState={handleTabState} index={0}/>
			break;
		case 'favorites':
			jsx = <SubMyFavorites handleTabState={handleTabState} index={1}/>
			break;
		case 'qna':
			jsx = <SubMyQNA handleTabState={handleTabState} index={2}/>
			break;
		default:
	}
	return <>
		<TopBanner>마이페이지</TopBanner>
		<div className="innerbox pageMy">
			<MobileTabContainer>
				<MobileTab to={'/my/info'} active={tabState===0}>회원 정보</MobileTab>
				<MobileTab to={'/my/favorites'} active={tabState===1}>찜한 목록</MobileTab>
				<MobileTab to={'/my/qna'} active={tabState===2}>1:1 문의</MobileTab>
			</MobileTabContainer>
			<div className="mainContent">
				<div className="tabContentDivisionAlter">
					<SsangTabContainer>
						<SsangTab to={'/my/info'} active={tabState===0}>회원 정보</SsangTab>
						<SsangTab to={'/my/favorites'} active={tabState===1}>찜한 목록</SsangTab>
						<SsangTab to={'/my/qna'} active={tabState===2}>1:1 문의</SsangTab>
					</SsangTabContainer>
					<div className="leftRightDivision">
						<div className="userInfo">
							{/* 프사공간 */}
						</div>
						<div className="rightContent">
							{jsx}
						</div>
					</div>
				</div>
			</div>
		</div>
	</>
}