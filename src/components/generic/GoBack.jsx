import { useNavigate } from 'react-router-dom';
import './goto.css';

export default function GoBack() {
	const navigate = useNavigate();
	return <div className="goto back" onClick={(()=>{navigate(-1);})}>
		<div className='arrow'>

		</div>
		<div className='title fontMain'>
			목록<br/>으로
		</div>
	</div>
}