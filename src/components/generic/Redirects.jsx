import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { login } from "../../api_utils/loginUtil";

function RedirectLogin({}) {
	const params = useParams();
	useEffect(()=>{
		// console.log("리다이렉트 마운트");
		// console.log(import.meta.env.VITE_REDIRECT_URL);
		if (params.code) {
			login({
				code:params.code
			},()=>{
				// console.log(import.meta.env.VITE_REDIRECT_URL);
				window.location.href = import.meta.env.VITE_REDIRECT_URL;
			},(error)=>{
				console.log(error);
			});
		}
	},[])
	return <></>
}

function RedirectMain({}) {
	const navigate = useNavigate();
	//네비게이트 분기(로그인리다이렉트,or그냥)
	useEffect(()=>{
		const url = new URL(window.location.href);
		const code = url.searchParams.get('code');
		if (code) {
			//로그인 리다이렉트임
			url.searchParams.delete('code');
			window.history.replaceState({}, '', url.pathname + url.hash);
			// navigate to /main
			navigate(`redirectLogin/${code}`);
		} else {
			navigate(`main`);
		}
	},[]);
	return <></>
}

export {
	RedirectLogin,
	RedirectMain
}