import { useState, useReducer, useRef, useMemo, useCallback, useEffect, createContext } from 'react'
import { FaqDb, reducer } from './FaqDb'
import FaqSearchBox from './FaqSearchBox'
import FAQPageList from './FAQPageList'
import Paginate from '../details/paginate'
import './SubNoticeFAQ.css'

export const faqContext = createContext();
export const editContext = createContext();

export default function SubNoticeFAQ({handleTabState,index}) {
	// 탭메뉴 연결
	useEffect(()=>{
		handleTabState.set(index);
	},[]);
    
	// CRUD
	const [state, dispatch] = useReducer(reducer,FaqDb);
	const {datas} = state;
	const {tit, txt} = state.inputs;
	const idx = useRef(16);

	// 검색 기능
	const searchWord = (text)=>{
		dispatch({
			type : "search",
			text
		})
	}
	const memoWord = useMemo(()=>{
		return{searchWord}
	},[])

	// 페이지네이션
	const itemsPerPage = 10;
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);  // 번호 개수(1~10)
  
    useEffect(() => {
      const endOffset = itemOffset + itemsPerPage;
	  const reverseData = [...datas].reverse()
      setCurrentItems(reverseData.slice(itemOffset, endOffset)); // 10번까지 배열 자르기
      setPageCount(Math.ceil(datas.length / itemsPerPage)); //올림해서 전체 페이지 개수 구하기
    }, [itemOffset, itemsPerPage, datas]);
    
    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage % datas.length;
        setItemOffset(newOffset);
    };

	// --------------------------------------------------------
	return <>
		<faqContext.Provider value={datas}>
			<editContext.Provider value={memoWord}>
				<>
					<FaqSearchBox />
					<FAQPageList currentItems={currentItems}/>
					<Paginate  pageCount={pageCount} handlePageClick={handlePageClick}/>
				</>
			</editContext.Provider>
		</faqContext.Provider>
	</>
}