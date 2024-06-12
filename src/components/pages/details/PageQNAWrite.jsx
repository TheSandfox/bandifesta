import { editContext } from '../my/SubMyQNA';
import { useContext } from 'react';
import { configContext } from "../../../App";
import QnaInput from '../my/myQnaInput';

import './PageQNAWrite.css'
import GenericButton from '../../generic/GenericButton'



export default function PageQNAWrite({}) {

	const config = useContext(configContext);

	const [{title, text, time}, onchange, reset] = QnaInput({
        title: '',
        text: '',
        time: ''
    });

    const {createWord} = useContext(editContext);
	
    const createBtn = ()=>{
        createWord(userID, title, text, time)
        reset()
    }

	return <div className='PageQNAWrite'>
		<h1>문의 작성</h1>
		<ul className='PageQNAWriteInput'>
			<li>
				<label>아이디</label>
				<input type='text' value = {config.user.id} />
			</li>
			<li>
				<label>제목</label>
				{/* <input type='text' name='title' value={title} onchange={onchange}/> */}
			</li>
			<li>
				<label>내용</label>
				{/* <textarea name='text' value={text} onChange={onchange}></textarea> */}
			</li>
		</ul>
		<div className="MyQnaWriteBtn">
			<GenericButton to="/" onClick={createBtn}>작성하기</GenericButton>
			<GenericButton to="/">취소하기</GenericButton>
		</div>
	</div>
}