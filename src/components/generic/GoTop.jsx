import './goto.css';

export default function GoTop() {
	return <div className="goto top" onClick={(()=>{window.scrollTo(0, 0);})}>
		<div className='arrow'>

		</div>
		<div className='title fontMain'>
			위로<br/>가기
		</div>
	</div>
}