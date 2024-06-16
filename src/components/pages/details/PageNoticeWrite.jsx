import { useContext } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { editContext, configContext } from '../../../App';
import GenericButton from '../../generic/GenericButton';
import DataInput from './PageNoticeDataInput';
import './PageNoticeWrite.css'

function PageNoticeWrite() {

    const navigate = useNavigate();

    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    const createDate = year + '-' + month + '-' + day;

    const [{ name, content, title }, onchange, reset] = DataInput({
        name: "관리자",
        content: "",
        title: ""
    })

    const { createNotice } = useContext(editContext);

    const createBtn = () => {
        createNotice(name, title, content)
        reset()
        navigate("/notice/main")
    }

    return (
        <div className='innerbox mainContent writeWrap'>
            <h2 className='fontTitle'>공지 작성</h2>
            <div className='writeBox'>
                <div>
                    <label className='fontSubTitle'>작성자</label>
                    <input type="text" name='name' value={name} readOnly />
                </div>
                <div>
                    <label className='fontSubTitle'>날짜</label>
                    <input type="text" name='createDate' value={createDate} readOnly />
                </div>
                <div>
                    <label className='fontSubTitle'>제목</label>
                    <input type="text" name='title' value={title} onChange={onchange} />
                </div>
                <div>
                    <label className='fontSubTitle'>내용</label>
                    <textarea type="text" name='content' value={content} onChange={onchange}></textarea>
                </div>
            </div>
            <div className='btnWrap'>
                <GenericButton onClick={createBtn}>작성하기</GenericButton>
                <GenericButton to="/notice/main">취소하기</GenericButton>
            </div>
        </div>
    )
}

export default PageNoticeWrite;