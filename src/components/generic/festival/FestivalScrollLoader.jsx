import { useContext, useEffect, useState } from "react"
import { getFestivals } from "/src/api_utils/festivalUtil"
import { configContext } from "/src/App";

export default function FestivalScrollLoader({onChange,festivalPeriodType,festivalSortMethod,containerRef,dateValue}) {
	const [festivals,setFestivals] = useState([]);
	const [loading,setLoading] = useState(false);
	const [pageNum,setPageNum] = useState(1);
	const config = useContext(configContext);
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
			dateValue:dateValue||(new Date().getTime())
		},(response)=>{
			// console.log(response);
			setFestivals(response.data)
		});
	},[festivalPeriodType,festivalSortMethod,dateValue]);
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
				if (response.data.length>0) {
					setFestivals([...festivals,...response.data]);
				} 
				setLoading(false);
			});
		}
	},[pageNum])
	//빈 배열 들어오면 페이지초기화
	useEffect(()=>{
		if (festivals.length<=0) {
			setPageNum(1);
		}
		if (onChange) {
			onChange(festivals);
		}
	},[festivals]);
	return <></>;
}