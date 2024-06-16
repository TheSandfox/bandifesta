import { Link, useNavigate } from 'react-router-dom'
import './lefttab.css'
import { useEffect, useState } from 'react';

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
	const [top, setTop] = useState(0);
	const offsetY = 280
	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY - offsetY;
			setTop(scrollTop);
		};

		window.addEventListener('scroll', handleScroll);

		// Cleanup on component unmount
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);
	return <div className='leftTabContainerWrapper'>	
		<div className='leftTabContainer' style={{ marginTop: `${(top>=0?top:0)}px` }}>
			{children}
		</div>
	</div>
}

export {
	LeftTabContainer,
	LeftTabTitle,
	LeftTab
}