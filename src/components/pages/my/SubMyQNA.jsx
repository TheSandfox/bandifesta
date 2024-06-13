import React, { useState, useReducer, useRef, useMemo, useCallback, useEffect, createContext, useContext } from "react";
import './SubMyQNA.css'
import '../details/PageQNADetail.css'
import ReactPaginate from 'react-paginate';
import MyQNAList from './MyQNAList'
import { configContext } from "../../../App";
import {myQnaData, reducer} from './MyQnaData';
import PageQNAWrite from '../details/PageQNAWrite'
// import axios from 'axios';

export const qnaContext = createContext();
export const editContext = createContext();


export default function SubMyQNA({handleTabState,index}) {
	// TAB 메뉴
	useEffect(()=>{
		handleTabState.set(index);
	},[])

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

	const config = useContext(configContext);

	let [page, setPage] = useState(true)

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
		 },[title, text, time, userID])
		 
			
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
	const items = datas;
	const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);  // 번호 개수(1~10)
	const [leng, setLeng] = useState()

	

    useEffect(() => {
		const endOffset = itemOffset +  itemsPerPage;
		const filterItems = datas.filter((data) => Number(data.userID) === Number(config.user.id));
		const sliceData = filterItems.slice(itemOffset, endOffset)
		setCurrentItems(sliceData); // 10번까지 배열 자르기
		setPageCount(Math.ceil(items.length / itemsPerPage)); //올림해서 전체 페이지 개수 구하기

		setLeng(filterItems.length)
	}, [datas, config.user.id, itemOffset, itemsPerPage, leng]);
		
				

    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage % items.length;
        setItemOffset(newOffset);
	};

	
	return <>
		{page ? 
			<qnaContext.Provider value={datas}>
				<editContext.Provider value={memoWord}>
						<MyQNAList currentItems={currentItems} datas={datas} leng={leng} setPage={setPage}/>
						<ReactPaginate
							nextLabel={<img src="/bandifesta/assets/arrowBlack.png"/>}
							previousLabel={<img src="/bandifesta/assets/arrowBlack.png"/>}
							nextLinkClassName="subNoticePageNext"
							previousLinkClassName="subNoticePagePrev"

							activeClassName="subNoticePageActive"
							pageClassName="subNoticePage"
							containerClassName="subNoticeNavi"

							pageRangeDisplayed={3}
							pageCount={pageCount}
							onPageChange={handlePageClick}
							onClick={false}
							
							renderOnZeroPageCount={null}
						/>
				</editContext.Provider>
			</qnaContext.Provider>
		:
			<qnaContext.Provider value={datas}>
				<editContext.Provider value={memoWord}>
					<PageQNAWrite setPage={setPage} datas={datas}/>
				</editContext.Provider>
			</qnaContext.Provider>
		}

	</>
}