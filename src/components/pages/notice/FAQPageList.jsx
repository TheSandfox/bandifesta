import {useState} from 'react'

export default function FAQPageList({ currentItems }){

    // 아코디언 기능
    const [click, setClick] = useState(null);
    function scrollEvent(idx){
        setClick((click)=>click === idx ? null : idx)
    }
    
    return<>
        <ul className="faqLists">
            {currentItems && currentItems.map((data, idx)=>{return(
                <li>
                    <div className="faqListsQuestion" onClick={()=>scrollEvent(idx)}>
                        <div>
                            <img src="/bandifesta/assets/question.png" alt='question'/>
                            <p>{data.tit}</p>
                        </div>
                        <span><img src="/bandifesta/assets/arrowBlack.png" className={idx === click ? 'faqListsAnswerRotate': ''}/></span>
                    </div>
                    <div className={`faqListsAnswer${idx === click ? ' faqListsAnswerActive' : ''}`}>
                        <div>
                            <img src="/bandifesta/assets/answer.png" alt='answer'/>
                            <p>{data.txt}</p>
                        </div>
                    </div>
                </li>
            )})}
        </ul>
    </>
}