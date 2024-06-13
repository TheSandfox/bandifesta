import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { getFestivalDetail } from "/src/api_utils/festivalUtil";
import TopBanner from "../../generic/TopBanner";
import './pagefestivaldetail.css';
import GenericTag from "../../generic/GenericTag";
import { getFestivalLikeCount } from "../../../api_utils/festivalUtil";
import { configContext } from '/src/App';
import { FestivalLikeButton } from "../../generic/festival/FestivalCard";
import GoogleMapComponent from "../../generic/googlemap/GoogleMapComponent";
import GenericButton from '/src/components/generic/GenericButton'

function LikeIndicator({festival}) {
	const config = useContext(configContext)
	const [count,setCount] = useState(0);
	useEffect(()=>{
		if (!festival) {return;}
		getFestivalLikeCount({
			festivalId:festival.festival_id
		},(response)=>{
			// console.log(response.data);
			setCount(response.data);
		})
	},[festival])
	//
	const onChangeCallback = (flag)=>{
		if (flag) {
			setCount(count+1);
		} else {
			setCount(count-1);
		}
	}
	return <div className="likeIndicator fontMain">
		{
			festival
			?<FestivalLikeButton festivalId={festival.festival_id} userId={config.user?config.user.id:null} onChange={onChangeCallback}/>
			:<></>
		}
		<div className="fontSubTitle">
			{count}
		</div>
	</div>
}

function FestivalContent({festival}) {
	const navigate = useNavigate();
	const [tagVariation,setTagVariation] = useState({
		value:0,
		string:''
	});
	useEffect(()=>{
		if (festival===null) {return;}
		let startDate = new Date(festival.start_date);
		let today = new Date();
		let endDate = new Date(festival.end_date);
		// console.log(festival);
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
			<div className="tagAndLike">
				<GenericTag variation={tagVariation.value}>
					{tagVariation.string}
				</GenericTag>
				<LikeIndicator festival={festival}/>
			</div>
			<div className="fontTitle">
				{festival?festival.title:''}
			</div>
		</div>
		{/* 포스터&설명 */}
		<div className="middle">
			<div className="imgContainer">
				{
					festival.image1
					?<>
						<img className='blur' src={String(festival.image1).replace('http://','https://')}/>
						<img className='upper' src={String(festival.image1).replace('http://','https://')}/>
					</>
					:<>
					</>
				}
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
						{festival.sponsor1}
						{
							festival.sponsor2
							?<><br/>{festival.sponsor2}</>
							:<></>
						}
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
		{/* 꾸글지도 */}
		<div className="bottom">
			<div className="fontSubTitle">오시는 길</div>
			{festival
				?<GoogleMapComponent 
					mapX={festival.map_x} 
					mapY={festival.map_y}
					center={{
						lat: festival.map_x,
						lng: festival.map_y
					}}
				/>
				:<></>
			}
			<GenericButton to={'/festival/gallery'}>목록으로</GenericButton>
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