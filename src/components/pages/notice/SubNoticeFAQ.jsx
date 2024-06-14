import { useState,useReducer,useRef,useMemo,useCallback,useEffect,createContext } from 'react'

import './SubNoticeFAQ.css'
import {FaqDb, reducer} from './FaqDb'
// import FaqData from './data/FaqData'
import FAQPage from './FAQPage'
import SubNoticeSearch from './SubNoticeSearch'

export const bandiContext = createContext();
export const editContext = createContext();

export default function SubNoticeFAQ({handleTabState,index}) {
	// 탭메뉴 연결
	useEffect(()=>{
		handleTabState.set(index);
	},[]);

	// 페이지네이션 데이터 전달
    const items = FaqDb.datas;
    
	// CRUD
	const [state, dispatch] = useReducer(reducer, FaqDb);
	const {datas} = state;
	const {id, tit, txt} = state.inputs;
	const contId = useRef(16)
	
	// 추가 기능
	const createWord = useCallback((tit, txt)=>{
		dispatch({
			type : "create",
			datas : {
				id : contId.current,
				tit, txt
			}
		})
		contId.current += 1
	},[tit,txt])

	// 수정 기능
	const editWord = (id, tit, txt)=>{
		dispatch({
			type : "edit",
			id, tit, txt
		})
	}

	// 삭제 기능
	const removeWord = (id)=>{
		dispatch({
			type : "remove",
			id
		})
	}

	// 검색 기능  // 안됨 보류.
	const searchWord = (txt)=>{
		dispatch({
			type : "search",
			txt
		})
	}


	const memoWord = useMemo(()=>{
		return{createWord, editWord, removeWord, searchWord}
	},[])






	console.log(datas)

	let [st, setSt] = useState([]);

	useEffect(()=>{
		// let dataFilter = datas.map((data)=>{
		// 	return data
		// })
		// setSt(dataFilter)

		
	},[datas])

	function filt(){
		datas && datas.map((data)=>setSt(data))
	}
	console.log(st)

	// --------------------------------------------------------
	return <>
		<div className="faqWrap">
			<bandiContext.Provider value={datas}>
				<editContext.Provider value={memoWord}>
					{/* 검색창 */}
					<SubNoticeSearch />
					{/* 리스트 */}
					<FAQPage itemsPerPage={10} items={items}/>
				</editContext.Provider>
			</bandiContext.Provider>
		</div>
	</>
}