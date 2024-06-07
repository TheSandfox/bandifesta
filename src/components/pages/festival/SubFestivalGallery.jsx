import { useContext, useEffect, useRef, useState } from "react"
import { FestivalCardList } from "../../generic/festival/FestivalCard";
import FestivalSelect from "../../generic/festival/FestivalSelect";
import { getFestivals } from "/src/api_utils/festivalUtil"
import { configContext } from "/src/App";
import { getFestivalPeriodTypes, getFestivalSortMethods } from "../../../api_utils/festivalUtil";
import './subfestivalgallery.css';

export default function SubFestivalGallery({handleTabState,index}) {
	const [festivalPeriodType,setFestivalPeriodType] = useState(null);
	const [festivalSortMethod,setFestivalSortMethod] = useState(null);
	const [festivalPeriodTypes,setFestivalPeriodTypes] = useState([]);
	const [festivalSortMethods,setFestivalSortMethods] = useState([]);
	const [festivals,setFestivals] = useState([]);
	const [pageNum,setPageNum] = useState(1);
	const [loading,setLoading] = useState(false);
	const config = useContext(configContext);
	const containerRef = useRef(null);
	const handleFestivalPeriodType = {
		set:(index)=>{
			console.log(index);
			setFestivalPeriodType(parseInt(index));
		}
	}
	const handleFestivalSortMethod = {
		set:(index)=>{
			console.log(index);
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
		getFestivalPeriodTypes((response)=>{
			setFestivalPeriodTypes(response.data);
		})
	},[]);
	useEffect(()=>{
		//정렬방식들 불러오고 아래로
		getFestivalSortMethods((response)=>{
			setFestivalSortMethods(response.data);
		})
	},[festivalPeriodTypes]);
	useEffect(()=>{
		//배열이 준비되면
		setFestivalPeriodType(0);
		setFestivalSortMethod(0);
	},[festivalSortMethods])
	//정렬방식 변경(리스트초기화)
	useEffect(()=>{
		if (festivalPeriodType===null
			|| festivalSortMethod===null 
			) {
			return;
		}
		setFestivals([]);
		getFestivals({
			itemsPerPage:12,
			pageNum:pageNum,
			language:config.language,
			periodType:festivalPeriodType,
			sortMethod:festivalSortMethod,
		},(response)=>{
			// console.log(response);
			setFestivals(response.data)
		});
	},[festivalPeriodType,festivalSortMethod]);
	//스크롤다운 콜백
	useEffect(()=>{
		const downCallback = ()=>{
			if (loading) {
				// console.log('캇');
				return;
			}
			const containerBottom = containerRef.current.getBoundingClientRect().bottom + window.scrollY;
			const viewportBottom = window.scrollY + window.innerHeight;
			if (viewportBottom > containerBottom) {
				// console.log('내려왔당');
				setLoading(true);
			} else {
				// console.log('덜내려왔당');
			}
		}
		window.addEventListener('scroll',downCallback);

		return ()=>{
			window.removeEventListener('scroll',downCallback);
		}
	},[loading])
	//스크롤다운으로 로딩을 true로 바꿈
	useEffect(()=>{
		if (loading) {
			setPageNum(pageNum+1);
		}
	},[loading])
	//로딩이 true로 바뀌어서 게시물 추가 로딩
	useEffect(()=>{
		// console.log(pageNum);
		if (pageNum>1) {
			getFestivals({
				itemsPerPage:12,
				pageNum:pageNum,
				language:config.language,
				periodType:festivalPeriodType,
				sortMethod:festivalSortMethod,
			},(response)=>{
				// console.log(response);
				setFestivals([...festivals,...response.data]);
				setLoading(false);
			});
		}
	},[pageNum])
	//빈 배열 들어오면 페이지초기화
	useEffect(()=>{
		if (festivals.length<=0) {
			setPageNum(1);
		} 
	},[festivals])
	//
	return <div ref={containerRef} className="subFestivalGallery">
		<div className="subFestivalGallerySelectContainer">
			<FestivalSelect handleValue={handleFestivalPeriodType} value={[
				...festivalPeriodTypes
			]}/>
			<FestivalSelect handleValue={handleFestivalSortMethod} value={[
				...festivalSortMethods
			]}/>
		</div>
		<FestivalCardList festivals={festivals}></FestivalCardList>
	</div>
}