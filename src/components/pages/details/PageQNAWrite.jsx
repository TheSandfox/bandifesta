import { useContext } from 'react';
import { configContext } from "../../../App";
import { memoContext, qnaContext } from '../my/SubMyQNA';
import QnaInput from '../my/myQnaInput';
import GenericButton from '../../generic/GenericButton'

export default function PageQNAWrite({setPage}) {
	const config = useContext(configContext);
	const datas = useContext(qnaContext);
	const {createWord} = useContext(memoContext);

	const [{title, text}, onchange, reset] = QnaInput({
		title: '',
        text: ''
    });

    const createBtn = ()=>{
		if(window.confirm(`해당 내용을 문의 하시겠습니까?`)){
			createWord(title, text)
			reset()
			setPage('list')
		}
    }

	function backBtn(){
		if(window.confirm(`문의 작성을 취소 하시겠습니까?`)){
			setPage('list')
		}
	}
	
	const today = new Date();
	const year = today.getFullYear();
	const month = (today.getMonth()+1).toString().padStart(2, '0');
	const day = today.getDate().toString().padStart(2, '0');
	const createDate = year + '-' + month + '-' + day;


	return <div className='PageQNAWrite'>
		<h1>문의 작성</h1>
		<div>
			<p>궁금한 사항을 문의해 주세요. 최대한 빠른 시일 내에 친절하게 답변드리겠습니다.</p>
			<span>(가입하신 카카오톡 아이디로 답변을 드리며, 평일 운영시간에 순차적으로 답변됩니다.)</span>
		</div>
		<ul className='PageQNAWriteInput'>
			<li>
				<label>아이디</label>
				<input type='text' name='userID' value = {config.user.id} readOnly/>
			</li>
			<li>
				<label>날짜</label>
				<input type='text' name='time' value ={createDate}/>
			</li>
			<li>
				<label>제목</label>
				<input type='text' name='title' value={title} onChange={onchange}/>
			</li>
			<li>
				<label>내용</label>
				<textarea name='text' value={text} onChange={onchange}></textarea>
			</li>
		</ul>
		<div className="MyQnaWriteBtn">
			<GenericButton onClick={createBtn}>작성하기</GenericButton>
			<GenericButton onClick={backBtn}>취소하기</GenericButton>
		</div>
	</div>
}