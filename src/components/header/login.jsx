import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { login, loginRequest, logout, unlink, getKakaoUser } from "../../api_utils/loginUtil";

function LoginRedirect({}) {
	const params = useParams();
	useEffect(()=>{
		if (params.code) {
			login({
				code:params.code
			},()=>{
				window.location.href = import.meta.env.VITE_REDIRECT_URL;
			});
		}
	},[])
	return <></>
}

function Login({}) {
	const [isLogin,setIsLogin] = useState(0);//0로딩안됨, 1로그인, (그외)로그아웃
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
			return <button onClick={handleLogin.login}>딸깍</button>;
		case 1:
			return <>
				<button onClick={handleLogin.logout}>로그아웃하기!</button>
				<button onClick={handleLogin.unlink}>회원탈퇴에에에엥</button>
			</>;
		default:
			return <button onClick={handleLogin.login}>딸깍</button>;
		}
	},[isLogin]);
	//로그인돼있는지확인
	useEffect(()=>{
		getKakaoUser({
			
		},(response)=>{
			setIsLogin(1);
		},(error)=>{
			setIsLogin(-1);
		})
	},[])
	return <>
		{jsxVal}
	</>
}

export {
	Login,
	LoginRedirect
}