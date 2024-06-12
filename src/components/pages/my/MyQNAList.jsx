export default function MyQNAList({currentItems}){
    return <>
        <div className="MyQnaTable">
            <ul className="MyQnaTableTit">
                <li>답변여부</li>
                <li>제목</li>
                <li>작성일</li>
            </ul>
            {currentItems &&
                currentItems.map((item)=>{return(
                        <ul className="MyQnaTableTxt" key={item.idx}>
                            <li>답변완료</li>
                            <li><a href="#">{item.title}</a></li>
                            <li>{item.time}</li>
                        </ul>
            )})}
        </div>
    </>
}