import { useContext, useEffect, useState } from "react"
import { getFestivals } from "/src/api_utils/festivalUtil"
import { configContext } from "/src/App";

export default function FestivalScrollLoader({onChange,festivalPeriodType,festivalSortMethod,containerRef,dateValue,userId,getFavorites}) {
	const [festivals,setFestivals] = useState([]);
	const [loading,setLoading] = useState(true);
	const [pageNum,setPageNum] = useState(1);
	const config = useContext(configContext);
	const [end,setEnd] = useState(false);
	//정렬방식 변경(리스트초기화)
	useEffect(()=>{
		if (festivalPeriodType===null
			|| festivalSortMethod===null 
			) {
			return;
		}
		getFestivals({
			itemsPerPage:12,
			pageNum:1,
			language:config.language,
			periodType:festivalPeriodType||0,
			sortMethod:festivalSortMethod||0,
			dateValue:dateValue?(parseInt(dateValue)):(new Date().getTime()),
			userId:userId||0,
			getFavorites:getFavorites||false
		},(response)=>{
			// console.log(response);
			setLoading(false);
			setFestivals(response.data)
		},(error)=>{
			// setFestivals([]);
		});

		//클린업
		return ()=>{
			// setLoading(true);
			setPageNum(1);
			setEnd(false);
			if (festivals.length>0) {
				setFestivals(festivals.map((item)=>{
					return null;
				}));
			} else {
				setFestivals([]);
			}
		}	

	},[festivalPeriodType,festivalSortMethod,dateValue,getFavorites,userId,config.language]);
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
		if (end) {return;}
		if (pageNum>1) {
			// console.log(pageNum);
			getFestivals({
				itemsPerPage:12,
				pageNum:pageNum,
				language:config.language,
				periodType:festivalPeriodType||0,
				sortMethod:festivalSortMethod||0,
				dateValue:dateValue?(parseInt(dateValue)):(new Date().getTime()),
				userId:userId||0,
				getFavorites:getFavorites||false
			},(response)=>{
				// console.log(response);
				if (response.data.length>0) {
					setFestivals([...festivals,...response.data]);
				} else {
					setEnd(true);
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