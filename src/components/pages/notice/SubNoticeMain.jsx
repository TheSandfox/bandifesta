import {Routes, Route, Link} from 'react-router-dom';
import SubNoticeList from './SubNoticeList';
import './SubNoticeMain.css';
import { useEffect } from 'react';

function SubNoticeMain({handleTabState,index}) {
	useEffect(()=>{
		handleTabState.set(index);
	},[]);
	return(
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
				{/* {datas.map((data)=>
				<SubNoticeList key={data.id} {...data} />)} */}
			</div>
			<button><Link to="/notice/write">글쓰기</Link></button>
		</div>
    )
}

export default SubNoticeMain;