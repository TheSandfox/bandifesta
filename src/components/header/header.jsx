import { Link } from 'react-router-dom';
import './header.css';
import { useEffect, useState } from 'react';
import { loginRequest, logout, unlink, getKakaoUser } from "../../api_utils/loginUtil"

function LanguageSelector() {
	return <></>
}

function MyMenu() {
	const [visible,setVisible] = useState(false);
	useEffect(()=>{
		getKakaoUser({},(response)=>{
			console.log(response.data)
		},(error)=>{
			console.log(error)
		})
	},[])
	return <>
	</>
}

export default function Header({}) {
	return <header>
		<div className={'innerbox'}>
			<Link to={'/main'}>
				<div className='headerLogo'>
					<img src='/bandifesta/assets/logo1.png' alt='대한민국 밤산책 로고'/>
				</div>

				<div className='headerContextBox'>
					<LanguageSelector/>
					<MyMenu/>
				</div>
			</Link>
		</div>
	</header>
}