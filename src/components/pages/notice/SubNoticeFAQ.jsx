import { useState, useReducer, useRef, useMemo, useCallback, useEffect, createContext, useContext } from 'react';
import { configContext } from "../../../App";
import { FaqDb, reducer } from './FaqDb';
import FAQPageList from './FAQPageList';
import PageFAQWrite from '../details/PageFAQWrite';
// import FAQPage from './FAQPage';
import SearchBox from './SearchBox';
import Paginate from "../details/paginate";
import './SubNoticeFAQ.css';

export const faqContext = createContext();
export const crudContext = createContext();

export default function SubNoticeFAQ({handleTabState,index}) {
	const config = useContext(configContext);

	// 탭메뉴 연결
	useEffect(()=>{
		handleTabState.set(index);
	},[]);

	// CRUD
	const [state, dispatch] = useReducer(reducer, FaqDb);
	const {datas} = state;
	const {tit, txt} = state.inputs;
	const contId = useRef(16);
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
	// 검색 기능
	const searchWord = (txt)=>{
		dispatch({
			type : "search",
			txt
		})
	}

	const memoWord = useMemo(()=>{
		return{createWord, editWord, removeWord, searchWord}
	},[])

	
	// 페이지네이션 데이터 전달
    // const items = FaqDb.datas;
    const itemsPerPage = 10;
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);  // 번호 개수(1~10)
  
    useEffect(() => {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(datas.reverse().slice(itemOffset, endOffset)); // 10번까지 배열 자르기
      setPageCount(Math.ceil(datas.length / itemsPerPage)); //올림해서 전체 페이지 개수 구하기
    }, [itemOffset, itemsPerPage]);
    
    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage % datas.length;
        setItemOffset(newOffset);
        console.log(itemOffset)
    };

	// --------------------------------------------------------

	const [pages, setPages] = useState('list')


	return <>
		{/* <div className="faqWrap"> */}
			<faqContext.Provider value={datas}>
				<crudContext.Provider value={memoWord}>
					{pages === 'list' && 
						<>
							<SearchBox />
							<FAQPageList currentItems={currentItems} setPages={setPages}/>
							<Paginate pageCount={pageCount} handlePageClick={handlePageClick}/>
						</>
					}
					{pages =='write' && <PageFAQWrite setPages={setPages}/>}
				</crudContext.Provider>
			</faqContext.Provider>
		{/* </div> */}
	</>
}