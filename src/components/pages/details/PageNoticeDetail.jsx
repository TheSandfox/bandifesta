import {useContext} from 'react';
import {Routes, Route, Link, useParams, useNavigate} from 'react-router-dom';
import {editContext, dataContext} from '../../../App';
import './PageNoticeDetail.css';

function PageNoticeDetail(){

    const datas = useContext(dataContext);

    let params = useParams();

    let data = params.id;

    const navigate = useNavigate();

    const {removeNotice} = useContext(editContext);

    function removeBtn(){
        if(window.confirm("해당 게시글을 삭제하시겠습니까?")){
            removeNotice(datas[data-1].id)
            navigate("/notice")
        }
    }

    return(
        <>
            <section key={datas[data-1].id} className='innerbox mainContent'>
                <article className='noticeDetail'>
                    <h2 className='fontTitle'>{datas[data-1].title}</h2>
                    <div>
                        <div className='fontMain detailTit'>작성자</div>
                        <div className='fontMain detailBox'>{datas[data-1].name}</div>
                    </div>
                    <div>
                        <div className='fontMain detailTit'>작성일</div>
                        <div className='fontMain detailBox'>{datas[data-1].createDate}</div>
                    </div>
                    <p className='fontMain'>{datas[data-1].content}</p>
                </article>
                <article className='noticeBtn'>
                    <button><Link to={`/notice/edit/${datas[data-1].id}`}>수정</Link></button>
                    <button onClick={removeBtn}>삭제</button>
                </article>
            </section>
        </>
    )
}

export default PageNoticeDetail;