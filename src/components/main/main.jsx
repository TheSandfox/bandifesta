import { useEffect, useLayoutEffect } from "react";
import Scene from "./scene";
import './scene.css';
import { useNavigate } from "react-router-dom";

function RedirectMain({}) {
	const navigate = useNavigate();
	//네비게이트 분기(로그인리다이렉트,or그냥)
	console.log('옹')
	useEffect(()=>{
		const url = new URL(window.location.href);
		const code = url.searchParams.get('code');
		if (code) {
			//로그인 리다이렉트임
			url.searchParams.delete('code');
			window.history.replaceState({}, '', url.pathname + url.hash);
			// navigate to /main
			navigate(`loginRedirect/${code}`);
		} else {
			navigate(`main`);
		}
	},[]);
	return <></>
}

function Main({}) {
	return <>
		{/* <Scene/> */}
	</>
}

export {
	RedirectMain,
	Main
}