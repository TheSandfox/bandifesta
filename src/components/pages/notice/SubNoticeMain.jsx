import {useContext, useEffect, useState} from 'react';
import {dataContext, configContext} from '../../../App';
import SubNoticeList from './SubNoticeList';
import SearchBox from './SearchBox';
import GenericButton from '../../generic/GenericButton';
import './SubNoticeMain.css';
import Paginate from '../details/paginate';

function SubNoticeMain({handleTabState,index}) {

	useEffect(()=>{
		handleTabState.set(index);
	},[]);

	const datas = useContext(dataContext);
    const config = useContext(configContext);

    // 페이지네이션
    const itemsPerPage = 10;
    const [itemOffset, setItemOffset] = useState(0);

    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        const reverseData = [...datas].reverse()
        setCurrentItems(reverseData.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(datas.length / itemsPerPage));
      }, [itemOffset, itemsPerPage, datas]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % datas.length;
        setItemOffset(newOffset);
      };

	return(
		<div className='noticeWrap'>
            <div className='noticeMain'>
                <SearchBox />
                <div className='fontMain noticeListN'>
                    <p>
                        총 <span>{datas.length}</span>개의 게시글이 있습니다.
                    </p>
                </div>
                <div>
                    <ul className='noticeListT'>
                        <li className='notiNumber'>번호</li>
                        <li className='notiTitle'>제목</li>
                        <li className='notiWriter'>작성자</li>
                        <li className='notiDate'>작성일</li>
                        <li className='notiView'>조회수</li>
                    </ul>
                    {currentItems && currentItems.map((data)=>
                    <SubNoticeList key={data.id} {...data} />)}
                </div>
                {config.user===null ? "" : <div className='btnWrap'>
                    <GenericButton to="/notice/write">글쓰기</GenericButton>
                </div>}
            </div>
            <Paginate pageCount={pageCount} handlePageClick={handlePageClick}/>
		</div>
    )
}

export default SubNoticeMain;