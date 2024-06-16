import { useState, useContext, useEffect } from 'react';
import { memoContext } from '../my/SubMyQNA';
import GenericButton from '../../generic/GenericButton'

export default function PageQNAEdit({setPage, click}) {
	const {editWord} = useContext(memoContext);

	const [editTitle, setEditTitle] = useState(click.title);
	const [editCont, setEditCont] = useState(click.text);
	
	// 수정
    function editChangeTit(e){
        setEditTitle(e.target.value)
    }
    function editChangeTxt(e){
        setEditCont(e.target.value)
    }

	// 저장 버튼
    function saveBtn(){
        if(window.confirm(`문의 내용을 수정하시겠습니까?`)){
			editWord(click.idx, editTitle, editCont)
			setPage('detail')
		}
    }
	// 취소 버튼
	function cancelBtn(){
		if(window.confirm('문의 내용 수정을 취소하시겠습니까?')){
			setPage('list')
		}
	}
	return <>
		<h1 className=" myqnas fontTitle">문의 수정</h1>
		<ul className='PageQNAWriteInput'>
			<li>
				<label className='fontMain'>아이디</label>
				<input type='text' placeholder={click.userID} readOnly />
			</li>
			<li>
				<label className='fontMain'>날짜</label>
				<input type='text' placeholder={click.time} readOnly/>
			</li>
			<li>
				<label className='fontMain'>제목</label>
				<input type='text' placeholder={click.title} value={editTitle} onChange={editChangeTit}/>
			</li>
			<li>
				<label className='fontMain'>내용</label>
				<textarea placeholder={click.text} value={editCont} onChange={editChangeTxt}></textarea>
			</li>
		</ul>
		<div className="btnWrap">
			<GenericButton onClick={saveBtn}>수정완료</GenericButton>
			<GenericButton onClick={cancelBtn}>수정취소</GenericButton>
		</div>
	</>
}