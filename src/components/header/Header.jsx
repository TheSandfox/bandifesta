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
		},
		hide:()=>{
			setVisible(false);
		}
	}
	//유저 정보 가져오기
	useEffect(()=>{
		getKakaoUser({

		},(response)=>{
			console.log(response.data);
			setKakaoUser(response.data);
		},(error)=>{
			console.log('유저 가져오기 실패');
			setKakaoUser(null);
		})
	},[])
	//로그아웃
	const logoutCallback = ()=>{
		logout({

		},(response)=>{
			setKakaoUser(null);
		},(error)=>{
			setKakaoUser(null);
		})
	}
	//언링크
	const unlinkCallback = ()=>{
		unlink({

		},(response)=>{
			setKakaoUser(null);
		},(error)=>{
			setKakaoUser(null);
		})
	}
	return <>
		<div className='myMenuButton' onClick={handleVisible.toggle}>
			{(kakaoUser&&kakaoUser.thumbnail.length>0)?<img src={kakaoUser.thumbnail}/>:<></>}
		</div>
		<div className={`myMenuContainer${visible?' active':''}`}>
			{kakaoUser===null
				?<>
					{/* 유저데이터 없음 */}
					<div className='header'>
						<div className='title fontSubTitle'>
							로그인
						</div>
						<div className='close' onClick={handleVisible.hide}>
						</div>
					</div>
					<div className='text fontMain'>
						더 나은 서비스를 위해<br/>로그인 해주시기 바랍니다.
					</div>
					<GenericIconButton className='kakao' src="/bandifesta/assets/kakao.png" onClick={loginRequest}>
						카카오로 로그인
					</GenericIconButton>
				</>
				:<>
					{/* 유저데이터 있음 */}
					<div className='header'>
						<div className='title fontSubTitle'>
							계정
						</div>
						<div className='close' onClick={handleVisible.hide}>
						</div>
					</div>
					{/* 마이&페이버릿 */}
					<div className='serviceNav'>
							<Link to={'/my/info'}>
								<div className='serviceNavItem'>
									<img className='icon' src="/bandifesta/assets/user2.png" alt='회원 정보'/>
									<div className='title fontMain'>회원 정보</div>
									<div className='arrow'></div>
								</div>
							</Link>
							<Link to={'/my/favorites'}>
								<div className='serviceNavItem'>
									<img className='icon' src="/bandifesta/assets/heartFill.png" alt='찜한 목록'/>
									<div className='title fontMain'>찜한 목록</div>
									<div className='arrow'></div>
								</div>
							</Link>
							<Link to={'/my/qna'}>
								<div className='serviceNavItem'>
									<img className='icon' src="/bandifesta/assets/user2.png" alt='1:1 문의'/>
									<div className='title fontMain'>1:1 문의</div>
									<div className='arrow'></div>
								</div>
							</Link>
						</div>
				</>
			}
			{/* 서비스 내비 */}
			<div className='header'>
				<div className='title fontSubTitle'>
					서비스
				</div>
			</div>
			<div className='serviceNav'>
				<Link to={'/intro/main'}>
					<div className='serviceNavItem'>
						<img className='icon' src="/bandifesta/assets/ballon.png" alt='경복궁별빛야행'/>
						<div className='title fontMain'>경복궁별빛야행</div>
						<div className='arrow'></div>
					</div>
				</Link>
				<Link to={'/course'}>
					<div className='serviceNavItem'>
						<img className='icon' src="/bandifesta/assets/shoes.png" alt='경복궁나들이'/>
						<div className='title fontMain'>경복궁나들이</div>
						<div className='arrow'></div>
					</div>
				</Link>
				<Link to={'/notice/main'}>
					<div className='serviceNavItem'>
						<img className='icon' src="/bandifesta/assets/notice.png" alt='알려드립니다'/>
						<div className='title fontMain'>알려드립니다</div>
						<div className='arrow'></div>
					</div>
				</Link>
				<Link to={'/festival/gallery'}>
					<div className='serviceNavItem'>
						<img className='icon' src="/bandifesta/assets/location.png" alt='축제둘러보기'/>
						<div className='title fontMain'>축제둘러보기</div>
						<div className='arrow'></div>
					</div>
				</Link>
			</div>
			{
				kakaoUser===null
				?<></>
				:<div className='logoutContainer'>
					<div className='logout' onClick={logoutCallback}>
						로그아웃
					</div>
					{/* 임시 */}
					<div className='logout' onClick={unlinkCallback}>
						연결끊기
					</div>
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