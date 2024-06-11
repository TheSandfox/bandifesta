import { useContext } from 'react';
import {Routes, Route, Link, useNavigate} from 'react-router-dom';
import {editContext} from '../../../App';
import DataInput from './PageNoticeDataInput';
import './PageNoticeWrite.css'

function PageNoticeWrite(){

    const navigate = useNavigate();

    const [{content, title}, onchange, reset] = DataInput({
        content: "",
        title: ""
    })

    const {createNotice} = useContext(editContext);

    const createBtn = ()=>{
        createNotice(title, content)
        reset()
        navigate("/notice")
    }

    return(
        <section className="innerbox mainContent noticeWrite">
            <article className='notiWriteWrap'>
                <div className='notiWriteBox'>
                    <h2 className='fontTitle'>공지 작성</h2>
                </div>
                <div className='notiWriteBox'>
                    <label className='fontSubTitle writeTit'>제목</label>
                    <input type="text" className='writeBox' name="title" value={title} onChange={onchange} />
                </div>
                <div className='notiWriteBox'>
                    <label className='fontSubTitle writeTit'>내용</label>
                    <textarea className='writeBox' name="content" value={content} onChange={onchange}></textarea>
                </div>
            </article>
            <article className='noticeBtn'>
                <button onClick={createBtn}>작성하기</button>
                <button><Link to="/notice">취소하기</Link></button>
            </article>
        </section>
    )
}

export default PageNoticeWrite;