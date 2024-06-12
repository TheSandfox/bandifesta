import { Link } from 'react-router-dom'
import './genericbutton.css'

export default function GenericButton({children, to, onClick}) {
	return <>
		{
			to
			?<Link className="genericButton static" to={to} onClick={onClick?onClick:(()=>{})}>
				<div className="fontMain">
					{children}
				</div>
			</Link>
			:<div className="genericButton" onClick={onClick?onClick:(()=>{})}>
				<div className="fontMain">
					{children}
				</div>
			</div>
		}
	</>
}