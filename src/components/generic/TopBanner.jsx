import './topbanner.css';

export default function TopBanner({children}) {
	return <div className="topBanner">
		<img className='logo' src={'/bandifesta/assets/bannerLogo.png'} />
		<div className='title'>
			{children}
		</div>
	</div>
}