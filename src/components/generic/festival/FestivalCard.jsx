import './festival.css';
import { useEffect, useRef, useState, useContext } from 'react';
import GenericTag from '../GenericTag';
import { isFestivalLiked } from '/src/api_utils/festivalUtil';
import { likeFestival } from '/src/api_utils/festivalUtil';
import { configContext } from '/src/App';
import { Link, useNavigate } from 'react-router-dom';

function FestivalLikeButton({festivalId,userId,onChange}) {
	const [pressed,setPressed] = useState(false);
	//최초 마운트시 좋아요여부 확인
	useEffect(()=>{
		// console.log(userId);
		if(!userId) {return;}
		isFestivalLiked({
			userId:userId,
			festivalId:festivalId
		},(response2)=>{
			// console.log(Boolean(response2.data))
			setPressed(Boolean(response2.data));
		},(error2)=>{

		})
	},[userId])
	//좋아요버튼 콜백
	const likeRequest = ()=>{
		if(!userId) {return;}
		likeFestival({
			userId:userId,
			festivalId:festivalId,
			flag:String(!pressed)
		},(response2)=>{
			//좋아요 반영
			setPressed(!pressed);
			if (onChange) {
				onChange(!pressed);
			}
		},(error2)=>{

		})
	}
	return <div className='festivalLikeButton' onClick={likeRequest}>
		<img className={'heart'} src={`/bandifesta/assets/${pressed?'heartFill':'heart'}.png`} alt={'축제 좋아요 버튼'}/>
	</div>
}

function FestivalCard({festival,disableTag,userId}) {
	const navigate = useNavigate();
	const imgElement = useRef(null);
	const [tagVariation,setTagVariation] = useState({
		value:0,
		string:''
	});
	const isNull = festival===null;
	// console.log(userId);
	//진,예,마 판별
	useEffect(()=>{
		if (isNull){
			setTagVariation({
				value:3,
				string:''
			});
			return;
		}
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
	//
	// const navigateCallback = ()=>{
	// 	if (!festival.festival_id) {return;}
	// 	navigate(`/festival/detail/${festival.festival_id}`);
	// }
	//
	// Link
	return <div className={`festivalCard${(festival===null)?' disabled':''}`}>
		<div className='festivalCardTop'>
			{
				(!isNull)
				?<Link to={`/festival/detail/${festival?festival.festival_id:'0'}`}>
					{/* 썸네일 */}
					{
						festival.image1
						?<img src={String(festival.image1).replace('http://','https://')}
						alt={festival.title} 
						className='festivalCardImage'
						ref={imgElement}/>
						:<></>
					}
						
					{/* 하이라이팅 */}
					<div className='hightlight'></div>
				</Link>
				:<></>
			}
			{
				//userId에 따른 좋아요버튼 표시 분기
				(userId&&!isNull)
				?<FestivalLikeButton festivalId={festival.festival_id} userId={userId}/>
				:<></>
			}
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
			{(!isNull)?festival.title:''}
		</div>
	</div>
}

function FestivalCardList({festivals,className}) {
	const config = useContext(configContext);
	// console.log(config);
	return <div className={`festivalCardList${className?(' '+className):''}`}>
		{festivals.map((festival,index)=>{
			return <FestivalCard key={(festival===null)?index:festival.festival_id} festival={festival} userId={(config.user)?config.user.id:undefined}/>
		})}
	</div>
}

export { FestivalCardList, FestivalCard, FestivalLikeButton };
