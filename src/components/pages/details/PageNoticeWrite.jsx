import { useContext } from 'react';
import {Routes, Route, Link, useNavigate} from 'react-router-dom';
import {editContext} from '../../../App';
import GenericButton from '../../generic/GenericButton';
import DataInput from './PageNoticeDataInput';
import './PageNoticeWrite.css'

function PageNoticeWrite(){

    const navigate = useNavigate();

    const [{name, content, title}, onchange, reset] = DataInput({
        name: "관리자",
        content: "",
        title: ""
    })

    const {createNotice} = useContext(editContext);

    const createBtn = ()=>{
        createNotice(name, title, content)
        reset()
        navigate("/notice/main")
    }

    return(
        <section className="innerbox mainContent noticeWrite">
            <article className='notiWriteWrap'>
                <div className='notiWriteBox'>
                    <h2 className='fontTitle'>공지 작성</h2>
                </div>
                <div className='notiWriteBox'>
                    <label className='fontSubTitle writeTit'>작성자</label>
                    <input type="text" className='writeBox' name="name" value={name} onChange={onchange} />
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
                <GenericButton onClick={createBtn}>작성하기</GenericButton>
                <GenericButton to="/notice/main">취소하기</GenericButton>
            </article>
        </section>
    )
}

export default PageNoticeWrite;