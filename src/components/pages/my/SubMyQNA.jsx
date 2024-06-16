import { useState, useReducer, useRef, useMemo, useCallback, useEffect, createContext, useContext } from "react";
import { configContext } from "../../../App";
import { myQnaData, reducer } from './MyQnaData';
import MyQNAList from './MyQNAList';
import PageQNAWrite from '../details/PageQNAWrite';
import PageQNADetail from '../details/PageQNADetail';
import PageQNAEdit from '../details/PageQNAEdit';
import Paginate from "../details/paginate";
import '../details/PageQNADetail.css';
import './SubMyQNA.css';
// import axios from 'axios';

export const qnaContext = createContext();
export const memoContext = createContext();


export default function SubMyQNA({handleTabState,index}) {
	// TAB 메뉴
	useEffect(()=>{
		handleTabState.set(index);
	},[])
	
	const config = useContext(configContext);
	
	// const [page, setPage] = useState(true)

	// DB 통신 
	// const [data, setData] = useState([]);
	// useEffect(() => {
	//   axios.get('http://localhost:3019/data', { withCredentials: true })
	//   .then(response => {
	// 	setData(response.data);
	//   })
	//   .catch(error => {
	// 	console.error('There was an error fetching the data!', error);
	//   });
  	// }, []);

	// CRUD
	const [state, dispatch] = useReducer(reducer,myQnaData);
	const {datas} = state;
	const {title, text, time, userID} = state.inputs;
	const idx = useRef(16);

		// 추가
		const createWord = useCallback((title, text, time, userID)=>{
			const today = new Date();
			const year = today.getFullYear();
			const month = (today.getMonth()+1).toString().padStart(2, '0');
			const day = today.getDate().toString().padStart(2, '0');
			const createDate = year + '-' + month + '-' + day;
			dispatch({
				type : 'create',
				datas : {
					idx : idx.current,
					title, text,
					time: createDate,
					userID : config.user.id
				}
			})
			idx.current += 1;
		},[time, userID, title, text])
			
		// 수정
		const editWord = (idx, title, text)=>{
			dispatch({
				type: "edit",
				idx, title, text
			})
		}
		
		// 삭제
		const removeWord = (idx)=>{
			dispatch({
				type: "remove",
				idx
			})
		}
			
		const memoWord = useMemo(()=>{
			return {createWord, editWord, removeWord}
		},[])


	// 페이지네이트
	const itemsPerPage = 10;
	const [currentItems, setCurrentItems] = useState(null);
	const [pageCount, setPageCount] = useState(0);
	const [itemOffset, setItemOffset] = useState(0);  // 번호 개수(1~10)
	const [leng, setLeng] = useState()

	useEffect(() => {
		const endOffset = itemOffset +  itemsPerPage;
		const filterItems = datas.filter((data) => Number(data.userID) === Number(config.user.id)).reverse();
		const sliceData = filterItems.slice(itemOffset, endOffset)
		setCurrentItems(sliceData); // 10번까지 배열 자르기
		setPageCount(Math.ceil(filterItems.length / itemsPerPage)); //올림해서 전체 페이지 개수 구하기 / datas를 넣으면 변하지 않는 전체 게시물의 길이로만 페이지 계산함. 그래서 filter로 걸러진& 삭제된것까지 포함하는 개수를 구하여 재계산
		setLeng(filterItems.length)
	}, [datas, config.user.id, itemOffset, itemsPerPage, leng]);
		
	const handlePageClick = (event) => {
		const newOffset = event.selected * itemsPerPage % datas.length;
		setItemOffset(newOffset);
	};

	// event.selected : 유저가 요청한 페이지 넘버
    // itemsPerPage : 한 페이지당 아이템의 수
    // items.length : 데이터 리스트의 개수
    // items.length : 데이터 리스트의 개수
    // pageCount : 총 페이지 개수
    // currentItems : 리스트 idx별 데이터(배열)
    // console.log(config.user.id)

	

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

	
	const [answer, setAnswer] = useState(null);


	return <>
		<qnaContext.Provider value={datas}>
			<memoContext.Provider value={memoWord}>
				{page === 'list' &&
					<>
						<MyQNAList setPage={setPage} currentItems={currentItems} setIdxs={setIdxs} leng={leng} answer={answer} click={click}/>
						<Paginate  pageCount={pageCount} handlePageClick={handlePageClick}/>
					</>
				}
				{page === 'write' && <PageQNAWrite setPage={setPage}/>}
				{page === 'detail' && <PageQNADetail setPage={setPage} click={click} setAnswer={setAnswer}/>}
				{page === 'edit' && <PageQNAEdit setPage={setPage} click={click}/>}
			</memoContext.Provider>
		</qnaContext.Provider>
	</>
}