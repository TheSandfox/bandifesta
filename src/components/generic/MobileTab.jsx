import { useNavigate } from 'react-router-dom'
import './mobiletab.css'

function MobileTab({children,to,active,onClick}) {
	const navigate = useNavigate();
	const navigateCallback = ()=>{
		if(to) {
			navigate(to);
		}
	}
	return <div className={`mobileTab fontSubTitle${active?' active':''}`} onClick={onClick?onClick:navigateCallback}>
		{children}
	</div>
}

function MobileTabContainer({children}) {
	return <div className='mobileTabContainer'>
		{children}
	</div>
}

export {
	MobileTabContainer,
	MobileTab
}