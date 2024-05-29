console.log(String(import.meta.env.VITE_DEBUG)+"!!");
console.log(String(import.meta.env.VITE_KAKAO_REST_KEY)+"!!");
// console.log('깔깔!!');
const BASE_URL = 
	(Boolean(import.meta.env.VITE_DEBUG)===true)
	//백엔드 어플리케이션 URL
	?'http://localhost:3001/api'//로컬
	:'https://port-0-bandifesta-rest-ss7z32llwjy3ukc.sel5.cloudtype.app/api'//배포된거
// console.log(BASE_URL);
// console.log('낄낄!!');

export {
	BASE_URL
}