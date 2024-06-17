import { Link } from 'react-router-dom';
import './header.css';
import './mymenu.css';
import './submenu.css';
import { useContext, useEffect, useRef, useState } from 'react';
import { loginRequest } from "/src/api_utils/loginUtil"
import GenericIconButton from '../generic/GenericIconButton';
import { configContext } from '../../App';

function LanguageSelector({handleConfig}) {
	const [visible,setVisible] = useState(false);
	const [displayValue,setDisplayValue] = useState('');
	const config = useContext(configContext);
	const containerRef = useRef(null)
	useEffect(()=>{
		let val = ''
		switch(config.language) {
		case 'Kor':
			val = '한국어';
			break;
		case 'Eng' :
			val = 'English';
			break;
		case 'Jpn' :
			val = '日本語';
			break;
		}
		setDisplayValue(val);
	},[config.language])
	useEffect(()=>{
		setVisible(false);
	},[displayValue])
	//바깥 클릭 시 소멸
	useEffect(()=>{
		const clickCallback = (e)=>{
			if (e.button!==0) {return;}
			if (!visible) {return;}
			if (e.target!==containerRef.current&&!(containerRef.current.contains(e.target))){
				setVisible(false);
			}
		}

		window.addEventListener('mousedown',clickCallback);

		return ()=>{
			window.removeEventListener('mousedown',clickCallback);
		}
	},[visible])
	return <div ref={containerRef} className='languageSelector'>
		<div className='contentAndArrow' onClick={()=>{setVisible(!visible)}}>
			<div className='content fontMain'>
				{displayValue}
			</div>
			<div className={`arrow${visible?' active':''}`}>

			</div>
		</div>
		{
			visible
			?<div className='dropDown'>
				<div className={`dropDownItem fontMain${displayValue==='한국어'?' active':''}`} onClick={()=>{
					handleConfig.setLanguage('Kor');
				}}>
					한국어
				</div>
				<div className={`dropDownItem fontMain${displayValue==='English'?' active':''}`} onClick={()=>{
					handleConfig.setLanguage('Eng');
				}}>
					English
				</div>
				<div className={`dropDownItem fontMain${displayValue==='日本語'?' active':''}`} onClick={()=>{
					handleConfig.setLanguage('Jpn');
				}}>
					日本語
				</div>
			</div>
			:<></>
		}
	</div>
}

