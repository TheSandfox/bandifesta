import { Link } from 'react-router-dom';
import './festival.css';

function FestivalCard({festival}) {
	return <div className='festivalCard'>
		<img src={'/bandifesta/assets/intromain01.png'} className='festivalCardImage'>

		</img>
	</div>
	// return <>
	// <div>
	// 	<img
	// 		src={festival.image1}
	// 		alt={festival.title}
	// 	/>
	// 	{/* <Link to={
	// 		'/festival/detail/'+
	// 		festival.festival_id
	// 	}>
	// 		{festival.title}
	// 	</Link> */}
	// 	{festival.title}
	// 	{festival.start_date}~{festival.end_date}
	// </div>
	// </>
}

function FestivalCardList({festivalList}) {
	return <div className="festivalCardList">
		<FestivalCard></FestivalCard>
		<FestivalCard></FestivalCard>
		<FestivalCard></FestivalCard>
		<FestivalCard></FestivalCard>
		<FestivalCard></FestivalCard>
		<FestivalCard></FestivalCard>
		<FestivalCard></FestivalCard>
		<FestivalCard></FestivalCard>
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