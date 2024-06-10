import { Link, useNavigate } from 'react-router-dom';
import './header.css';
import './mymenu.css';
import { useEffect, useState } from 'react';
import { loginRequest, logout, unlink, getKakaoUser } from "../../api_utils/loginUtil"
import GenericIconButton from '../generic/GenericIconButton';

function LanguageSelector() {
	return <></>
}

function MyMenu() {
	const navigate = useNavigate();
	const [visible,setVisible] = useState(false);
	const [kakaoUser,setKakaoUser] = useState(null)
	const handleVisible = {
		toggle:()=>{
			setVisible(!visible);
			// navigate('/my/info');
		}
	}
	//유저 정보 가져오기
	useEffect(()=>{
		getKakaoUser({

		},(response)=>{
			console.log(response);
			setKakaoUser(response.data);
		},(error)=>{
			console.log('앙대');
			// console.log(error);
			setKakaoUser(null);
		})
	},[])
	return <>
		<div className='myMenuButton' onClick={handleVisible.toggle}>
			{kakaoUser?<img src={kakaoUser.thumbnail}/>:<></>}
		</div>
		<div className={`myMenuContainer${visible?' active':''}`}>
			{kakaoUser===null
				?<div className='loginInfo'>
					{/* 유저데이터 없음 */}
					<div className='title'>
						로그인
					</div>
					<div className='text'>
						더 나은 서비스를 위해<br/>로그인 해주시기 바랍니다.
					</div>
					<GenericIconButton>
						카카오로 로그인
					</GenericIconButton>
				</div>
				:<div className='userMenu'>
					{/* 유저데이터 있음 */}
				</div>
			}
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
			<div className='headerMiddleNav'>
				<Link 
					className={'navItem fontSubTitle'} 
					to={'/intro/main'}>
					경복궁별빛야행
				</Link>
				<Link 
					className={'navItem fontSubTitle'} 
					to={'/course'}>
					경복궁나들이
				</Link>
				<Link 
					className={'navItem fontSubTitle'} 
					to={'/notice/main'}>
					알려드립니다
				</Link>
				<Link 
					className={'navItem fontSubTitle active'} 
					to={'/festival/gallery'}>
					축제둘러보기
				</Link>
			</div>
			<div className='headerContext'>
				<LanguageSelector/>
				<MyMenu/>
			</div>
		</div>
	</header>
}