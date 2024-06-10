import { useParams } from "react-router-dom"
import { useState } from "react";
import { SsangTab, SsangTabContainer } from "../../generic/SsangTab";
import SubMyFavorites from "./SubMyFavorites";
import SubMyQNA from "./SubMyQNA";
import SubMyInfo from "./SubMyInfo";

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
	return <div className="innerbox">
		<div className="mainContent">
			<div className="tabContentDivisionAlter">
				<SsangTabContainer>
					<SsangTab to={'/my/info'} active={tabState===0}>회원 정보</SsangTab>
					<SsangTab to={'/my/favorites'} active={tabState===1}>찜한 목록</SsangTab>
					<SsangTab to={'/my/qna'} active={tabState===2}>1:1 문의</SsangTab>
				</SsangTabContainer>
				<div>
					{jsx}
				</div>
			</div>
		</div>
	</div>
}