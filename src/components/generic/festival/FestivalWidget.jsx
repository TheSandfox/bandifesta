import './festivalwidget.css';

function FestivalWidget({festival}) {
	return <div className="festivalWidget">
		<div className='left fontMain'>
			<img src="/bandifesta/assets/sparkle.png"/>
			<p>{festival===null?'':festival.title}</p>
		</div>
		<div className='right fontMain'>
			{festival===null?'':`${festival.start_date}~${festival.end_date}`}
		</div>
	</div>
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