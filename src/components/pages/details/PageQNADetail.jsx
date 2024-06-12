import GenericButton from '../../generic/GenericButton'

export default function PageQNADetail({tit, user_id, create_time, txt}) {
	return <>
		<div>
			<table className="MyQNADetail">
				<tr className="MyQNADetailTit">
					<th>{tit}ddd</th>
				</tr>
				<tr className="MyQNADetailUser">
					<th>작성자</th>
					<td>{user_id}dd</td>
				</tr>
				<tr className="MyQNADetailUser">
					<th>작성일</th>
					<td>{create_time}dd</td>
				</tr>
				<tr className="MyQNADetailCont">
					<td>{txt}dd</td>
				</tr>
			</table>
			<div className="MyQnaWriteBtn">
				<GenericButton>수정</GenericButton>
				<GenericButton>삭제</GenericButton>
				<GenericButton>답변</GenericButton>
			</div>
		</div>
	</>
}