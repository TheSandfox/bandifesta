import axios from 'axios'

const festivalDefault = {
	loaded:false,
	items:[],
}

const festivalReducer = async(state,action)=>{
	switch(action.type) {
	case 'getFestivals':
		//행사들 가져오기
		const today = new Date();
		const minDay = new Date(today.setFullYear(today.getFullYear()-1));
		const maxDay = new Date(today.setFullYear(today.getFullYear()+2));
		let newFestivals = [];
		await axios.get(action.config.baseUrl[action.config.language]+'searchFestival1',{params:{
			numOfRows:'10',
			pageNo:'0',
			MobileOS:'WIN',
			MobileApp:'bandifesta',
			_type:'json',
			eventStartDate:
				String(minDay.getFullYear())+
				String(minDay.getMonth()+2)+
				String(minDay.getDate()),
			eventEndDate:
				String(maxDay.getFullYear())+
				String(maxDay.getMonth()+2)+
				String(maxDay.getDate()),
			serviceKey:action.config.serviceKey
		}})
		.then(function (response) {
			// 성공 핸들링
			// action.config.debug?console.log(response.data.response.body.items):null
			newFestivals = [
				...response.data.response.body.items.item
			]
		})
		.catch(function (error) {
			// 에러 핸들링
			console.log(error);
		})
		.finally(function () {
			// 항상 실행되는 영역
		});
		console.log({
			...state,
			items:[...newFestivals]
		})
		return {
			...state,
			items:[...newFestivals]
		};
	default :
		return state;
	}
}

export {festivalDefault, festivalReducer}