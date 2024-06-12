import React, { useState, useReducer, useRef, useMemo, useCallback, useEffect, createContext, useContext } from "react";
import './SubMyQNA.css'
import ReactPaginate from 'react-paginate';
import MyQNAList from './MyQNAList'
import GenericButton from '../../generic/GenericButton'

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
			const date = new Date().toLocaleDateString;
			dispatch({
				type : 'create',
				datas : {
				title, text, time, userID,
				idx : idx.current,
				time : date,
				userID : config.user.id
				}
			})
			idx.current += 1
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
  
    useEffect(() => {
		const endOffset = itemOffset + itemsPerPage;
		// const filterData = items.filter((data) => data.userID === config.user.id);
		// const sliceData = filterData.slice(itemOffset, endOffset)
		// setCurrentItems(sliceData); // 10번까지 배열 자르기
		setCurrentItems(items.slice(itemOffset, endOffset)); // 10번까지 배열 자르기
		setPageCount(Math.ceil(items.length / itemsPerPage)); //올림해서 전체 페이지 개수 구하기
    }, [itemOffset, itemsPerPage]);
    // console.log(items)
    
    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage % items.length;
        setItemOffset(newOffset);
        // console.log(itemOffset)
		};


		return <>
		{page ? 
			<div className="MyQnaRight">
				<qnaContext.Provider value={datas}>
					<editContext.Provider value={memoWord}>
					<h1>1:1 문의 내역</h1>
					<div className="MyQna">
						<p>총 <span>{datas.length}</span>개의 게시글이 있습니다.</p>
						<MyQNAList currentItems={currentItems} config={config} state={state}/>
						<div className="MyQnaWriteBtn">
							<GenericButton onClick={()=>setPage(false)}>글쓰기</GenericButton>
						</div>
					</div>

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
			</div>
		:
			<PageQNAWrite/>
		}
		
	</>
}