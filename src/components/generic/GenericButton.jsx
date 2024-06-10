import { useNavigate } from 'react-router'
import './genericbutton.css'

export default function GenericButton({children, to, onClick}) {
	const navigate = useNavigate();
	const navigateCallback = ()=>{
		if (to) {navigate(to);}
	}
	return <div className="genericButton" onClick={onClick?onClick:navigateCallback}>
		<div className="fontMain">
			{children}
		</div>
	</div>
}