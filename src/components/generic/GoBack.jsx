import { useNavigate } from 'react-router-dom';
import './goto.css';
import { useContext } from 'react';
import { configContext } from '../../App';

export default function GoBack() {
	const config = useContext(configContext);
	const navigate = useNavigate();
	return <div className="goto back" onClick={(()=>{navigate(-1);})}>
		<div className='arrow'>

		</div>
		<div className='title fontMain'>
		{
				config.language==='Kor'
				?<>목록<br/>으로</>
				:(
					config.language==='Eng'
					?<>Back</>
					:<>戻る</>
				)
			}
		</div>
	</div>
}