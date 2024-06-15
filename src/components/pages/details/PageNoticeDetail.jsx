import {useContext} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {editContext, dataContext, configContext} from '../../../App';
import GenericButton from '../../generic/GenericButton';
import TopBanner from '../../generic/TopBanner';
import './PageNoticeDetail.css';

function PageNoticeDetail(){

    const datas = useContext(dataContext);
    const config = useContext(configContext);

    let params = useParams();

    let data = params.noticeId;

    const navigate = useNavigate();

    const {removeNotice} = useContext(editContext);

    function removeBtn(){
        if(window.confirm("해당 게시글을 삭제하시겠습니까?")){
            removeNotice(datas[data-1].id)
            navigate("/notice/main")
        }
    }

    return(
        <>
            <TopBanner>알려드립니다</TopBanner>
            <section key={datas[data-1].id} className='innerbox mainContent'>
                <article className='noticeDetail'>
                    <h2>{datas[data-1].title}</h2>
                    <div>
                        <div className='fontMain detailTit'>작성자</div>
                        <div className='fontMain detailBox'>관리자</div>
                    </div>
                    <div>
                        <div className='fontMain detailTit'>작성일</div>
                        <div className='fontMain detailBox'>{datas[data-1].createDate}</div>
                    </div>
                    <p className='fontMain'>{datas[data-1].content}</p>
                </article>
                <article className='noticeBtn'>
                    <GenericButton to="/notice/main">목록</GenericButton>
                    {config.user===null ? "" : <>
                    <GenericButton to={`/notice/edit/${datas[data-1].id}`}>수정</GenericButton>
                    <GenericButton onClick={removeBtn}>삭제</GenericButton> </>}
                </article>
            </section>
        </>
    )
}

export default PageNoticeDetail;