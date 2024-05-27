const DEBUG = true
const BASE_URL = 
	DEBUG
	//백엔드 어플리케이션 URL
	?'http://localhost:3001/api'//로컬
	:'https://port-0-bandifesta-rest-ss7z32llwjy3ukc.sel5.cloudtype.app/api'//배포된거

export {
	DEBUG,
	BASE_URL
}