import GenericButton from '../../generic/GenericButton'

export default function MyQNAList({ setPage, currentItems, setIdxs, leng, answer, click}){

    const detailOne = (idx) => {
        setIdxs(idx);
        setPage('detail')
    };

    const answerClass = (item)=>{
        return answer === item.idx ? 'ansComplete' : 'ansReady'
    }
    const answered = (item)=>{
        return answer === item.idx ? '답변 완료' : '접수 완료'
    }

    return <>
        <h1 className=" myqnas fontTitle">1:1 문의내역</h1>
        <p className='qnaTotal fontMain'>총 <span>{leng}</span>개의 게시글이 있습니다.</p>
        <div className="MyQnaTable">
            <ul className="MyQnaTableTit fontMain">
                <li>접수 번호</li>
                <li>답변 여부</li>
                <li>문의 제목</li>
                <li>문의 날짜</li>
                <li></li>
            </ul>
            {currentItems &&
                currentItems.map((item)=>{return(
                    <ul className="MyQnaTableTxt" key={item.idx} onClick={() => detailOne(item.idx)}>
                        <li>{item.idx}</li>
                        <li><p className={answerClass(item)}>{answered(item)}</p></li>
                        <li>{item.title}</li>
                        <li>{item.time}</li>
                        <li><img className='notiArrow' src="/bandifesta/assets/arrowGrey.png"/></li>
                    </ul>
            )})}
        </div>
        <div className="btnWrap">
            <GenericButton onClick={()=>setPage('write')}>글쓰기</GenericButton>
        </div>
    </>
}