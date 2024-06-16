import { useEffect, useState, useContext } from 'react';
import { faqContext } from './SubNoticeFAQ';
import { configContext } from "../../../App";
import FAQPageList from './FAQPageList';
import GenericButton from '../../generic/GenericButton';

function FAQPage() {
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
    
    
  return <>
        <p className='faqTotal'>총 <span>{datas.length}</span>개의 게시글이 있습니다.</p>
        <FAQPageList currentItems={currentItems} />
        {config.user == null ? null : 
          <div className='btnWrap'>
            <GenericButton to="notice/write">글쓰기</GenericButton>
          </div>
        }
    </>
}

export default FAQPage;