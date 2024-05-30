import { useState } from "react"
import { Link } from "react-router-dom"
import { Login } from "./login"

export default function Header({handleConfig}) {
	const [selectValue,setSelectValue] = useState(
		handleConfig.getLanguageByIndex(0)
	)
	const selectCallback = (event)=>{
		setSelectValue(
			event.target.value
		)
		handleConfig.setLanguage(event.target.value)
	}
	return <header>
		<Link to={'/main'}>메인페이지</Link>
		<Link to={'/list'}>축제둘러보기</Link>
		<select onChange={selectCallback} value={selectValue}>
			<option value={handleConfig.getLanguageByIndex(0)}>한글</option>
			<option value={handleConfig.getLanguageByIndex(1)}>English</option>
			<option value={handleConfig.getLanguageByIndex(2)}>日本語</option>
		</select>
		<Login></Login>
	</header>
}