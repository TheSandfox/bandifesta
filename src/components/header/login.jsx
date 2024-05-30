import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { login, loginRequest, logout, unlink, getKakaoUser } from "../../api_utils/loginUtil";

function LoginRedirect({}) {
	const params = useParams();
	useEffect(()=>{
		console.log("리다이렉트 마운트");
		console.log(import.meta.env.VITE_REDIRECT_URL);
		if (params.code) {
			login({
				code:params.code
			},()=>{
				console.log(import.meta.env.VITE_REDIRECT_URL);
				window.location.href = import.meta.env.VITE_REDIRECT_URL;
			},(error)=>{
				console.log(error);
			});
		}
	},[])
	return <></>
}

function Login({}) {
	const [isLogin,setIsLogin] = useState(0);//0로딩안됨, 1로그인, (그외)로그아웃
	const [kakaoUser,setKakaoUser] = useState({
		nickmane:'',
		profile:'',
		thumbnail:''
	});
	const handleLogin = {
		login:()=>{
			loginRequest();
		},
		logout:()=>{
			logout({},()=>{
				setIsLogin(-1);
			})
		},
		unlink:()=>{
			unlink({},()=>{
				setIsLogin(-1);
			})
		}
	}
	//컴포넌트분기
	const jsxVal = useMemo(()=>{
		switch (parseInt(isLogin)) {
		case 0:
			return <button onClick={handleLogin.login}>카카오 로그인</button>;
		case 1:
			return <>
				<button onClick={handleLogin.logout}>로그아웃</button>
				<button onClick={handleLogin.unlink}>연결 해제</button>
			</>;
		default:
			return <button onClick={handleLogin.login}>카카오 로그인</button>;
		}
	},[isLogin]);
	//로그인돼있는지확인
	useEffect(()=>{
		getKakaoUser({
			
		},(response)=>{
			console.log(response);
			setKakaoUser({...response.data});
			setIsLogin(1);
		},(error)=>{
			setIsLogin(-1);
		})
	},[])
	return <>
		{jsxVal}<br/>
		<div>{kakaoUser.nickname}님 안녕하세요</div>
		<img src={kakaoUser.profile} alt={kakaoUser.nickmane+'님의 프로필사진'}/>
		<img src={kakaoUser.thumbnail} alt={kakaoUser.nickmane+'님의 프로필사진2'}/>
	</>
}

export {
	Login,
	LoginRedirect
}