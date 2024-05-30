import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getFestivalDetail } from "../../api_utils/festivalUtil";

export default function FestivalDetail({}) {
	const params = useParams();
	const [festival,setFestival] = useState({});
	useEffect(()=>{
		if(params.festivalId) {
			getFestivalDetail({
				festivalId:params.festivalId
			},(response)=>{
				setFestival({
					...response.data
				})
				console.log(response.data);
			},(error)=>{

			})
		}
	},[])
	return <>
		{
			Object.keys(festival).map((key)=>{
				return <>{festival[key]}<br/></>
			})
		}
	</>
}