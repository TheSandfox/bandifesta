import { useState } from "react";
import PageQNADetail from "../details/PageQNADetail";
import GenericButton from '../../generic/GenericButton'

export default function MyQNAList({currentItems, datas, leng, setPage}){
    let [detail, setDetail] = useState(true);
    let [refs, setRefs] = useState();
    
    const detailOne = (idx) => {
        setRefs(idx);
        setDetail(false)
    };

    return <div className="MyQnaRight">
        <h1>1:1 문의 내역</h1>
        {detail ? 
            <div className="MyQna">
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
                    <GenericButton onClick={()=>setPage(false)}>글쓰기</GenericButton>
                </div>
            </div>
        :
        <PageQNADetail datas={datas} setDetail={setDetail} refs={refs}/>
        }
    </div>
}