import { Link } from "react-router-dom";
import "./festival.css";
import { useEffect, useRef, useState } from "react";
import GenericTag from "../GenericTag";

function FestivalLikeButton({ festivalId, userId }) {
  const [pressed, setPressed] = useState(false);
  const handlePressed = {
    toggle: () => {
      setPressed(!pressed);
    },
  };
  return (
    <div className="festivalLikeButton" onClick={handlePressed.toggle}>
      <img
        className={"heart"}
        src={`/bandifesta/assets/${pressed ? "heartFill" : "heart"}.png`}
        alt={"축제 좋아요 버튼"}
      />
    </div>
  );
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
			<FestivalLikeButton/>
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

function FestivalCardList({ festivals }) {
  return (
    <div className="festivalCardList">
      {festivals.map((festival) => {
        return <FestivalCard key={festival.festival_id} festival={festival} />;
      })}
    </div>
  );
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

export { FestivalCardList, FestivalCard };
