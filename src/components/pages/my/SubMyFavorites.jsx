import { useContext, useEffect, useRef, useState } from "react";
import { FestivalCardList } from "../../generic/festival/FestivalCard";
import { configContext } from "../../../App";
import FestivalScrollLoader from "../../generic/festival/FestivalScrollLoader";
import GoTop from "../../generic/GoTop";

export default function SubMyFavorites({handleTabState,index}) {
	const [festivals,setFestivals] = useState([]);
	const containerRef = useRef(null);
	const config = useContext(configContext);
	// console.log(config);
	//탭스테이트
	useEffect(()=>{
		handleTabState.set(index);
	},[])
	//리스트불러오기
	// useEffect(()=>{
	// 	//유저정보 없으면 컷
	// 	if (kakaoUser===null) {
	// 		return;
	// 	}
	// 	getLikedFestivals({
	// 		userId:kakaoUser.id,
	// 		itemsPerPage:12,
	// 		pageNum:1
	// 	},(response)=>{
	// 		setFestivals(response.data);
	// 	})
	// },[kakaoUser])
	return <div ref={containerRef} className="subMyFavorites">
		<FestivalCardList festivals={festivals} className={'my'}/>
		{config.user
			?<FestivalScrollLoader
				onChange={setFestivals}
				getFavorites={true}
				containerRef={containerRef}
				userId={config.user.id}
			/>
			:<></>
		}
		<GoTop/>
	</div>
}