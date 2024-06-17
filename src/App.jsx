import { createContext, useEffect, useState, useReducer, useMemo, useCallback, useRef } from 'react'
import {Contents, Reducer} from './components/pages/notice/data';
import './App.css'
//
import { Routes, Route, useNavigate } from 'react-router-dom';
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
import PageQNAEdit from './components/pages/details/PageQNAEdit';
import { getKakaoUser, logout, unlink } from './api_utils/loginUtil';

const configContext = createContext();

export const dataContext = createContext();
export const editContext = createContext();

function App() {
	//네비게이트
	const navigate = useNavigate();
	//전역설정
	const [config,setConfig] = useState({
		languages:[
			'Kor',
			'Eng',
			'Jpn'
		],
		language:'Kor',
		user:null,
		festivalView:'gallery'
	})
	//전역설정 핸들러
	const handleConfig = {
		setFestivalView:(val)=>{
			setConfig({
				...config,
				festivalView:val
			})
		},
		setLanguage:(value)=>{
			setConfig({
				...config,
				language:value
			})
			navigate(`/festival/${config.festivalView}`);
		},
		getLanguageByIndex:(index)=>{
			return config.languages[index]
		},
		setKakaoUser:(obj)=>{
			setConfig({
				...config,
				user:obj
			})
		},
		logout:()=>{
			logout({

			},(response)=>{
				setConfig({
					...config,
					user:null
				})
			},(error)=>{
				setConfig({
					...config,
					user:null
				})
			},()=>{
				navigate('/')
			})
		},
		unlink:()=>{
			if (!confirm('카카오 계정 연결을 해제하시겠습니까?')) {return;}
			unlink({

			},(response)=>{
				setConfig({
					...config,
					user:null
				})
			},(error)=>{
				setConfig({
					...config,
					user:null
				})
			},()=>{
				navigate('/')
			})
		}
	}
	//쿠키에서 유저세션확인
	useEffect(()=>{
		getKakaoUser({

		},(response)=>{
			handleConfig.setKakaoUser(response.data);
		})
	},[])
	// notice 
	const [state, dispatch] = useReducer(Reducer, Contents);
	const {datas} = state;
	const {name, title, content} = state.inputs;
	const userId = useRef(21);
  
	const createNotice = useCallback((name, title, content)=>{
	  const today = new Date();
	  const year = today.getFullYear();
	  const month = (today.getMonth()+1).toString().padStart(2, '0');
	  const day = today.getDate().toString().padStart(2, '0');
	  const createDate = year + '-' + month + '-' + day;
  
	  dispatch({
		type: "create",
		data: {
		  name, title, content,
		  id: userId.current,
		  createDate
		}
	  })
	  userId.current += 1;
	}, [name, title, content])
  
	const editNotice = (id, content)=>{
	  dispatch({
		type: "edit",
		id, content
	  })
	}
  
	const removeNotice = (id)=>{
	  dispatch({
		type: "remove",
		id
	  })
	}
  
	const searchNotice = (text)=>{
	  dispatch({
		type: "search",
		text
	  })
	}
  
	const memoNotice = useMemo(()=>{
	  return {createNotice, editNotice, removeNotice, searchNotice}
	}, [])
	//
	return <>
		<configContext.Provider value={config}>
			<dataContext.Provider value={datas}>
				<editContext.Provider value={memoNotice}>
				    <Header handleConfig={handleConfig}/>
			        <Routes>
				        {/*리다이렉트*/}
				        <Route exact path={'/'} element={<RedirectMain/>}/>
				        <Route path={'/redirectLogin/:code'} element={<RedirectLogin/>}/>
				        {/*페이지들*/}
				        <Route path={'/main'} 			element={<PageMain/>}/>
				        <Route path={'/intro/:tabName'} element={<PageIntro/>}/>
				        <Route path={'/course'} element={<PageCourse/>}/>
				        <Route path={'/course/:tabName'} element={<PageCourse/>}/>
				        <Route path={'/notice/:tabName'} element={<PageNotice/>}/>
				        <Route path={'/festival/:tabName'} element={<PageFestival handleConfig={handleConfig}/>}/>
				        <Route path={'/my/:tabName'} element={<PageMy handleConfig={handleConfig}/>}/>
				        {/*상세,작성,수정페이지*/}
				        <Route path={'/notice/detail/:noticeId'} 	element={<PageNoticeDetail/>}/>
				        <Route path={'/notice/write'} 				element={<PageNoticeWrite/>}/>
				        <Route path={'/notice/edit/:noticeId'} 		element={<PageNoticeEdit/>}/>
				        <Route path={'/qna/detail/:qnaId'} 			element={<PageQNADetail/>}/>
				        <Route path={'/qna/edit/:qnaId'} 			element={<PageQNAEdit/>}/>
				        <Route path={'/qna/write'} 					element={<PageQNAWrite/>}/>
				        <Route path={'/answer/write'} 				element={<PageAnswerWrite/>}/>
				        <Route path={'/answer/edit/:answerId'} 		element={<PageAnswerEdit/>}/>
				        <Route path={'/festival/detail/:festivalId'} element={<PageFestivalDetail/>}/>
			        </Routes>
			        <Footer/>
				</editContext.Provider>
			</dataContext.Provider>
		</configContext.Provider>
	</>
}

export { App, configContext }
