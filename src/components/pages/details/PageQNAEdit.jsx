import GenericButton from '../../generic/GenericButton'

export default function PageQNAEdit({}) {
	return <>
		<ul className="MyQNADetail">
			<li className="MyQNADetailTit">
				<input type='text' placeholder={det.title} value={editTitle} onChange={editChangeTit}/>
			</li>
			<li className="MyQNADetailUser">
				<div>작성자</div>
				<input type='text' placeholder={det.userID} readOnly />
			</li>
			<li className="MyQNADetailUser">
				<div>작성일</div>
				<input type='text' placeholder={det.time} readOnly/>
			</li>
			<li className="MyQNADetailCont">
				<textarea placeholder={det.text} value={editCont} onChange={editChangeTxt}></textarea>
			</li>
		</ul>
		<div className="MyQnaWriteBtn">
			<GenericButton onClick={saveBtn}>수정완료</GenericButton>
			<GenericButton onClick={editBtn}>수정취소</GenericButton>
		</div>
	</>
}