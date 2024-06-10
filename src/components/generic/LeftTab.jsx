import { Link } from 'react-router-dom'
import './lefttab.css'

function LeftTabTitle({children}) {
	return <div className='leftTabTitle fontSubTitle'>
		{children}
	</div>
}

function LeftTab({children,to,active,onClick}) {
	return <Link className={`leftTab fontMain${active?' active':''}`} to={to||''} onClick={onClick||(()=>{})}>
		{children}
	</Link>
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