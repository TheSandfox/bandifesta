import {useState, useRef} from 'react'
// import './faq.css'

function Faqs(){
    let datas = [
        {
            id : 1,
            tit : '문의사항 Q1',
            txt : '답변내역 A1'
        },{
            id : 2,
            tit : '문의사항 Q2',
            txt : '답변내역 A2'
        },{
            id : 3,
            tit : '문의사항 Q3',
            txt : '답변내역 A3'
        }
    ]

    let ques = useRef();
    let answ = useRef();
    const [state, setState] = useState(false);


    function scrollEvent(e){
        if(state == false){
            answ.current.style.display = 'none'
            setState(true)
        }else{
            answ.current.style.display = 'flex'
            setState(false)
        }
        // console.log(ques.current)
    }

    return(
        <ul className="faqLists">
            {datas.map((data)=>{return(
                <li>
                    <div className="faqListsQuestion" ref={ques} onClick={scrollEvent}>
                        <div>
                            <img src="assets/question.png"/>
                            <p>{data.tit}</p>
                        </div>
                        <span><img src="assets/arrowBlack.png"/></span>
                    </div>
                    <div className="faqListsAnswer" ref={answ}>
                        <img src="assets/answer.png"/>
                        <p>{data.txt}</p>
                    </div>
                </li>
            )})}
        </ul> 
    )
}


export default function SubNoticeFAQ({}) {
	return <>
		<div className="faqWrap">
			{/* search */}
			<div className="noticeSearch">
				<h1>원하시는 내용을 검색해 보세요.</h1>
				<div className="noticeSearchBar">
					<input placeholder="검색어를 입력해 주세요."/>
					<button><img src="assets/glass_search.png"/></button>
				</div>
			</div>
			{/* contents */}
			<Faqs/>
			<p>페이지네이션 들어갈 자리</p>
		</div>
	</>
}