import {useContext} from 'react';
import {dataContext} from '../App';
import {Routes, Route, Link} from 'react-router-dom';
import SubNoticeList from './SubNoticeList';
import './SubNoticeMain.css';

function SubNoticeMain() {

    const datas = useContext(dataContext);

	return(
        <section className='innerbox mainContent noticeWrap'>
            <div className="noticeTab">
                <div className="fontSubTitle noticeTabTit">알려드립니다</div>
                <div className="noticeTabSub"><Link to="/notice/main">공지사항</Link></div>
                <div className="noticeTabSub"><Link to="/notice/faq">자주하는 질문</Link></div>
            </div>
            <div className='noticeMain'>
                <div className='searchWrap'></div>
                <p>총 <span>10</span>개의 게시글이 있습니다.</p>
                <div>
                    <ul className='noticeListT'>
                        <li className='notiNumber'>번호</li>
                        <li className='notiTitle'>제목</li>
                        <li className='notiWriter'>작성자</li>
                        <li className='notiDate'>작성일</li>
                        <li className='notiView'>조회수</li>
                    </ul>
                    {datas.map((data)=>
                    <SubNoticeList key={data.id} {...data} />)}
                </div>
                <button><Link to="/notice/write">글쓰기</Link></button>
            </div>
        </section>
    )
}

export default SubNoticeMain;