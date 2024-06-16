import { useState, useContext } from 'react';
import { editContext, dataContext, configContext } from '../../../App';
import { useParams, useNavigate } from 'react-router-dom';
import GenericButton from '../../generic/GenericButton';
import './PageNoticeEdit.css'

function PageNoticeEdit() {

    const datas = useContext(dataContext);
    const config = useContext(configContext);

    let params = useParams();

    let data = params.noticeId;

    const navigate = useNavigate();

    const { editNotice } = useContext(editContext);
    const [update, setUpdate] = useState(false);
    const [editCont, setEditCont] = useState(datas[data - 1].content);

    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    const createDate = year + '-' + month + '-' + day;

    function editChange(e) {
        setEditCont(e.target.value)
    }

    function cancelBtn() {
        if (window.confirm("수정을 취소하시겠습니까?")) {
            setUpdate(!update)
            navigate(`/notice/detail/${datas[data - 1].id}`)
        }
    }

    function saveBtn() {
        editNotice(datas[data - 1].id, editCont)
        setUpdate(!update)
        navigate(`/notice/detail/${datas[data - 1].id}`)
    }

    return (
        <div key={datas[data - 1].id} className='innerbox mainContent writeWrap'>
            <h2 className='fontTitle'>공지 수정</h2>
            <div className='writeBox'>
                <div>
                    <label className='fontSubTitle'>작성자</label>
                    <input type="text" name='name' value={config.user.id} readOnly />
                </div>
                <div>
                    <label className='fontSubTitle'>날짜</label>
                    <input type="text" name='createDate' value={createDate} readOnly />
                </div>
                <div>
                    <label className='fontSubTitle'>제목</label>
                    <input type="text" name='title' value={datas[data-1].title} readOnly />
                </div>
                <div>
                    <label className='fontSubTitle'>내용</label>
                    {update ? <textarea defaultValue={datas[data-1].content}></textarea> :
                    <textarea name='content' value={editCont} onChange={editChange}></textarea>}
                </div>
            </div>
            <div className='btnWrap'>
                <GenericButton onClick={saveBtn}>저장</GenericButton>
                <GenericButton onClick={cancelBtn}>취소</GenericButton>
            </div>
        </div>
    )
}

export default PageNoticeEdit;