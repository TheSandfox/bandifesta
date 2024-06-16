import { useContext, useEffect, useRef, useState } from "react"
import { FestivalCardList } from "../../generic/festival/FestivalCard";
import FestivalSelect from "../../generic/festival/FestivalSelect";
import { getFestivalPeriodTypes, getFestivalSortMethods } from "../../../api_utils/festivalUtil";
import './subfestivalgallery.css';
import FestivalScrollLoader from "../../generic/festival/FestivalScrollLoader";
import { configContext } from "../../../App";

export default function SubFestivalGallery({handleTabState,index,handleConfig}) {
	const config = useContext(configContext);
	const [festivalPeriodType,setFestivalPeriodType] = useState(null);
	const [festivalSortMethod,setFestivalSortMethod] = useState(null);
	const [festivalPeriodTypes,setFestivalPeriodTypes] = useState([]);
	const [festivalSortMethods,setFestivalSortMethods] = useState([]);
	const [festivals,setFestivals] = useState([]);
	const containerRef = useRef(null);
	const handleFestivalPeriodType = {
		set:(index)=>{
			// console.log(index);
			setFestivalPeriodType(parseInt(index));
		}
	}
	const handleFestivalSortMethod = {
		set:(index)=>{
			// console.log(index);
			setFestivalSortMethod(parseInt(index));
		}
	}
	//상위컴포넌트의 탭활성상태 변경
	useEffect(()=>{
		handleTabState.set(index);
	},[])
	//축제유형&정렬방식 가져오기
	useEffect(()=>{
		//축제유형들 불러오고 아래로
		getFestivalPeriodTypes({language:config.language},(response)=>{
			setFestivalPeriodTypes(response.data);
		})
	},[config.language]);
	useEffect(()=>{
		//정렬방식들 불러오고 아래로
		getFestivalSortMethods({language:config.language},(response)=>{
			setFestivalSortMethods(response.data);
		})
	},[festivalPeriodTypes]);
	useEffect(()=>{
		//배열이 준비되면
		if (festivalPeriodType===null) {
			setFestivalPeriodType(0);
		}
		if (festivalSortMethod===null) {
			setFestivalSortMethod(0);
		}
	},[festivalSortMethods])
	//
	return <div ref={containerRef} className="subFestivalGallery">
		<div className="subFestivalGallerySelectContainer">
			<FestivalSelect handleValue={handleFestivalPeriodType} values={[
				...festivalPeriodTypes
			]}/>
			<FestivalSelect handleValue={handleFestivalSortMethod} values={[
				...festivalSortMethods
			]}/>
		</div>
		<FestivalCardList festivals={festivals}/>
		<FestivalScrollLoader
			onChange={setFestivals}
			festivalPeriodType={festivalPeriodType}
			festivalSortMethod={festivalSortMethod}
			containerRef={containerRef}
		/>
	</div>
}