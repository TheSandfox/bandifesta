import {Routes, Route, Link, useNavigate} from 'react-router-dom';
import './PageNoticeWrite.css'

function PageNoticeWrite(){

    return(
        <section className="innerbox mainContent noticeWrite">
            <article className='notiWriteWrap'>
                <div className='notiWriteBox'>
                    <h2 className='fontTitle'>공지 작성</h2>
                </div>
                <div className='notiWriteBox'>
                    <label className='fontSubTitle writeTit'>아이디</label>
                    <input type="text" className='writeBox' />
                </div>
                <div className='notiWriteBox'>
                    <label className='fontSubTitle writeTit'>제목</label>
                    <input type="text" className='writeBox' />
                </div>
                <div className='notiWriteBox'>
                    <label className='fontSubTitle writeTit'>내용</label>
                    <textarea className='writeBox'></textarea>
                </div>
                <div>
                    <button>작성하기</button>
                    <button><Link to="/notice/main">취소하기</Link></button>
                </div>
            </article>
        </section>
    )
}

export default PageNoticeWrite;