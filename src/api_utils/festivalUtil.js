import axios from "axios";

//축제유형들 가져오기
const getFestivalPeriodTypes = async(thenCallback,catchCallback,finallyCallback)=>{
	await axios.get(import.meta.env.VITE_REST_URL+'/festival/getFestivalPeriodTypes')
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

//정렬방식들 가져오기
const getFestivalSortMethods = async(thenCallback,catchCallback,finallyCallback)=>{
	await axios.get(import.meta.env.VITE_REST_URL+'/festival/getFestivalSortMethods')
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

//축제들 가져오기 범용함수
/*{
	itemsPerPage: 표시할 갯수,
	pageNum: 페이지,
	language:config.language 건드리지않기,
	dateValue: 기준날짜의 getTime정수값
	sortMethod: 정렬방식,
}*/
const getFestivals = async(params,thenCallback,catchCallback,finallyCallback)=>{
	await axios.get(import.meta.env.VITE_REST_URL+`/festival/getFestivals`,{
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

//축제의 상세정보를 가져옵니다
/*{
	festivalId: 축제ID
}*/
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

//축제 좋아요를 실행합니다.
/*{
	festivalId: 축제ID,
	userId: 유저ID,
	flag: 추가/삭제
}*/
const likeFestival = async(params,thenCallback,catchCallback,finallyCallback)=>{
	await axios.get(import.meta.env.VITE_REST_URL+'/festival/likeFestival',{
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

//축제의 좋아요 여부를 확인합니다
/*{
	festivalId: 축제ID,
	userId: 유저ID
}*/
const isFestivalLiked = async(params,thenCallback,catchCallback,finallyCallback)=>{
	await axios.get(import.meta.env.VITE_REST_URL+'/festival/isFestivalLiked',{
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

//축제의 좋아요 갯수를 가져옵니다
/*{
	festivalId: 축제ID,
}*/
const getFestivalLikeCount = async(params,thenCallback,catchCallback,finallyCallback)=>{
	await axios.get(import.meta.env.VITE_REST_URL+'/festival/getFestivalLikeCount',{
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
	getFestivalPeriodTypes,
	getFestivalSortMethods,
	getFestivals,
	getFestivalDetail,
	likeFestival,
	isFestivalLiked,
	getFestivalLikeCount
}