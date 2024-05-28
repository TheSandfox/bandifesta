import axios from "axios";
import * as config from "./utilsConfig";

const getOngoingFestivals = async(params,thenCallback,catchCallback,finallyCallback)=>{
	await axios.get(config.BASE_URL+'/festival/getOngoing',{
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