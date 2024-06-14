import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getFestivalDetail } from "/src/api_utils/festivalUtil";
import TopBanner from "../../generic/TopBanner";
import './pagefestivaldetail.css';
import GenericTag from "../../generic/GenericTag";
import { getFestivalLikeCount } from "../../../api_utils/festivalUtil";

function LikeIndicator({festival}) {
	const [count,setCount] = useState(0);
	useEffect(()=>{
		if (!festival) {return;}
		getFestivalLikeCount({
			festivalId:festival.festival_id
		},(response)=>{
			console.log(response.data);
			setCount(response.data);
		})
	},[festival])
	return <div className="likeIndicator fontMain">
		{count}
	</div>
}

function FestivalContent({festival}) {
	const [tagVariation,setTagVariation] = useState({
		value:0,
		string:''
	});
	useEffect(()=>{
		if (festival===null) {return;}
		let startDate = new Date(festival.start_date);
		let today = new Date();
		let endDate = new Date(festival.end_date);
		console.log(festival);
		if(startDate>today) {
			setTagVariation({
				value:1,
				string:'예정'
			})
		} else if(endDate<today) {
			setTagVariation({
				value:2,
				string:'마감'
			})
		} else {
			setTagVariation({
				value:0,
				string:'진행중'
			})
		}
	},[festival]);
	return <div className="festivalDetail">
		{/* 상단 제목 */}
		<div className="top">
			<GenericTag variation={tagVariation.value}>
				{tagVariation.string}
			</GenericTag>
			<div className="fontTitle">
				{festival?festival.title:''}
			</div>
			<LikeIndicator festival={festival}/>
		</div>
		{/* 포스터&설명 */}
		<div className="middle">
			<div className="imgContainer">
				<img className='blur' src={festival.image1}/>
				<img className='upper' src={festival.image1}/>
			</div>
			<div className="description">
				{/* 진행기간 */}
				<div className="descriptionRow">
					<div className="left fontMain">
						진행기간
					</div>
					<div className="right fontMain">
						{festival.start_date}~{festival.end_date}
					</div>
				</div>
				{/* 장소 */}
				<div className="descriptionRow">
					<div className="left fontMain">
						장소
					</div>
					<div className="right fontMain">
						{festival.eventplace}
					</div>
				</div>
				{/* 주최 */}
				<div className="descriptionRow">
					<div className="left fontMain">
						주최
					</div>
					<div className="right fontMain">
						{festival.sponsor2}
					</div>
				</div>
				{/* 홈페이지 */}
				<div className="descriptionRow">
					<div className="left fontMain">
						홈페이지
					</div>
					<div className="right fontMain" dangerouslySetInnerHTML={{__html: festival.homepage.replace('홈페이지 ','')}}>

					</div>
				</div>
				{/* 문의전화 */}
				<div className="descriptionRow">
					<div className="left fontMain">
						문의전화
					</div>
					<div className="right fontMain">
						{festival.tel}
					</div>
				</div>
				{/* 전시내용 */}
				<div className="descriptionRow">
					<div className="left fontMain">
						전시내용
					</div>
					<div className="right fontMain">
						{festival.infotext}
					</div>
				</div>
			</div>
		</div>
	</div>
}

export default function PageFestivalDetail({}) {
	const { festivalId } = useParams(); //festivalId
	const [ festival,setFestival ] = useState(null);
	useEffect(()=>{
		if (!festivalId) {return;}
		getFestivalDetail({
			festivalId:festivalId
		},(response)=>{
			setFestival(response.data);
		},(error)=>{
			setFestival(null);
		})
	},[festivalId])
	return <>
		<TopBanner>축제둘러보기</TopBanner>
		<div className="innerbox">
			<div className="mainContent">
				{
					festival
					?<FestivalContent festival={festival}/>
					:<></>
				}
				
			</div>
		</div>
	</>
}