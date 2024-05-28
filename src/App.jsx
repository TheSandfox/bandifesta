import { createContext, useState } from 'react'
import './App.css'
import FestivalList from './components/festival/festivallist';
import Header from './components/header/header';
import { Route, Routes, useNavigate } from 'react-router-dom';
import {Main,RedirectMain} from './components/main/main';
import { LoginRedirect } from './components/header/login';

const configContext = createContext();

function App() {
	//
	const navigate = useNavigate();
	//전역설정
	const [config,setConfig] = useState({
		languages:[
			'Kor',
			'Eng',
			'Jpn'
		],
		language:'Kor',
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
		<configContext.Provider value={config}>
			<Header handleConfig={handleConfig}/>
			<Routes>
				{/* <Route exact path={'/'} element={<Main/>}/> */}
				<Route exact path={'/'} element={<RedirectMain></RedirectMain>}/>
				<Route path={'/main'} element={<Main></Main>}/>
				<Route path={'/list'} element={<FestivalList/>}/>
				<Route path={'/loginRedirect/:code'} element={<LoginRedirect/>}/>
				{/* <Route exact path={'/festival/list'} element={<FestivalList/>}/> */}
				{/* <Route path={'/festival/detail/:contentid/:contenttypeid/:language'} element={<FestivalDetail/>}/> */}
			</Routes>
		</configContext.Provider>
	</>

}

export { App, configContext }
