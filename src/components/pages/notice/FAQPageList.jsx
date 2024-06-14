import {useState} from 'react'

export default function FAQPageList({ currentItems }){

    // 아코디언 기능
    const [click, setClick] = useState(null);
    function scrollEvent(idx){
        setClick((click)=>click === idx ? null : idx)
    }
    
    return<>
        <ul className="faqListsWrap">
            {currentItems && currentItems.map((data, idx)=>{return(
                <li className="faqLists">
                    <div className='faqListsQuestion' onClick={()=>scrollEvent(idx)}>
                        <div className="faqEach">
                            <span><img src="/bandifesta/assets/question.png" alt='question'/></span>
                            <div><p className='fontMain'>{data.tit}</p></div>
                            <span><img src="/bandifesta/assets/nextPage.png" className={idx === click ? 'AnswerRotate': ''}/></span>
                        </div>
                    </div>
                    <div className={`faqListsAnswer${idx === click ? ' faqListsAnswerActive' : ''}`}>
                        <div className="faqEach">
                            <span><img src="/bandifesta/assets/answer.png" alt='answer'/></span>
                            <div><p className='fontMain'>{data.txt}</p></div>
                        </div>
                    </div>
                </li>
            )})}
        </ul>
    </>
}