import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { requestToken } from "../../api_utils/loginUtils";
import { BASE_URL } from "../../api_utils/utilsConfig";

function LoginRedirect({}) {
	const [codeString,setCodeString] = useState('');
	const params = useParams();
	useEffect(()=>{
		if (params.code) {
			setCodeString(params.code);
			requestToken({
				code:params.code
			},(response)=>{
				console.log(response.data);
				setTimeout(()=>{
					console.log(document.cookie);
				},1000);
			});
		}
	},[])
	return <>로그인리다이렉트!! {codeString}</>
}

function Login({}) {
	const rest_api_key = 'c502c6ea782c2e1b700109d94cd8a0f8';
	const authorizer = `https://kauth.kakao.com/oauth/authorize?client_id=${rest_api_key}&redirect_uri=${BASE_URL}&response_type=code`;
	const handleLogin = {
		submit:()=>{
			window.location.href = authorizer;
		},
		logout:()=>{
			//do something
		}
	}
	return <>
		<button onClick={handleLogin.submit}>딸깍</button>
	</>
}

export {
	Login,
	LoginRedirect
}