import { Link } from 'react-router-dom';

export default function FestivalWidget({festival}) {
	return <>
	<div>
		<img
			style={{
				width:'192px',
				height:'192px'
			}}
			src={festival.image2}
			alt={festival.title}
		/>
		<Link to={
			'/festival/detail/'+
			festival.festival_id+
			'/'+festival.festival_type
		}>
			{festival.title}
		</Link>
		{festival.start_date}~{festival.end_date}
	</div>
	</>
}