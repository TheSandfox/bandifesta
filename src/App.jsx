import { createContext, useState } from 'react'
import './App.css'
import FestivalList from './components/festival/FestivalCardList';
import Header from './components/header/Header';
import { Route, Routes } from 'react-router-dom';
import { Main } from './components/pages/main/PageMain';
import FestivalDetail from './components/festival/FestivalDetail';
import { RedirectLogin, RedirectMain } from './components/generic/Redirects';

const configContext = createContext();

function App() {
	//전역설정
	const [config,setConfig] = useState({
		languages:[
			'Kor',
			'Eng',
			'Jpn'
		],
		language:'Kor',
		user:{

		}
	})
	//전역설정 핸들러
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
		<Header/>
		{/*테스트 보실 컴포넌트 여기에 놓고 하세요*/}
		<Footer/>
	</>
	// return <>
	// 	<configContext.Provider value={config}>
	// 		<Header handleConfig={handleConfig}/>
	// 		<Routes>
	// 			<Route exact path={'/'} element={<RedirectMain/>}/>
	// 			<Route path={'/redirectLogin/:code'} element={<RedirectLogin/>}/>
	// 			<Route path={'/main'} element={<Main/>}/>
	// 			<Route path={'/list'} element={<FestivalList/>}/>
	// 			<Route path={'/festival/detail/:festivalId'} element={<FestivalDetail/>}/>
	// 		</Routes>
	// 	</configContext.Provider>
	// </>
}

export { App, configContext }
