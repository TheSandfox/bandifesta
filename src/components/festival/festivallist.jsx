import { useContext, useEffect, useState } from "react";
import { configContext } from "../../App";
import axios from 'axios';

const SERVICE_KEY = '+ArYhKOZcxDx6hjFGpftMY/IAhHCTOHX+GQm/rYzumqwDOlNLI1vh1c+Z52O20B1fhakJsvh1P+Yf9+0+Xfy7w=='
const BASE_URL = {
	Kor:'https://apis.data.go.kr/B551011/KorService1/',
	Eng:'https://apis.data.go.kr/B551011/EngService1/',
	Jpn:'https://apis.data.go.kr/B551011/JpnService1/'
}
const DEBUG = true;

export default function FestivalList({}) {
	const config = useContext(configContext)
	const [serviceType,setServiceType] = useState(
		'searchFestival1'
	)
	const [festivals,setFestivals] = useState({
		loaded:false,
		items:[]
	});
	//언어 변경 시
	useEffect(()=>{
		setFestivals({
			loaded:false,
			items:[]
		})
		const getFestivals = async()=>{
			const today = new Date();
			const minDay = new Date(today.setFullYear(today.getFullYear()-1));
			const maxDay = new Date(today.setFullYear(today.getFullYear()+2));
			console.log(minDay.toLocaleDateString());
			console.log(maxDay.toLocaleDateString());
			await axios.get(BASE_URL[config.language]+serviceType,{params:{
				numOfRows:'10',
				pageNo:'0',
				MobileOS:'WIN',
				MobileApp:'bandifesta',
				_type:'json',
				eventStartDate:
					String(minDay.getFullYear())+
					String(minDay.getMonth()+2)+
					String(minDay.getDate()),
				eventEndDate:
					String(maxDay.getFullYear())+
					String(maxDay.getMonth()+2)+
					String(maxDay.getDate()),
				serviceKey:SERVICE_KEY
			}})
			.then(function (response) {
				// 성공 핸들링
				DEBUG?console.log(response.data.response.body.items):null
				setFestivals({
					loaded:true,
					items:[...response.data.response.body.items.item]
				})
			})
			.catch(function (error) {
				// 에러 핸들링
				console.log(error);
			})
			.finally(function () {
				// 항상 실행되는 영역
			});
		}
		
		getFestivals();

	},[config.language])
	return (
		<>
			{
				!festivals.loaded
				?'로딩중'
				:(
					festivals.items.length>0
					?festivals.items.map((item)=>{
					return <div key={item.contentid}>
						{item.title} {item.eventstartdate}~{item.eventenddate}
					</div>
					})
					:'...'
				)
			}
		</>
	)
}