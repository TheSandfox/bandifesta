import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { configContext } from "../../App";

export default function FestivalDetail() {
	const config = useContext(configContext);
	const param = useParams();
	const [loaded,setLoaded] = useState(false);
	const [festival,setFestival] = useState(null);
	console.log("?")
	useEffect(()=>{
		setLoaded(false);
		const getFestivalData = async(param)=>{
			if (!(param.contentid&&param.contenttypeid)) {
				//콘텐트아이디, 콘텐트 타입아이디 둘 다 유효해야만 진행
				//그렇지 않으면 리턴
				console.log('헉')
				return;
			}
			await axios.get(config.baseUrl[param.language]+'detailIntro1',{params:{
				MobileOS:'WIN',
				MobileApp:'bandifesta',
				_type:'json',
				contentId:param.contentid,
				// contentTypeId:'0',
				contentTypeId:param.contenttypeid,
				serviceKey:config.serviceKey
			}}).then((response)=>{
				console.log(response)
				if(response.data.response.body.totalCount>0) {
					//결과값 한 개 이상
					setFestival(
						response.data.response.body.items.item[0]
					)
				} else {
					//결과값 없음
					setFestival(
						null
					)
				}
			}).catch((error)=>{
				console.log(error)
			})
		}
		getFestivalData(param);
	},[config.language])
	//로드 콜백
	useEffect(()=>{
		if(festival) {
			setLoaded(true)
		}
	},[festival])
	return <>
		{loaded
			?<div>
				{festival.eventplace}
			</div>
			:<>로딩중</>
		}
	</>
}