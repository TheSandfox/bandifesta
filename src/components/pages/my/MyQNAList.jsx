import GenericButton from '../../generic/GenericButton'

export default function MyQNAList({ setPage, currentItems, setIdxs, leng}){

    const detailOne = (idx) => {
        setIdxs(idx);
        setPage('detail')
    };

    return <>
        <p>총 <span>{leng}</span>개의 게시글이 있습니다.</p>
        <div className="MyQnaTable">
            <ul className="MyQnaTableTit">
                <li>답변여부</li>
                <li>제목</li>
                <li>작성일</li>
            </ul>
            {currentItems &&
                currentItems.map((item)=>{return(
                    <ul className="MyQnaTableTxt" key={item.idx} onClick={() => detailOne(item.idx)}>
                        <li>답변완료</li>
                        <li>{item.title}</li>
                        <li>{item.time}</li>
                    </ul>
            )})}
        </div>
        <div className="MyQnaWriteBtn">
            <GenericButton onClick={()=>setPage('write')}>글쓰기</GenericButton>
        </div>
    </>
}