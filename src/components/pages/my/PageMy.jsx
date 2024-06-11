import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { SsangTab, SsangTabContainer } from "../../generic/SsangTab";
import SubMyFavorites from "./SubMyFavorites";
import SubMyQNA from "./SubMyQNA";
import SubMyInfo from "./SubMyInfo";
import TopBanner from "../../generic/TopBanner";
import { MobileTab, MobileTabContainer } from "../../generic/MobileTab";
import './pagemy.css';
import { getKakaoUser } from '/src/api_utils/loginUtil'
import GenericButton from '/src/components/generic/GenericButton';

function UserInfo({kakaoUser}) {
	let imgPath = ''
	if (kakaoUser===null||kakaoUser.profile.length<=0) {
		imgPath = '/bandifesta/assets/user2.png'
	} else {
		imgPath = kakaoUser.profile;
	}
	return <div className="pageMyUserInfo">
		{/* 프사공간 */}
		<img src={imgPath} alt={'프로필 이미지'} className="portrait"/>
		<div className="nameAndLogout">
			<div className="fontSubTitle name">
				{kakaoUser?('#'+kakaoUser.name):''}
			</div>
			<GenericButton>로그아웃</GenericButton>
		</div>
	</div>
}

export default function PageMy({}) {
	const { tabName } = useParams();
	const [tabState,setTabState] = useState(0);
	const [kakaoUser,setKakaoUser] = useState(null);
	const handleTabState = {
		set:(index)=>{
			setTabState(index);
		}
	}
	//마이페이지 입장 시 유저정보 가져오기
	useEffect(()=>{
		getKakaoUser({

		},(response)=>{
			setKakaoUser(response.data);
		},(error)=>{
			setKakaoUser(null);
		})
	},[tabState])
	let jsx = <></>
	switch (tabName) {
		case 'info':
			jsx = <SubMyInfo handleTabState={handleTabState} index={0} kakaoUser={kakaoUser}/>
			break;
		case 'favorites':
			jsx = <SubMyFavorites handleTabState={handleTabState} index={1} kakaoUser={kakaoUser}/>
			break;
		case 'qna':
			jsx = <SubMyQNA handleTabState={handleTabState} index={2} kakaoUser={kakaoUser}/>
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
						<UserInfo kakaoUser={kakaoUser}/>
						<div className="rightContent">
							{jsx}
						</div>
					</div>
				</div>
			</div>
		</div>
	</>
}