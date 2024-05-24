import axios from "axios";

const DEBUG = true
const BASE_URL = 
	DEBUG
	//백엔드 어플리케이션 URL
	?'http://localhost:3001/api'//로컬
	:'https://port-0-bandifesta-rest-ss7z32llwjy3ukc.sel5.cloudtype.app/api'//배포된거

const getOngoingFestivals = async(params,thenCallback,catchCallback,finallyCallback)=>{
	await axios.get(BASE_URL+'/getOngoingFestivals',{
		params
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

export {
	getOngoingFestivals,
}