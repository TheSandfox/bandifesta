import { useState } from "react"

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
		<select onChange={selectCallback} value={selectValue}>
			<option value={handleConfig.getLanguageByIndex(0)}>한글</option>
			<option value={handleConfig.getLanguageByIndex(1)}>English</option>
			<option value={handleConfig.getLanguageByIndex(2)}>日本語</option>
		</select>
	</header>
}