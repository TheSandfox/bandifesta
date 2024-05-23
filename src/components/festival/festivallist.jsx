import { useContext, useEffect, useState } from "react";
import { configContext } from "../../App";
import FestivalWidget from "./festivalwidget";
import axios from 'axios';
import { getFestivals } from '/src/api_utils/festivalUtils.js';

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
		getFestivals({
			language:config.language,
			itemsPerPage:10,
			pageNum:1
		},(response)=>{
			console.log(response);
			setFestivals({
				loaded:true,
				items:response.body.items.item
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
						return <FestivalWidget key={item.contentid} festival={item}/>
					})
					:'...'
				)
			}
		</>
	)
}