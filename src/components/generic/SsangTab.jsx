import { Link } from 'react-router-dom'
import './ssangtab.css'

function SsangTab({children,to,active}) {
	return <Link className={`ssangTab fontMain${active?' active':''}`} to={to}>
		{children}
	</Link>
}

function SsangTabContainer({children}) {
	return <div className='ssangTabContainer'>
		{children}
	</div>
}

export {
	SsangTabContainer,
	SsangTab
}