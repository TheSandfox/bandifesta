import { useNavigate } from 'react-router'
import './genericbutton.css'

export default function GenericIconButton({children, to, onClick, src}) {
	const navigate = useNavigate();
	const navigateCallback = ()=>{
		if (to) {navigate(to);}
	}
	return <div className="genericIconButton" onClick={onClick?onClick:navigateCallback}>
		<img className="icon" src={src} alt={''}/>
		<div className="fontMain">
			{children}
		</div>
	</div>
}