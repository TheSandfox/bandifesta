import { createContext, useState } from 'react'
import './App.css'
//
import { Routes, Route } from 'react-router-dom';
//헤더푸터
import Header from './components/header/header';
import Footer from './components/footer/Footer';
//리다이렉트
import { RedirectLogin, RedirectMain } from './components/generic/Redirects';
//페이지
import PageMain 		from './components/pages/main/PageMain';
import PageIntro 		from './components/pages/intro/PageIntro';
import PageCourse 		from './components/pages/course/PageCourse';
import PageNotice 		from './components/pages/notice/PageNotice';
import PageFestival 	from './components/pages/festival/PageFestival';
import PageMy 			from './components/pages/my/PageMy';
//디테일&작성&수정페이지
import PageNoticeDetail 	from './components/pages/details/PageNoticeDetail';
import PageNoticeWrite 		from './components/pages/details/PageNoticeWrite';
import PageNoticeEdit 		from './components/pages/details/PageNoticeEdit';
import PageQNADetail 		from './components/pages/details/PageQNADetail';
import PageQNAWrite 		from './components/pages/details/PageQNAWrite';
import PageAnswerWrite 		from './components/pages/details/PageAnswerWrite';
import PageAnswerEdit 		from './components/pages/details/PageAnswerEdit';
import PageFestivalDetail 	from './components/pages/details/PageFestivalDetail';

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
	// return <>
	// 	<Header handleConfig={handleConfig}/>
	// 	{/*테스트 보실 컴포넌트 여기에 놓고 하세요*/}
	// 	<Footer/>
	// </>
	return <>
		<configContext.Provider value={config}>
			<Header handleConfig={handleConfig}/>
			<Routes>
				{/*리다이렉트*/}
				<Route exact path={'/'} element={<RedirectMain/>}/>
				<Route path={'/redirectLogin/:code'} element={<RedirectLogin/>}/>
				{/*페이지들*/}
				<Route path={'/main'} element={<PageMain/>}/>
				<Route path={'/intro'} element={<PageIntro/>}>
					<Route path={'/intro/main'} element={<></>}/>
					<Route path={'/intro/preservation'} element={<></>}/>
					<Route path={'/intro/location'} element={<></>}/>
				</Route>
				<Route path={'/course'} element={<PageCourse/>}>
					<Route path={'/course/0'} element={<></>}/>
					<Route path={'/course/1'} element={<></>}/>
					<Route path={'/course/2'} element={<></>}/>
				</Route>
				<Route path={'/notice'} element={<PageNotice/>}>
					<Route path={'/notice/main'} element={<></>}/>
					<Route path={'/notice/faq'} element={<></>}/>
				</Route>
				<Route path={'/festival'} element={<PageFestival/>}>
					<Route path={'/festival/gallery'} element={<></>}/>
					<Route path={'/festival/schedule'} element={<></>}/>
				</Route>
				<Route path={'/my'} element={<PageMy/>}>
					<Route path={'/my/info'} element={<></>}/>
					<Route path={'/my/favorites'} element={<></>}/>
					<Route path={'/my/qna'} element={<></>}/>
				</Route>
				{/*상세,작성,수정페이지*/}
				<Route path={'/notice/detail/:noticeid'} element={<PageNoticeDetail/>}/>
				<Route path={'/notice/write'} element={<PageNoticeWrite/>}/>
				<Route path={'/notice/edit/:noticeid'} element={<PageNoticeEdit/>}/>
				<Route path={'/festival/detail/:festivalId'} element={<PageFestivalDetail/>}/>
			</Routes>
			<Footer/>
		</configContext.Provider>
	</>
}

export { App, configContext }
