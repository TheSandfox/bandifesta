import { useContext } from "react";
import { memoContext } from '../my/SubMyQNA';
import { configContext } from "../../../App";
import GenericButton from '../../generic/GenericButton'

export default function PageQNADetail({setPage, click, setAnswer}) {
	
	const config = useContext(configContext);
	const {removeWord} = useContext(memoContext);

    function removeBtn(){
        if(window.confirm(`문의 내용을 정말 삭제하시겠습니까?`)){
            removeWord(click.idx)
			setPage('list')
        }
    }

	function ans(){
		setAnswer(click.idx)
		setPage('list')
	}
	
	return <>
		<h1 className=" myqnas qnasdisplay fontTitle">1:1 문의내역</h1>
		<ul className="MyQNADetail">
			<li className="MyQNADetailTit fontMain">
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
		<div className="btnWrap">
			<GenericButton onClick={()=>setPage('list')}>목록</GenericButton>
			<GenericButton onClick={()=>setPage('edit')}>수정</GenericButton>
			<GenericButton onClick={removeBtn}>삭제</GenericButton>
			{config.user == null ? null : <GenericButton onClick={ans}>답변 완료</GenericButton>}
		</div>
	</>
}