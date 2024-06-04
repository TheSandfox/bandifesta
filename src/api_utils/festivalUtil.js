import axios from "axios";

//진행중인 축제를 가져옵니다
const getOngoingFestivals = async(params,thenCallback,catchCallback,finallyCallback)=>{
	await axios.get(import.meta.env.VITE_REST_URL+'/festival/getOngoing',{
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

//죽제의 상세정보를 가져옵니다
const getFestivalDetail = async(params,thenCallback,catchCallback,finallyCallback)=>{
	await axios.get(import.meta.env.VITE_REST_URL+'/festival/getDetail',{
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
	getFestivalDetail,
}