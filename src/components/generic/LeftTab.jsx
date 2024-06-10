import { Link, useNavigate } from 'react-router-dom'
import './lefttab.css'

function LeftTabTitle({children}) {
	return <div className='leftTabTitle fontSubTitle'>
		{children}
	</div>
}

function LeftTab({children,to,active,onClick}) {
	const navigate = useNavigate();
	const navigateCallback = ()=>{
		if(to) {
			navigate(to);
		}
	}
	return <div className={`leftTab fontMain${active?' active':''}`} onClick={onClick?onClick:navigateCallback}>
		{children}
	</div>
}

function LeftTabContainer({children}) {
	return <div className='leftTabContainer'>
		{children}
	</div>
}

export {
	LeftTabContainer,
	LeftTabTitle,
	LeftTab
}