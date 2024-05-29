import axios from "axios";

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

export {
	getOngoingFestivals,
}