import {useEffect, useContext} from "react";
import {configContext} from '/src/App';
import './SubMyInfo.css';

export default function SubMyInfo({handleTabState,index}) {

	const config = useContext(configContext);

	useEffect(()=>{
		handleTabState.set(index);
	},[])
	
	return<>
	    <div className="myInfoRightCont">
			<h2 className="fontTitle">기본 정보</h2>
			<div className="myInfoWrap">
			    <div className="myInfoList">
				    <h4 className="fontSubTitle">아이디</h4>
					<p className="fontMain">#{config.user.id}</p>
			    </div>
			    <div className="myInfoList">
				    <h4 className="fontSubTitle">이름</h4>
					<p className="fontMain">{config.user.nickname}</p>
			    </div>
			    <div className="myInfoList">
				    <h4 className="fontSubTitle">성별</h4>
				    <p className="fontMain">.</p>
			    </div>
			    <div className="myInfoList">
				    <h4 className="fontSubTitle">생년월일</h4>
				    <p className="fontMain">.</p>
			    </div>
			    <div className="myInfoList">
				    <h4 className="fontSubTitle">전화번호</h4>
				    <p className="fontMain">.</p>
			    </div>
			    <div className="myInfoList">
				    <h4 className="fontSubTitle">주소</h4>
				    <p className="fontMain">.</p>
			    </div>
			</div>
		</div>
		<button className="fontMain withDrawalBtn">회원탈퇴</button>
	</>
}