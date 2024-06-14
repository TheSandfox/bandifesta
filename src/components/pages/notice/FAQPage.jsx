import React, { useEffect, useState, useContext } from 'react';
import {faqContext} from './SubNoticeFAQ'
import { configContext } from "../../../App";
import FAQPageList from './FAQPageList'
import Paginate from '../details/paginate'
import GenericButton from '../../generic/GenericButton'

function FAQPage({ items }) {
  const config = useContext(configContext);
  const datas = useContext(faqContext);
  
  // 페이지네이션
    const itemsPerPage = 10;
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);  // 번호 개수(1~10)
  
    useEffect(() => {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(datas.slice(itemOffset, endOffset)); // 10번까지 배열 자르기
      setPageCount(Math.ceil(datas.length / itemsPerPage)); //올림해서 전체 페이지 개수 구하기
    }, [itemOffset, itemsPerPage]);
    
    
    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage % datas.length;
        setItemOffset(newOffset);
        console.log(itemOffset)
    };
    // event.selected : 유저가 요청한 페이지 넘버
    // itemsPerPage : 한 페이지당 아이템의 수
    // items.length : 데이터 리스트의 개수
    // items.length : 데이터 리스트의 개수
    // pageCount : 총 페이지 개수
    // currentItems : 리스트 idx별 데이터(배열)
    // console.log(config.user.id)
    
  return <>
        <FAQPageList currentItems={currentItems} />
        {config.user == null ?
          null
        : 
          <div className='btnWrap'>
            <GenericButton>글쓰기</GenericButton>
          </div>
        }
        <Paginate pageCount={pageCount} handlePageClick={handlePageClick}/>
    </>
}

export default FAQPage;