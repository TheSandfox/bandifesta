import { editContext } from '../my/SubMyQNA';
import { useContext } from 'react';
import { configContext } from "../../../App";
import QnaInput from '../my/myQnaInput';

import './PageQNAWrite.css'
import GenericButton from '../../generic/GenericButton'



export default function PageQNAWrite({setPage}) {

	const config = useContext(configContext);

	const [{title, text, time, userID}, onchange, reset] = QnaInput({
		title: '',
        text: '',
		time: '',
		userID: ''
    });

    const {createWord} = useContext(editContext);
	
    const createBtn = ()=>{
		if(window.confirm(`해당 내용을 문의 하시겠습니까?`)){
			createWord(title, text, time, userID)
			reset()
			}
		setPage(true)
    }

	function backBtn(){
		if(window.confirm(`이 페이지에서 나가시겠습니까?`)){
		}
	// setPage(true)
	}

	return <div className='PageQNAWrite'>
		<h1>문의 작성</h1>
		<ul className='PageQNAWriteInput'>
			<li>
				<label>아이디</label>
				<input type='text' name='userID' value = {config.user.id} readOnly/>
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