import './PageQNAWrite.css'
import GenericButton from '../../generic/GenericButton'
import axios from 'axios';
// import {onChangeFunc} from '../my/SubMyQNA'


export default function PageQNAWrite({}) {

	const [title, setTitle] = useState("");

	const handleSubmit = (event) => {
	  event.preventDefault();
  
	  const newData = {
		title,
	  };
  
	  axios
		.post("http://localhost:3012/data", newData)
		.then((response) => {
		  console.log(response);
		  setTitle("");
		})
		.catch((error) => {
		  console.log(error);
		});
	};
	// useEffect(() => {
	// 	axios.get('http://localhost:3012/data', { method: "PUT", idx : idx,
	// 		title : title,
	// 		text : text,
	// 		createTime : createTime,
	// 		userID : userID})
	// 	.then(response => {
	// 	  setData(response.data);
	// 	})
	// 	// .catch(error => {
	// 	//   console.error('There was an error fetching the data!', error);
	// 	// });
	// 	}, []);

	return <div className='PageQNAWrite'>
		<h1>문의 작성</h1>
		<ul className='PageQNAWriteInput' onSubmit={handleSubmit}>
			<li>
				<label>아이디</label>
				<input type='text'value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
			</li>
			<li>
				<label>제목</label>
				<input type='text'/>
			</li>
			<li>
				<label>내용</label>
				<textarea/>
			</li>
		</ul>
		<div className="MyQnaWriteBtn">
			<GenericButton to="/">작성하기</GenericButton>
			<GenericButton to="/">취소하기</GenericButton>
		</div>
	</div>
}