import { createContext, useEffect, useRef, useState } from 'react'
import './App.css'
import FestivalList from './components/festival/festivallist';
import Header from './components/header/header';

const configContext = createContext();

function App() {
	const [config,setConfig] = useState({
		languages:[
			'Kor',
			'Eng',
			'Jpn'
		],
		language:'Kor'
	})
	const handleConfig = {
		setLanguage:(value)=>{
			setConfig({
				...config,
				language:value
			})
		},
		getLanguageByIndex:(index)=>{
			return config.languages[index]
		}
	}
	return <>
		<configContext.Provider value={config}>
			<Header handleConfig={handleConfig}/>
			<FestivalList>
			</FestivalList>
		</configContext.Provider>
	</>

}

export { App, configContext }
