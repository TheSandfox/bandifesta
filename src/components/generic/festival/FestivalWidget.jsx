import './festivalwidget.css';
import { Link } from 'react-router-dom';

function FestivalWidget({festival}) {
	return <>{
		festival
		?<Link className="festivalWidget" to={`/festival/detail/${festival?festival.festival_id:'0'}`}>
			<div className='left fontMain'>
				<img src="/bandifesta/assets/sparkle.png"/>
				<p>{festival===null?'':festival.title}</p>
			</div>
			<div className='right fontMain'>
				{festival===null?'':`${festival.start_date}~${festival.end_date}`}
			</div>
		</Link>
		:<></>
	}</>
}

function FestivalWidgetList({festivals}) {
	return <div className="festivalWidgetList">
		{festivals.map((festival,index)=>{
			return <FestivalWidget festival={festival} key={(festival===null)?index:festival.festival_id}/>
		})}
	</div>
}

export {
	FestivalWidget,
	FestivalWidgetList
}