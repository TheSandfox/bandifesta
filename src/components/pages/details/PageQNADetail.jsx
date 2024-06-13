import GenericButton from '../../generic/GenericButton'
import { useContext, useState, useEffect } from "react";
import { editContext } from '../my/SubMyQNA';

export default function PageQNADetail({datas, setDetail, refs}) {

	
	const [det, setDet] = useState([]);
	const {removeWord, editWord} = useContext(editContext);
    const [update, setUpdate] = useState(true);
	const [editTitle, setEditTitle] = useState(det.title);
	const [editCont, setEditCont] = useState(det.text);

	useEffect(()=>{
		const filterDetail = datas.filter((data) => Number(data.idx) === Number(refs));
		const detailMAp = filterDetail.map((data) => setDet(data));
	},[])

   // 삭제 
    function removeBtn(){
        if(window.confirm(`문의 내용을 정말 삭제하시겠습니까?`)){
            removeWord(det.idx)
			setDetail(true)
        }
    }

	// 페이지 변경
	function editPageBtn(){       
        setUpdate(!update)
    }
	function editBtn(){  
		if(window.confirm(`문의 내용 수정을 취소하시겠습니까?`)){
			setUpdate(!update)
			setUpdate(true)
		}     
        
    }
	
	// 수정 - 값 변경
    function editChangeTit(e){
        setEditTitle(e.target.value)
    }
    function editChangeTxt(e){
        setEditCont(e.target.value)
    }

	// 저장
    function saveBtn(){
        if(window.confirm(`문의 내용을 수정하시겠습니까?`)){
			editWord(det.idx, editTitle, editCont)
			editBtn()
			setDetail(true) 
		}
    }
	
	return (
		<>
			<div>
				{update ?
					<ul className="MyQNADetail">
						<li className="MyQNADetailTit">
							<p>{det.title}</p>
						</li>
						<li className="MyQNADetailUser">
							<div>작성자</div>
							<p>{det.userID}</p>
						</li>
						<li className="MyQNADetailUser">
							<div>작성일</div>
							<p>{det.time}</p>
						</li>
						<li className="MyQNADetailCont">
							<p>{det.text}</p>
						</li>
					</ul>
					:
					<ul className="MyQNADetail">
						<li className="MyQNADetailTit">
							<input type='text' placeholder={det.title} value={editTitle} onChange={editChangeTit}/>
						</li>
						<li className="MyQNADetailUser">
							<div>작성자</div>
							<input type='text' placeholder={det.userID} />
						</li>
						<li className="MyQNADetailUser">
							<div>작성일</div>
							<input type='text' placeholder={det.time}/>
						</li>
						<li className="MyQNADetailCont">
							<textarea placeholder={det.text} value={editCont} onChange={editChangeTxt}></textarea>
						</li>
					</ul>
				}
				{update ?
					<div className="MyQnaWriteBtn">
						<GenericButton onClick={editPageBtn}>수정</GenericButton>
						<GenericButton onClick={removeBtn}>삭제</GenericButton>
					</div>
				:
				<div className="MyQnaWriteBtn">
					<GenericButton onClick={saveBtn}>수정완료</GenericButton>
					<GenericButton onClick={editBtn}>수정취소</GenericButton>
				</div>
				}
			</div>
		</>
	)
}
