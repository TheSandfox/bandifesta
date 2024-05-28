import axios from "axios";
import * as config from "./utilsConfig";
import QueryString from "qs";
import Cookies from "universal-cookie";

axios.defaults.withCredentials = true;

const cookies = new Cookies();
const cookieConfig = {
	sameSite:'none',
	secure:true,
	httpOnly:false
}
const REDIRECT_URI = import.meta.env.VITE_DEBUG
?'http://localhost:5173/bandifesta'
:'https://thesandfox.github.io/bandifesta'

const login = async(body,thenCallback,catchCallback,finallyCallback)=>{
	await axios.post(config.BASE_URL+'/kakao/login',QueryString.stringify({
		...body
	}),{
		headers:{

		}
	})
	.then(function (response) {
		setCookie('access_token',response.data['access_token']);
		setCookie('refresh_token',response.data['refresh_token']);
		// 성공 핸들링
		thenCallback(response);
	})
	.catch(function (error) {
		// 에러 핸들링
		if(catchCallback){catchCallback(error);}
	})
	.finally(function () {
		// 항상 실행되는 영역
		if(finallyCallback){finallyCallback();}
	});
}

const refreshToken = async(body,thenCallback,catchCallback,finallyCallback)=>{
	await axios.post(config.BASE_URL+'/kakao/refreshToken',QueryString.stringify({
		...body
	}),{
		headers:{

		}
	})
	.then(function (response) {
		console.log('토큰 리프레시');
		setCookie('access_token',response.data['access_token']);
		setCookie('refresh_token',response.data['refresh_token']);
		// 성공 핸들링
		thenCallback(response);
	})
	.catch(function (error) {
		// 에러 핸들링
		if(catchCallback){catchCallback(error);}
	})
	.finally(function () {
		// 항상 실행되는 영역
		if(finallyCallback){finallyCallback();}
	});
}

const getKakaoUser = async(body,thenCallback,catchCallback,finallyCallback)=>{
	await axios.post(config.BASE_URL+'/kakao/getKakaoUser',QueryString.stringify({
		...body,
		access_token:getCookie('access_token')
	}),{
		headers:{

		}
	})
	.then(function (response) {
		// 성공 핸들링
		setCookie('user_id',response.data['id']);
		thenCallback(response);
	})
	.catch(function (error) {
		// 에러 핸들링
		if(catchCallback){catchCallback(error);}
	})
	.finally(function () {
		// 항상 실행되는 영역
		if(finallyCallback){finallyCallback();}
	});
}

const loginRequest = ()=>{
	console.log(import.meta.env.VITE_KAKAO_REST_KEY);
	const authorizer = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_REST_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
	window.location.href = authorizer;
}

const logout = async(body,thenCallback,catchCallback,finallyCallback)=>{
	await axios.post(config.BASE_URL+'/kakao/logout',QueryString.stringify({
		...body,
		access_token:getCookie('access_token')
	}),{
		headers:{

		}
	})
	.then(function (response) {
		// 성공 핸들링
		removeCookie('access_token')
		removeCookie('refresh_token')
		removeCookie('user_id')
		thenCallback(response);
	})
	.catch(function (error) {
		// 에러 핸들링
		if(catchCallback){catchCallback(error);}
	})
	.finally(function () {
		// 항상 실행되는 영역
		if(finallyCallback){finallyCallback();}
	});
}

const unlink = async(body,thenCallback,catchCallback,finallyCallback)=>{
	await axios.post(config.BASE_URL+'/kakao/unlink',QueryString.stringify({
		...body,
		access_token:getCookie('access_token')
	}),{
		headers:{

		}
	})
	.then(function (response) {
		// 성공 핸들링
		thenCallback(response);
	})
	.catch(function (error) {
		// 에러 핸들링
		if(catchCallback){catchCallback(error);}
	})
	.finally(function () {
		// 항상 실행되는 영역
		if(finallyCallback){finallyCallback();}
	});
}

const setCookie = (fieldName,val)=>{
	cookies.set(fieldName,val,cookieConfig);
}

const getCookie = (fieldName)=>{
	return cookies.get(fieldName);
}

const removeCookie = (fieldName)=>{
	cookies.remove(fieldName,cookieConfig)
}

export {
	//REST
	getKakaoUser,
	loginRequest,
	login,
	logout,
	unlink,
	refreshToken,
	//UTILS
	getCookie,
	setCookie,
	REDIRECT_URI
}