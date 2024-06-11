import { useEffect, useState } from "react";
import { FestivalCardList } from "../../generic/festival/FestivalCard";
import { getLikedFestivals } from "/src/api_utils/festivalUtil";

export default function SubMyFavorites({handleTabState,index,kakaoUser}) {
	const [festivals,setFestivals] = useState([]);
	//탭스테이트
	useEffect(()=>{
		handleTabState.set(index);
	},[])
	//리스트불러오기
	useEffect(()=>{
		//유저정보 없으면 컷
		if (kakaoUser===null) {
			return;
		}
		getLikedFestivals({
			userId:kakaoUser.id,
			itemsPerPage:12,
			pageNum:1
		},(response)=>{
			setFestivals(response.data);
		})
	},[kakaoUser])
	return <>
		<FestivalCardList festivals={festivals} className={'my'}/>
	</>
}