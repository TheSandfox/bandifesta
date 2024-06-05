import { Link } from 'react-router-dom';
import './header.css';
import { useEffect, useState } from 'react';
import { loginRequest, logout, unlink, getKakaoUser } from "../../api_utils/loginUtil"

function LanguageSelector() {
	return <></>
}

function MyMenu() {
	const [visible,setVisible] = useState(false);
	const [kakaoUser,setKakaoUser] = useState(null)
	useEffect(()=>{
		getKakaoUser({

		},(response)=>{
			console.log(response);
			setKakaoUser(response.data);
		},(error)=>{
			// console.log('앙대');
			// console.log(error);
			setKakaoUser(null);
		})
	},[])
	return <>
		<div className='myMenuButton'>
			야야야야야야
		</div>
	</> 
}

export default function Header({}) {
	return <header>
		<div className={'innerbox'}>
			<Link to={'/main'}>
				<div className='headerLogo'>
					<img src='/bandifesta/assets/logo1.png' alt='대한민국 밤산책 로고'/>
				</div>

			</Link>
			<div className='headerContext'>
				<LanguageSelector/>
				<MyMenu/>
			</div>
		</div>
	</header>
}