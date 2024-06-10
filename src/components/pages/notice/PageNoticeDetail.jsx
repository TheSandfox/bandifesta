import './PageNoticeDetail.css';

function PageNoticeDetail(){
    return(
        <>
            <section className='innerbox mainContent'>
                <article className='noticeDetail'>
                    <h2 className='fontTitle'>질문글 제목</h2>
                    <div>
                        <div className='fontMain detailTit'>작성자</div>
                        <div className='fontMain detailBox'>관리자</div>
                    </div>
                    <div>
                        <div className='fontMain detailTit'>작성일</div>
                        <div className='fontMain detailBox'>2024-05-31 00:00:00</div>
                    </div>
                    <p className='fontMain'>내용</p>
                </article>
            </section>
        </>
    )
}

export default PageNoticeDetail;