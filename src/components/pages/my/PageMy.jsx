import { useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react";
import { SsangTab, SsangTabContainer } from "../../generic/SsangTab";
import SubMyFavorites from "./SubMyFavorites";
import SubMyQNA from "./SubMyQNA";
import SubMyInfo from "./SubMyInfo";
import TopBanner from "../../generic/TopBanner";
import { MobileTab, MobileTabContainer } from "../../generic/MobileTab";
import './pagemy.css';
import { configContext } from '/src/App';
import GenericButton from '/src/components/generic/GenericButton';

function UserInfo({kakaoUser,handleConfig}) {
	const config = useContext(configContext);
	let imgPath = ''
	// if (kakaoUser===null||kakaoUser.profile.length<=0) {
	if (kakaoUser===null) {
		imgPath = '/bandifesta/assets/user2.png'
	} else {
		imgPath = kakaoUser.profile;
	}
	//
	const logoutCallback = ()=>{
		handleConfig.logout();
	}
	return <div className="pageMyUserInfo">
		{/* 프사공간 */}
		{
			imgPath
			?<img src={String(imgPath).replace('http://','https://')} alt={'프로필 이미지'} className="portrait"/>
			:<></>
		}
		<div className="nameAndLogout">
			<div className="fontSubTitle name">
				{kakaoUser?('#'+kakaoUser.name):''}
			</div>
			<GenericButton onClick={logoutCallback}>로그아웃</GenericButton>
		</div>
	</div>
}

export default function PageMy({handleConfig}) {
	const { tabName } = useParams();
	const [tabState,setTabState] = useState(0);
	const config = useContext(configContext);
	const handleTabState = {
		set:(index)=>{
			setTabState(index);
		}
	}
	let jsx = <></>
	switch (tabName) {
		case 'info':
			jsx = <SubMyInfo handleTabState={handleTabState} index={0} kakaoUser={config.user} handleConfig={handleConfig}/>
			break;
		case 'favorites':
			jsx = <SubMyFavorites handleTabState={handleTabState} index={1} kakaoUser={config.user}/>
			break;
		case 'qna':
			jsx = <SubMyQNA handleTabState={handleTabState} index={2} kakaoUser={config.user}/>
			break;
		default:
	}
	return <>
		<TopBanner>마이페이지</TopBanner>
		{
			config.user
			?<div className="innerbox pageMy">
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
							<UserInfo kakaoUser={config.user} handleConfig={handleConfig}/>
							<div className="rightContent">
								{jsx}
							</div>
						</div>
					</div>
				</div>
			</div>
			:<></>
		}
	</>
}