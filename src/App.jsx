import { createContext, useEffect, useState } from 'react'
import './App.css'
//
import { Routes, Route } from 'react-router-dom';
//헤더푸터
import Header from './components/header/Header';
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
import SubIntroMain from './components/pages/intro/SubIntroMain';
import SubIntroPreservation from './components/pages/intro/SubIntroPreservation';
import SubIntroLocation from './components/pages/intro/SubIntroLocation';
import SubCourse0 from './components/pages/course/SubCourse0';
import SubCourse1 from './components/pages/course/SubCourse1';
import SubCourse2 from './components/pages/course/SubCourse2';
import SubNoticeMain from './components/pages/notice/SubNoticeMain';
import SubNoticeFAQ from './components/pages/notice/SubNoticeFAQ';
import SubFestivalGallery from './components/pages/festival/SubFestivalGallery';
import SubFestivalSchedule from './components/pages/festival/SubFestivalSchedule';
import SubMyInfo from './components/pages/my/SubMyInfo';
import SubMyFavorites from './components/pages/my/SubMyFavorites';
import SubMyQNA from './components/pages/my/SubMyQNA';
import PageQNAEdit from './components/pages/details/PageQNAEdit';

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
			id:0
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
	//쿠키에서 유저세션확인
	useEffect(()=>{

	},[])
	//
	return <>
		<configContext.Provider value={config}>
			<Header handleConfig={handleConfig}/>
			<Routes>
				{/*리다이렉트*/}
				<Route exact path={'/'} element={<RedirectMain/>}/>
				<Route path={'/redirectLogin/:code'} element={<RedirectLogin/>}/>
				{/*페이지들*/}
				<Route path={'/main'} 			element={<PageMain/>}/>
				<Route path={'/intro/:tabName'} element={<PageIntro/>}/>
				<Route path={'/course'} element={<PageCourse/>}/>
				<Route path={'/notice:tabName'} element={<PageNotice/>}/>
				<Route path={'/festival/:tabName'} element={<PageFestival/>}/>
				<Route path={'/my'} element={<PageMy/>}>
					<Route path={'/my/info'} 		element={<SubMyInfo/>}/>
					<Route path={'/my/favorites'} 	element={<SubMyFavorites/>}/>
					<Route path={'/my/qna'} 		element={<SubMyQNA/>}/>
				</Route>
				{/*상세,작성,수정페이지*/}
				<Route path={'/notice/detail/:noticeId'} 	element={<PageNoticeDetail/>}/>
				<Route path={'/notice/write'} 				element={<PageNoticeWrite/>}/>
				<Route path={'/notice/edit/:noticeId'} 		element={<PageNoticeEdit/>}/>
				<Route path={'/qna/detail:qnaId'} 			element={<PageQNADetail/>}/>
				<Route path={'/qna/edit:qnaId'} 			element={<PageQNAEdit/>}/>
				<Route path={'/qna/write'} 					element={<PageQNAWrite/>}/>
				<Route path={'/answer/write'} 				element={<PageAnswerWrite/>}/>
				<Route path={'/answer/edit/:answerId'} 		element={<PageAnswerEdit/>}/>
				<Route path={'/festival/detail/:festivalId'} element={<PageFestivalDetail/>}/>
			</Routes>
			<Footer/>
		</configContext.Provider>
	</>
}

export { App, configContext }
