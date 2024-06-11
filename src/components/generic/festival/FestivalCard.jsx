import { Link } from 'react-router-dom';
import './festival.css';
import { useEffect, useRef, useState } from 'react';
import GenericTag from '../GenericTag';
import { getKakaoUser } from '/src/api_utils/loginUtil';
import { isFestivalLiked } from '/src/api_utils/festivalUtil';
import { likeFestival } from '/src/api_utils/festivalUtil';

function FestivalLikeButton({festivalId}) {
	const [pressed,setPressed] = useState(false);
	//최초 마운트시 좋아요여부 확인
	useEffect(()=>{
		getKakaoUser({

		},(response)=>{
			//유저정보받기 성공
			isFestivalLiked({
				userId:response.data['id'],
				festivalId:festivalId
			},(response2)=>{
				// console.log(Boolean(response2.data))
				setPressed(Boolean(response2.data));
			},(error2)=>{

			})
		},(error)=>{
			console.log(error);
		})
	},[])
	//좋아요버튼 콜백
	const likeRequest = ()=>{
		getKakaoUser({
			
		},(response)=>{
			//유저정보받기 성공
			// console.log(festivalId);
			likeFestival({
				userId:response.data['id'],
				festivalId:festivalId,
				flag:String(!pressed)
			},(response2)=>{
				//좋아요 반영
				setPressed(!pressed);
			},(error2)=>{

			})
		},(error)=>{
			// console.log(error);
		});
	}
	return <div className='festivalLikeButton' onClick={likeRequest}>
		<img className={'heart'} src={`/bandifesta/assets/${pressed?'heartFill':'heart'}.png`} alt={'축제 좋아요 버튼'}/>
	</div>
}

function FestivalCard({festival,disableTag}) {
	const imgElement = useRef(null);
	const [tagVariation,setTagVariation] = useState({
		value:0,
		string:''
	});
	//진,예,마 판별
	useEffect(()=>{
		let startDate = new Date(festival.start_date);
		let today = new Date();
		let endDate = new Date(festival.end_date);
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
	},[])
	return <div className='festivalCard'>
		<div className='festivalCardTop'>
			<img src={festival.image1}
				alt={festival.title} 
				className='festivalCardImage'
				ref={imgElement}/>
			<FestivalLikeButton festivalId={festival.festival_id}/>
		</div>
		{/* 진,예,마 태그 */}
		{
			disableTag
			?<></>
			:<div className=''>
			<GenericTag variation={tagVariation.value}>
				{tagVariation.string}
			</GenericTag>
			</div>
		}
		<div className='fontSubTitle'>
			{festival.title}
		</div>
	</div>
}

function FestivalCardList({festivals}) {
	return <div className="festivalCardList">
		{festivals.map((festival)=>{
			return <FestivalCard key={festival.festival_id} festival={festival}/>
		})}
	</div>
	// const config = useContext(configContext)
	// const [festivals,setFestivals] = useState({
	// 	loaded:false,
	// 	items:[]
	// });
	// //언어 변경 시
	// useEffect(()=>{
	// 	setFestivals({
	// 		loaded:false,
	// 		items:[]
	// 	})
	// 	getOngoingFestivals({
	// 		itemsPerPage:10,
	// 		pageNum:1,
	// 		language:config.language
	// 	},(response)=>{
	// 		console.log(response);
	// 		setFestivals({
	// 			loaded:true,
	// 			items:response.data
	// 		})
	// 	})
	// },[config.language]);
	// return (
	// 	<>
	// 		{
	// 			!festivals.loaded
	// 			?'로딩중'
	// 			:(
	// 				festivals.items.length>0
	// 				?festivals.items.map((item)=>{
	// 					return <FestivalCard key={item.festival_id} festival={item}/>
	// 				})
	// 				:'...'
	// 			)
	// 		}
	// 	</>
	// )
}

export {
	FestivalCardList,
	FestivalCard,
}