import './festivalwidget.css';

function FestivalWidget({festival}) {
	return <div className="festivalWidget">
		<div className='left fontMain'>
			<img src="/bandifesta/assets/sparkle.png"/>
			<p>{festival.title}</p>
		</div>
		<div className='right fontMain'>
			{festival.start_date}~{festival.end_date}
		</div>
	</div>
}

function FestivalWidgetList({festivals}) {
	return <div className="festivalWidgetList">
		{festivals.map((festival)=>{
			return <FestivalWidget festival={festival} key={festival.festival_id}/>
		})}
	</div>
}

export {
	FestivalWidget,
	FestivalWidgetList
}