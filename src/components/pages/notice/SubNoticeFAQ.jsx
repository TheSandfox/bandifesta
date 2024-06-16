import { useState, useReducer, useRef, useMemo, useCallback, useEffect, createContext, useContext } from 'react'
import { FaqDb, reducer } from './FaqDb'
// import { configContext } from "../../../App";
import SearchBox from './SearchBox'
import FAQPageList from './FAQPageList'
import PageFAQWrite from '../details/PageFAQWrite'
import PageFAQEdit from '../details/PageFAQEdit'
import Paginate from '../details/paginate'
import './SubNoticeFAQ.css'

export const faqContext = createContext();
export const editContext = createContext();

export default function SubNoticeFAQ({handleTabState,index}) {
	// 탭메뉴 연결
	useEffect(()=>{
		handleTabState.set(index);
	},[]);

	// const config = useContext(configContext);
	// // 페이지네이션 데이터 전달
    // const items = FaqDb.datas;
    
	// CRUD
	const [state, dispatch] = useReducer(reducer,FaqDb);
	const {datas} = state;
	const {tit, txt} = state.inputs;
	const idx = useRef(16);

		// 추가
		const createWord = useCallback((tit, txt)=>{
			dispatch({
				type : 'create',
				datas : {
					idx : idx.current,
					tit, txt
				}
			})
			idx.current += 1;
		},[tit, txt])
			
		// 수정
		const editWord = (idx, tit, txt)=>{
			dispatch({
				type: "edit",
				idx, tit, txt
			})
		}
		
		// 삭제
		const removeWord = (idx)=>{
			dispatch({
				type: "remove",
				idx
			})
		}

	// 검색 기능
	const searchWord = (tit)=>{
		dispatch({
			type : "search",
			tit
		})
	}
	const memoWord = useMemo(()=>{
		return{createWord, editWord, removeWord, searchWord}
	},[])

	// 페이지네이션
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

	// 페이지 전환
	const [page, setPage] = useState('list')
	// 리스트 인덱스 - 디테일 인덱스 비교
	const [idxs, setIdxs] = useState();
	// 클릭한 리스트 데이터 index 받기
	const [click, setClick] = useState([]);
		// -> 클릭한 리스트의 데이터만 추출
		useEffect(()=>{
			const filterDetail = datas.filter((data) => Number(data.idx) === Number(idxs));
			const detailMap = filterDetail.map((data)=>setClick(data))
		},[datas, idxs])

	
	const [answer, setAnswer] = useState(false);

	function complete(click){
		if(answer && click.idx == datas.idx){
			setAnswer(!answer)
		}
	}
	// --------------------------------------------------------
	return <>
		<faqContext.Provider value={datas}>
			<editContext.Provider value={memoWord}>
				{page === 'list' &&
						<>
							<SearchBox />
							{getSortList().map((data)=><FAQPageList key={data.id} {...data} setPage={setPage} currentItems={currentItems} setIdxs={setIdxs} answer={answer} click={click} setAnswer={setAnswer}/>)}
							{/* <FAQPageList setPage={setPage} currentItems={currentItems} setIdxs={setIdxs} answer={answer} click={click} setAnswer={setAnswer}/> */}
							<Paginate  pageCount={pageCount} handlePageClick={handlePageClick}/>
						</>
				}
				{/* {page === 'write' && <PageFAQWrite setPage={setPage}/>}
				{page === 'edit' && <PageFAQEdit setPage={setPage} click={click}/>} */}
			</editContext.Provider>
		</faqContext.Provider>
	</>
}