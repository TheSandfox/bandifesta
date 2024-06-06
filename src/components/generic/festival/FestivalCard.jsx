import { Link } from 'react-router-dom';

export default function FestivalCard({festival}) {
	return <>
	<div>
		<img
			src={festival.image1}
			alt={festival.title}
		/>
		{/* <Link to={
			'/festival/detail/'+
			festival.festival_id
		}>
			{festival.title}
		</Link> */}
		{festival.title}
		{festival.start_date}~{festival.end_date}
	</div>
	</>
}