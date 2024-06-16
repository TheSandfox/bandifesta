import { useContext } from 'react';
import { configContext } from "../../../App";
import { editContext, faqContext } from '../notice/SubNoticeFAQ';
import FAQInput from '../notice/FAQInput';
import GenericButton from '../../generic/GenericButton'

export default function PageFAQWrite({setPage}){
    const config = useContext(configContext);
	const {createWord} = useContext(editContext);

	const [{tit, txt}, onchange, reset] = FAQInput({
		tit: '',
        txt: ''
    });

    const createBtn = ()=>{
		if(window.confirm(`해당 내용을 문의 하시겠습니까?`)){
			createWord(tit, txt)
			reset()
			setPage('list')
		}
    }

	function backBtn(){
		if(window.confirm(`문의 작성을 취소 하시겠습니까?`)){
			setPage('list')
		}
	}

	return <>
		<h1 className=" myqnas fontTitle">FAQ 작성</h1>
		<ul className='PageQNAWriteInput'>
			<li>
				<label className='fontMain'>관리자</label>
				<input type='text' name='userID' value = {config.user.id} readOnly/>
			</li>
			<li>
				<label className='fontMain'>질문</label>
				<input type='text' name='tit' value={tit} onChange={onchange}/>
			</li>
			<li>
				<label className='fontMain'>내용</label>
				<textarea name='txt' value={txt} onChange={onchange}></textarea>
			</li>
		</ul>
		<div className="btnWrap">
			<GenericButton onClick={createBtn}>작성하기</GenericButton>
			<GenericButton onClick={backBtn}>취소하기</GenericButton>
		</div>
	</>
}