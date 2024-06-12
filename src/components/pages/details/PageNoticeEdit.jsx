import {useState, useContext} from 'react';
import {editContext, dataContext} from '../../../App';
import {useParams, useNavigate} from 'react-router-dom';
import './PageNoticeEdit.css'

function PageNoticeEdit(){

    const datas = useContext(dataContext);

    let params = useParams();

    let data = params.noticeId;

    const navigate = useNavigate();

    const {editNotice} = useContext(editContext);
    const [update, setUpdate] = useState(true);
    const [editCont, setEditCont] = useState(datas[data-1].content);

    // function editBtn(){
    //     setUpdate(!update)
    // }

    function editChange(e){
        setEditCont(e.target.value)
    }

    function cancelBtn(){
        if(window.confirm("수정을 취소하시겠습니까?")){
            setUpdate(!update)
            navigate(`/notice/detail/${datas[data-1].id}`)
        }
    }

    function saveBtn(){
        // editBtn()
        editNotice(datas[data-1].id, editCont)
        setUpdate(!update)
        // navigate(`/notice/detail/${datas[data-1].id}`)
    }

    return(
        <section key={datas[data-1].id} className="innerbox mainContent noticeEdit">
            <article className='notiEditWrap'>
                <div className='notiEditBox'>
                    <h2 className='fontTitle'>공지 수정</h2>
                </div>
                <div className='notiEditBox'>
                    <label className='fontSubTitle editTit'>제목</label>
                    <input type="text" className='editBox' name="title" value={datas[data-1].title} readOnly />
                </div>
                <div className='notiEditBox'>
                    <label className='fontSubTitle editTit'>내용</label>
                    {update ? <textarea className='editBox' defaultValue={datas[data-1].content}></textarea> :
                    <textarea className='editBox' name='content' value={editCont} onChange={editChange}></textarea>}
                </div>
            </article>
            <article className='noticeBtn'>
                <button onClick={saveBtn}>저장</button>
                <button onClick={cancelBtn}>취소</button>
            </article>
        </section>
    )
}

export default PageNoticeEdit;