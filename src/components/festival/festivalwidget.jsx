import { Link } from 'react-router-dom';

export default function FestivalWidget({festival}) {
	return <>
	<div>
		<Link to={
			'/festival/detail/'+
			festival.contentid+
			'/'+festival.contenttypeid+
			'/'+festival.language
		}>
			{festival.title}
		</Link>
	</div>
	</>
}