import { useEffect, useState } from "react"
import { FestivalCardList } from "../../generic/festival/FestivalCard";
import FestivalSelect from "../../generic/festival/FestivalSelect";

export default function SubFestivalGallery({handleTabState,index}) {
	const [festivalPeriodType,setFestivalPeriodType] = useState(0);
	const [festivalSortMethod,setFestivalSortMethod] = useState(0);
	const handleFestivalPeriodType = {
		set:(index)=>{
			
		}
	}
	const handleFestivalSortMethod = {
		set:(index)=>{

		}
	}
	//상위컴포넌트의 탭활성상태 변경
	useEffect(()=>{
		handleTabState.set(index);
	},[])
	return <>
		<FestivalSelect handleValue={handleFestivalPeriodType} value={[
			"전체",
			"진행중",
			"예정",
			"마감"
		]}/>
		<FestivalSelect handleValue={handleFestivalSortMethod} value={[
			"날짜순",
			"좋아요순"
		]}/>
		<FestivalCardList></FestivalCardList>
	</>
}