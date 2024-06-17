import { useEffect, useState } from "react";
import Course from "./course_tap/Course";
import { LeftTab, LeftTabContainer, LeftTabTitle } from "../../generic/LeftTab";
import TopBanner from "../../generic/TopBanner";
import { MobileTab, MobileTabContainer } from "../../generic/MobileTab";
import { useParams } from "react-router-dom";
import "./PageCourse.css"
export default function PageCourse({}) {
	const params = useParams();
	const [currentSet, setCurrentSet] = useState(params.tabName||"min40");

	const handleTabState = (set) => {
		setCurrentSet(set);
	};

	useEffect(()=>{
		handleTabState(params.tabName);
	},[params.tabName])

	//탭바뀌면 탑으로
	useEffect(()=>{
		window.scrollTo(0, 0);
	},[currentSet]);
	return (
		<>
			<TopBanner>경복궁나들이</TopBanner>
			<div className="innerbox">
				<MobileTabContainer>
					<MobileTab onClick={() => handleTabState("min40")} active={currentSet === 'min40'}>40분 코스</MobileTab>
					<MobileTab onClick={() => handleTabState("min60")} active={currentSet === 'min60'}>60분 코스</MobileTab>
					<MobileTab onClick={() => handleTabState("min90")} active={currentSet === 'min90'}>90분 코스</MobileTab>
				</MobileTabContainer>
				<div className="mainContent">
				<div className="tabContentDivision">
					<LeftTabContainer>
					<LeftTabTitle>경복궁나들이</LeftTabTitle>
					<LeftTab active={currentSet === 'min40'} onClick={() => handleTabState("min40")}>
						아이와 함께(40분 코스)
					</LeftTab>
					<LeftTab active={currentSet === 'min60'} onClick={() => handleTabState("min60")}>
						가족과 함께(60분 코스)
					</LeftTab>
					<LeftTab active={currentSet === 'min90'} onClick={() => handleTabState("min90")}>
						연인과 함께(90분 코스)
					</LeftTab>
					</LeftTabContainer>
					<Course currentSet={currentSet} />
				</div>
				</div>
			</div>
		</>
	);
}
