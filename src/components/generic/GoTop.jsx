import './gotop.css';

export default function GoTop({}) {
	return <div className="goTop" onClick={()=>{window.scrollTo(0, 0);}}>
		<div className='arrowUp'>

		</div>
		<div className='title fontMain'>
			위로<br/>가기
		</div>
	</div>
}