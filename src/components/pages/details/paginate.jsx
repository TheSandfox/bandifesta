import React, { useState, useReducer, useRef, useMemo, useCallback, useEffect, createContext, useContext } from "react";
import { configContext } from "../../../App";
import ReactPaginate from 'react-paginate';

export default function Paginate({datas}){

    const config = useContext(configContext);
    const itemsPerPage = 10;
	const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);  // 번호 개수(1~10)
	const [leng, setLeng] = useState()

	

    useEffect(() => {
		const endOffset = itemOffset +  itemsPerPage;
		const filterItems = datas.filter((data) => Number(data.userID) === Number(config.user.id));
		const sliceData = filterItems.slice(itemOffset, endOffset)
		setCurrentItems(sliceData); // 10번까지 배열 자르기
		setPageCount(Math.ceil(datas.length / itemsPerPage)); //올림해서 전체 페이지 개수 구하기
		setLeng(filterItems.length)
	}, [datas, config.user.id, itemOffset, itemsPerPage, leng]);
		
				

    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage % items.length;
        setItemOffset(newOffset);
	};


    return <>
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
    </>
}