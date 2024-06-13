import React, { useEffect, useState, useContext } from 'react';
import ReactPaginate from 'react-paginate';
import './FAQPage.css'
import FAQPageList from './FAQPageList'
import FAQWriteBtn from './FAQWriteBtn'
import {bandiContext} from './SubNoticeFAQ'

function FAQPage({ itemsPerPage, items }) {
    // 페이지네이션
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);  // 번호 개수(1~10)
  
    useEffect(() => {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(items.slice(itemOffset, endOffset)); // 10번까지 배열 자르기
      setPageCount(Math.ceil(items.length / itemsPerPage)); //올림해서 전체 페이지 개수 구하기
    }, [itemOffset, itemsPerPage]);
    
    
    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage % items.length;
        setItemOffset(newOffset);
        console.log(itemOffset)
    };
    // event.selected : 유저가 요청한 페이지 넘버
    // itemsPerPage : 한 페이지당 아이템의 수
    // items.length : 데이터 리스트의 개수
    // items.length : 데이터 리스트의 개수
    // pageCount : 총 페이지 개수
    // currentItems : 리스트 idx별 데이터(배열)
    
    // -----------------------------------------------------------------
    // const datas = useContext(bandiContext);



    // const [optList, setOptlist] = useState('ALL');
    // const getSortList = ()=>{
    //     const sortItem = (item)=>{
    //         switch(optList){
    //             case 'ALL': return item.group
    //             case 'html': return item.group === 'html'
    //             case 'css': return item.group === 'css'
    //             case 'javascript': return item.group === 'javaScript'
    //             case 'node': return item.group === 'node'
    //             case 'react': return item.group === 'react'
    //             default:
    //                 return null
    //         }
    //     }
    //     const copyList = JSON.parse(JSON.stringify(datas))
    //     const sortingList = optList === 'All' ? copyList : copyList.filter((item)=>sortItem(item))
    //     return sortingList
    // }
    
    // const [popup, setPopup] = useState(true);
    // ----------------------------------------------------------------

  return <>
        <FAQPageList currentItems={currentItems} />
        <div className='FaqPageBtn'>
          <FAQWriteBtn text="글쓰기"/>
          <FAQWriteBtn text="글편집"/>
        </div>
        <ReactPaginate
          // nextLabel={<img src="/bandifesta/assets/arrowBlack.png"/>}
          // previousLabel={<img src="/bandifesta/assets/arrowBlack.png"/>}
          nextLabel='>'
          previousLabel='<'
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

export default FAQPage;