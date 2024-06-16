import { useContext } from 'react';
import './goto.css';
import { configContext } from '../../App';

export default function GoTop() {
	const config = useContext(configContext);
	return <div className="goto top" onClick={(()=>{window.scrollTo(0, 0);})}>
		<div className='arrow'>

		</div>
		<div className='title fontMain'>
			{
				config.language==='Kor'
				?<>위로<br/>가기</>
				:(
					config.language==='Eng'
					?<>Top</>
					:<>トップへ</>
				)
			}
		</div>
	</div>
}