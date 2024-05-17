import { useContext, useEffect, useState } from "react";
import { configContext } from "../../App";
import FestivalWidget from "./festivalwidget";
import axios from 'axios';

export default function FestivalList({}) {
	const config = useContext(configContext)
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
			await axios.get(config.baseUrl[config.language]+'searchFestival1',{params:{
				numOfRows:'10',
				pageNo:'0',
				MobileOS:'WIN',
				MobileApp:'bandifesta',
				_type:'json',
				arrange:'D',
				eventStartDate:
					String(minDay.getFullYear())+
					String(minDay.getMonth()+2)+
					String(minDay.getDate()),
				eventEndDate:
					String(maxDay.getFullYear())+
					String(maxDay.getMonth()+2)+
					String(maxDay.getDate()),
				serviceKey:config.serviceKey
			}})
			.then(function (response) {
				// 성공 핸들링
				config.debug?console.log(response.data.response.body.items):null
				setFestivals({
					loaded:true,
					items:response.data.response.body.items.item.map((item)=>{
						return {...item,language:config.language}
					})
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
						return <FestivalWidget key={item.contentid} festival={item}/>
					})
					:'...'
				)
			}
		</>
	)
}