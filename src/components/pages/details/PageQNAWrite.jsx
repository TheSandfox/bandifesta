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
	
	const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    const createDate = year + '-' + month + '-' + day;
	
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

	return <div className='innerbox mainContent writeWrap'>
		<h2 className='fontTitle'>문의 작성</h2>
		<div className='writeBox'>
			<div>
				<label className='fontSubTitle'>아이디</label>
				<input type="text" name='userId' value={config.user.id} readOnly />
			</div>
			<div>
				<label className='fontSubTitle'>날짜</label>
				<input type="text" name='createDate' value={createDate} />
			</div>
			<div>
				<label className='fontSubTitle'>제목</label>
				<input type="text" name='title' value={title} onChange={onchange} />
			</div>
			<div>
				<label className='fontSubTitle'>내용</label>
				<textarea name="text" value={text} onChange={onchange}></textarea>
			</div>
		</div>
		<div className='btnWrap'>
			<GenericButton onClick={createBtn}>작성하기</GenericButton>
			<GenericButton onClick={backBtn}>취소하기</GenericButton>
		</div>
	</div>
}