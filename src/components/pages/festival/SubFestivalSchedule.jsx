import { useEffect, useMemo, useRef, useState } from "react"
import FestivalDatePicker from "../../generic/festival/FestivalDatePicker";
import './subfestivalschedule.css';
import { FestivalWidgetList } from "../../generic/festival/FestivalWidget";
import FestivalScrollLoader from "../../generic/festival/FestivalScrollLoader";
import { FestivalCardList } from "../../generic/festival/FestivalCard";

function d2S(val) {
	switch (parseInt(val)) {
	case 0:
		return '일';
	case 1:
		return '월';
	case 2:
		return '화';
	case 3:
		return '수';
	case 4:
		return '목';
	case 5:
		return '금';
	case 6:
		return '토';
	}
	return '';
}

export default function SubFestivalSchedule({handleTabState,index}) {
	const itemsPerPage = 6;
	const [listPage,setListPage] = useState(0);
	const now = new Date();
	const containerRef = useRef(null);
	const [kakaoUser,setKakaoUser] = useState(null);
	const [targetDate,setTargetDate] = useState(new Date(now.getFullYear()+
	'-'+
	now.getMonth()+
	'-'+
	now.getDay()
	).getTime());
	//표시할 날짜 문자열
	const targetDateString = useMemo(()=>{
		let day = new Date(parseInt(targetDate));
		return day.getFullYear()+'.'+
			(day.getMonth()+1)+'.'+
			day.getDate()+' ('+d2S(day.getDay())+')'
	},[targetDate])
	//축제들
	const [festivals,setFestivals] = useState([]);
	//페이지 토탈
	const total = useMemo(()=>{
		return Math.floor(festivals.length/itemsPerPage) - 1;
	},[festivals]);
	//페이지핸들링
	const handlePageNum = {
		get:()=>{
			return pageNum;
		},
		set:(val)=>{
			setPageNum(val);
		}
	}
	const handleListPage = {
		next:()=>{
			if (listPage<total) {
				setListPage(listPage+1);
			}
		},
		prev:()=>{
			if (listPage>0) {
				setListPage(listPage-1);
			}
		}
	}
	//상위 컴포넌트 
	useEffect(()=>{
		handleTabState.set(index);
	},[])
	const dateChangeCallback = (val)=>{
		setTargetDate(val);
	}

	return <div ref={containerRef} className="subFestivalSchedule">
		<div className="top">
			{/* 달력 */}
			<FestivalDatePicker value={new Date()} onChange={dateChangeCallback}/>
			{/* 리스트 */}
			<div className="festivalWidgetContainer shadowBox">
				<div className="top">
					<div className="left">
						<p className="fontMain">오늘의 축제</p>
						<p className="fontSubTitle">{targetDateString}</p>
					</div>
					{/*페이징*/}
					{/* <div className="right">
						<div className="btn previous" onClick={()=>{handleListPage.prev()}}>
						</div>
						<div className="btn next" onClick={()=>{handleListPage.next()}}>
						</div>
					</div> */}
				</div>
				<FestivalWidgetList festivals={festivals.slice(listPage*itemsPerPage,(listPage+1)*itemsPerPage)}/>
			</div>
		</div>
		<div className="bottom">
			<FestivalCardList festivals={festivals}/>
		</div>
		<FestivalScrollLoader
			onChange={setFestivals}
			festivalPeriodType={1}
			festivalSortMethod={0}
			containerRef={containerRef}
			dateValue={parseInt(targetDate)}
		/>
	</div>
}