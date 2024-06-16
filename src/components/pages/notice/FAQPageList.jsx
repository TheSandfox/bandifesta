import { useState, useContext } from 'react';
import { faqContext } from './SubNoticeFAQ' ;
import { editContext } from './SubNoticeFAQ' ;
import { configContext } from "../../../App";
import GenericButton from '../../generic/GenericButton';

export default function FAQPageList({currentItems}){
    const datas = useContext(faqContext);

    // 아코디언 기능
    const [ans, setAns] = useState(null);
    function scrollEvent(idx){
        setAns((ans)=>ans === idx ? null : idx)
    }

    
    return<>
        <p className='faqTotal' key={datas.length}>총 <span>{datas.length}</span>개의 게시글이 있습니다.</p>
        <ul className="faqListsWrap">
            {currentItems && currentItems.map((item, idx)=>{return(
                <li className="faqLists" key={item.idx}>
                    <div className='faqListsQuestion' onClick={()=>scrollEvent(idx)}>
                        <div className="faqEach">
                            <span><img src="/bandifesta/assets/question.png" alt='question'/></span>
                            <div><p className='fontMain'>{item.tit}</p></div>
                            <span><img src="/bandifesta/assets/nextPage.png" className={idx === ans ? 'AnswerRotate': ''}/></span>
                        </div>
                    </div>
                    <div className={`faqListsAnswer ${idx === ans ? 'faqListsAnswerActive' : ''}`}>
                        <div className="faqEach">
                            <span><img src="/bandifesta/assets/answer.png" alt='answer'/></span>
                            <div><p className='fontMain'>{item.txt}</p></div>
                        </div>
                    </div>
                </li>
            )})}
        </ul>
    </>
}