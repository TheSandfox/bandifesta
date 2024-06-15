import { useContext } from "react";
import { memoContext } from '../my/SubMyQNA';
import GenericButton from '../../generic/GenericButton'

export default function PageQNADetail({setPage, click}) {
	
	const {removeWord} = useContext(memoContext);

    function removeBtn(){
        if(window.confirm(`문의 내용을 정말 삭제하시겠습니까?`)){
            removeWord(click.idx)
			setPage('list')
        }
    }
	
	return <>
		<ul className="MyQNADetail">
			<li className="MyQNADetailTit">
				<h2>{click.title}</h2>
			</li>
			<li className="MyQNADetailUser">
				<h3>작성자</h3>
				<p>{click.userID}</p>
			</li>
			<li className="MyQNADetailUser">
				<h3>작성일</h3>
				<p>{click.time}</p>
			</li>
			<li className="MyQNADetailCont">
				<p>{click.text}</p>
			</li>
		</ul>
		<div className="MyQnaWriteBtn">
			<GenericButton onClick={()=>setPage('list')}>목록</GenericButton>
			<GenericButton onClick={()=>setPage('edit')}>수정</GenericButton>
			<GenericButton onClick={removeBtn}>삭제</GenericButton>
		</div>
	</>
}