function MyMenu({handleConfig}) {
	const [visible,setVisible] = useState(false);
	const config = useContext(configContext);
	const handleVisible = {
		toggle:()=>{
			setVisible(!visible);
		},
		hide:()=>{
			setVisible(false);
		}
	}
	//로그아웃
	const logoutCallback = ()=>{
		handleConfig.logout();
	}
	//언링크
	const unlinkCallback = ()=>{
		handleConfig.unlink();
	}
	return <>
		<div className='myMenuButton' onClick={handleVisible.toggle}>
			{(config.user&&config.user.thumbnail)?<img src={String(config.user.thumbnail).replace('http://','https://')}/>:<></>}
		</div>
		<div className={`myMenuContainerWrapper${visible?' active':''}`}>
			<div className='myMenuContainer'>
				{config.user===null
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
							<Link to={'/my/info'} onClick={handleVisible.hide}>
								<div className='serviceNavItem'>
									<img className='icon' src="/bandifesta/assets/user2.png" alt='회원 정보'/>
									<div className='title fontMain'>회원 정보</div>
									<div className='arrow'></div>
								</div>
							</Link>
							<Link to={'/my/favorites'} onClick={handleVisible.hide}>
								<div className='serviceNavItem'>
									<img className='icon' src="/bandifesta/assets/heartFill.png" alt='찜한 목록'/>
									<div className='title fontMain'>찜한 목록</div>
									<div className='arrow'></div>
								</div>
							</Link>
							<Link to={'/my/qna'} onClick={handleVisible.hide}>
								<div className='serviceNavItem'>
									<img className='icon' src="/bandifesta/assets/question2.png" alt='1:1 문의'/>
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
					<Link to={'/intro/main'} onClick={handleVisible.hide}>
						<div className='serviceNavItem'>
							<img className='icon' src="/bandifesta/assets/ballon.png" alt='경복궁별빛야행'/>
							<div className='title fontMain'>경복궁별빛야행</div>
							<div className='arrow'></div>
						</div>
					</Link>
					<Link to={'/course/min40'} onClick={handleVisible.hide}>
						<div className='serviceNavItem'>
							<img className='icon' src="/bandifesta/assets/shoes.png" alt='경복궁나들이'/>
							<div className='title fontMain'>경복궁나들이</div>
							<div className='arrow'></div>
						</div>
					</Link>
					<Link to={'/notice/main'} onClick={handleVisible.hide}>
						<div className='serviceNavItem'>
							<img className='icon' src="/bandifesta/assets/notice.png" alt='알려드립니다'/>
							<div className='title fontMain'>알려드립니다</div>
							<div className='arrow'></div>
						</div>
					</Link>
					<Link to={'/festival/gallery'} onClick={handleVisible.hide}>
						<div className='serviceNavItem'>
							<img className='icon' src="/bandifesta/assets/location.png" alt='축제둘러보기'/>
							<div className='title fontMain'>축제둘러보기</div>
							<div className='arrow'></div>
						</div>
					</Link>
				</div>
				{
					config.user===null
					?<></>
					:<div className='logoutContainer'>
						<div className='logout' onClick={logoutCallback}>
							로그아웃
						</div>
					</div>
				}
			</div>
		</div>
	</> 
}

function SubMenu({displaySubMenu,setDisplaySubMenu}) {
	const config = useContext(configContext);
	const containerRef = useRef(null);
	return <div 
		className={`subMenu${(displaySubMenu&&config.language==='Kor')?'':' hidden'}`} 
		ref={containerRef}
		onMouseLeave={()=>{setDisplaySubMenu(false);}}>
		{/* 소개 */}
		<div className='subMenuContainer'>
			<Link className='subMenuItem fontSubTitle' to={'/intro/main'} onClick={()=>{setDisplaySubMenu(false)}}>
				행사 소개
			</Link>
			<Link className='subMenuItem fontSubTitle' to={'/intro/preservation'} onClick={()=>{setDisplaySubMenu(false)}}>
				예매 안내
			</Link>
			<Link className='subMenuItem fontSubTitle' to={'/intro/location'} onClick={()=>{setDisplaySubMenu(false)}}>
				오시는 길
			</Link>
		</div>
		{/* 코스 */}
		<div className='subMenuContainer'>
			<Link className='subMenuItem fontSubTitle' to={'/course/min40'} onClick={()=>{setDisplaySubMenu(false)}}>
				아이와 함께
			</Link>
			<Link className='subMenuItem fontSubTitle' to={'/course/min60'} onClick={()=>{setDisplaySubMenu(false)}}>
				가족과 함께
			</Link>
			<Link className='subMenuItem fontSubTitle' to={'/course/min90'} onClick={()=>{setDisplaySubMenu(false)}}>
				연인과 함께
			</Link>
		</div>
		{/* 알려드 */}
		<div className='subMenuContainer'>
			<Link className='subMenuItem fontSubTitle' to={'/notice/main'} onClick={()=>{setDisplaySubMenu(false)}}>
				공지사항
			</Link>
			<Link className='subMenuItem fontSubTitle' to={'/notice/faq'} onClick={()=>{setDisplaySubMenu(false)}}>
				자주하는 질문
			</Link>
		</div>
		{/* 축제 */}
		<div className='subMenuContainer'>
			<Link className='subMenuItem fontSubTitle' to={'/festival/gallery'} onClick={()=>{setDisplaySubMenu(false)}}>
				전체보기
			</Link>
			<Link className='subMenuItem fontSubTitle' to={'/festival/schedule'} onClick={()=>{setDisplaySubMenu(false)}}>
				달력으로 보기
			</Link>
		</div>
	</div>
}

export default function Header({handleConfig}) {
	const yPositionRef = useRef(0);
	const headerRef = useRef(null);
	const config = useContext(configContext);
	const [displaySubMenu,setDisplaySubMenu] = useState(false);
	//스크롤 콜백& y좌표 초기화
	useEffect(()=>{
		yPositionRef.current = window.scrollY;
		const scrollCallback = (e)=>{
			const element = headerRef.current;
			if (window.scrollY>=element.offsetHeight) {
				//헤더보다 밑으로 내려옴
				element.classList.add('alter');
			} else {
				//헤더보다 위에있음
				element.classList.remove('alter');
			}

			if (window.scrollY > yPositionRef.current) {
				//스크롤 다운임
				element.classList.add('hidden');
				setDisplaySubMenu(false);
			} else {
				//스크롤 업임
				element.classList.remove('hidden');
			}
			yPositionRef.current = window.scrollY;
		}
		window.addEventListener('scroll',scrollCallback);
		
		return ()=>{
			window.removeEventListener('scroll',scrollCallback);
		}
	},[]);
	return <div className='headerDummy'>
		<header ref={headerRef}>
			{
				config.language==='Kor'
				?<Link to={'/main'}>
					<div className='headerLogo'>
						<img src='/bandifesta/assets/logo1.png' alt='대한민국 밤산책 로고'/>
					</div>
				</Link>
				:<div className='headerLogo'>
					<img src='/bandifesta/assets/logo1.png' alt='대한민국 밤산책 로고'/>
				</div>
			}
			{
				config.language==='Kor'
				?<div className='headerMiddleNav'>
				<Link 
					className={'navItem fontSubTitle'} 
					to={'/intro/main'}
					onMouseEnter={()=>{setDisplaySubMenu(true);}}
					/* onClick={()=>{setDisplaySubMenu(false)}} */>
					경복궁별빛야행
				</Link>
				<Link 
					className={'navItem fontSubTitle'} 
					to={'/course/min40'}
					onMouseEnter={()=>{setDisplaySubMenu(true);}}
					/* onClick={()=>{setDisplaySubMenu(false)}} */>
					경복궁나들이
				</Link>
				<Link 
					className={'navItem fontSubTitle'} 
					to={'/notice/main'}
					onMouseEnter={()=>{setDisplaySubMenu(true);}}
					/* onClick={()=>{setDisplaySubMenu(false)}} */>
					알려드립니다
				</Link>
				<Link 
					className={'navItem fontSubTitle active'} 
					to={'/festival/gallery'}
					onMouseEnter={()=>{setDisplaySubMenu(true);}}
					/* onClick={()=>{setDisplaySubMenu(false)}} */>
					축제둘러보기
				</Link>
				</div>
				:<></>
			}
			<div className='headerContext'>
				{
					config.language==='Kor'
					?<MyMenu handleConfig={handleConfig}/>
					:<></>
				}
				<LanguageSelector handleConfig={handleConfig}/>
			</div>
		</header>
		<SubMenu displaySubMenu={displaySubMenu} setDisplaySubMenu={setDisplaySubMenu}/>
	</div>
}