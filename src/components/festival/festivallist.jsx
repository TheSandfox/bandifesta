import { useContext, useEffect, useState } from "react";
import { configContext } from "../../App";
import FestivalWidget from "./festivalwidget";
import { getOngoingFestivals } from '/src/api_utils/festivalUtils.js';

export default function FestivalList({}) {
	const config = useContext(configContext)
	const [festivals,setFestivals] = useState({
		loaded:false,
		items:[]
	});
	console.log("엥...")
	//언어 변경 시
	useEffect(()=>{
		setFestivals({
			loaded:false,
			items:[]
		})
		getOngoingFestivals({
			itemsPerPage:10,
			pageNum:1,
			language:config.language
		},(response)=>{
			console.log(response);
			setFestivals({
				loaded:true,
				items:response.data
			})
		})
	},[config.language]);
	return (
		<>
			{
				!festivals.loaded
				?'로딩중'
				:(
					festivals.items.length>0
					?festivals.items.map((item)=>{
						return <FestivalWidget key={item.festival_id} festival={item}/>
					})
					:'...'
				)
			}
		</>
	)
}