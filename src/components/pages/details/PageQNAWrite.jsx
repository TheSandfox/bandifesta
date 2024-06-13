import { editContext, qnaContext } from '../my/SubMyQNA';
import { useContext, useState, useEffect } from 'react';
import { configContext } from "../../../App";
import QnaInput from '../my/myQnaInput';
import GenericButton from '../../generic/GenericButton'



export default function PageQNAWrite({setPage}) {
	const config = useContext(configContext);

	const [{title, text}, onchange, reset] = QnaInput({
		title: '',
        text: ''
    });

    const {createWord} = useContext(editContext);
    const {datas} = useContext(qnaContext);
	
		
    const createBtn = ()=>{
		if(window.confirm(`해당 내용을 문의 하시겠습니까?`)){
			createWord(title, text)
			reset()
			setPage(true)
		}
    }

	function backBtn(){
		if(window.confirm(`문의 작성을 취소 하시겠습니까?`)){
			setPage(true)
		}
	}

	return <div className='PageQNAWrite'>
		<h1>문의 작성</h1>
		<ul className='PageQNAWriteInput'>
			<li>
				<label>아이디</label>
				<input type='text' name='userID' value = {config.user.id} readOnly/>
			</li>
			<li>
				<label>날짜</label>
				<input type='text' name='userID' value ="2024-06-11"/>
			</li>
			<li>
				<label>제목</label>
				<input type='text' name='title' value={title} onChange={onchange}/>
			</li>
			<li>
				<label>내용</label>
				<textarea name='text' value={text} onChange={onchange}></textarea>
				{console.log(text)}
			</li>
		</ul>
		<div className="MyQnaWriteBtn">
			<GenericButton onClick={createBtn}>작성하기</GenericButton>
			<GenericButton onClick={backBtn}>취소하기</GenericButton>
		</div>
	</div>
}