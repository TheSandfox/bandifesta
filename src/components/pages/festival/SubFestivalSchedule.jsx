import { useContext, useEffect, useMemo, useRef, useState } from "react"
import FestivalDatePicker from "../../generic/festival/FestivalDatePicker";
import './subfestivalschedule.css';
import { FestivalWidgetList } from "../../generic/festival/FestivalWidget";
import FestivalScrollLoader from "../../generic/festival/FestivalScrollLoader";
import { FestivalCardList } from "../../generic/festival/FestivalCard";
import { configContext } from "../../../App";

function d2S(val,language) {
	let strings = ['일','월','화','수','목','금','토'];
	switch (language) {
	case 'Eng' :
		strings = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
		break;
	case 'Jpn' :
		strings = ['日','月','火','水','木','金','土'];
		break;
	}
	return strings[parseInt(val)];
}

export default function SubFestivalSchedule({handleTabState,index,handleConfig}) {
	const config = useContext(configContext);
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
			day.getDate()+' ('+d2S(day.getDay(),config.language)+')'
	},[targetDate,config.language])
	//축제들
	const [festivals,setFestivals] = useState([]);
	//페이지 토탈
	const total = useMemo(()=>{
		return Math.floor(festivals.length/itemsPerPage) - 1;
	},[festivals]);
	//상위 컴포넌트 
	useEffect(()=>{
		handleTabState.set(index);
	},[])
	const dateChangeCallback = (val)=>{
		setTargetDate(val);
	}
	//
	let localeString = ['오늘의 축제'];
	switch (config.language) {
	case 'Eng':
		localeString = ['Today'];
		break;
	case 'Jpn':
		localeString = ['今日の祭り'];
		break;
	}
	return <div ref={containerRef} className="subFestivalSchedule">
		<div className="top">
			{/* 달력 */}
			<FestivalDatePicker value={new Date()} onChange={dateChangeCallback}/>
			{/* 리스트 */}
			<div className="festivalWidgetContainer shadowBox">
				<div className="top">
					<div className="left">
						<p className="fontMain">{localeString[0]}</p>
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
			festivalSortMethod={1}
			containerRef={containerRef}
			dateValue={parseInt(targetDate)}
		/>
	</div>
}