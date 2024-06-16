import { useState, useContext } from 'react';
import { faqContext } from './SubNoticeFAQ';
import { configContext } from "../../../App";
import GenericButton from '../../generic/GenericButton';

export default function FAQPageList({ currentItems, setPages }){
    const config = useContext(configContext);
    const datas = useContext(faqContext);

    // 아코디언 기능
    const [click, setClick] = useState(null);
    function scrollEvent(idx){
        setClick((click)=>click === idx ? null : idx)
    }
    
    const [btn, setBtn] = useState(false);
    
    return<>
        <p className='faqTotal' key={datas.length}>총 <span>{datas.length}</span>개의 게시글이 있습니다.</p>
        <ul className="faqListsWrap">
            {currentItems && currentItems.map((data, idx)=>{return(
                <li className="faqLists">
                    <div className='faqListsQuestion' onClick={()=>scrollEvent(idx)}>
                        <div className="faqEach">
                            <span><img src="/bandifesta/assets/question.png" alt='question'/></span>
                            <div><p className='fontMain'>{data.tit}</p></div>
                            {btn ? 
                                <div className='btnWrap'>
                                    <GenericButton>수정</GenericButton>
                                    <GenericButton>삭제</GenericButton>
                                </div>
                                :
                                <span><img src="/bandifesta/assets/nextPage.png" className={idx === click ? 'AnswerRotate': ''}/></span>
                            }
                            
                        </div>
                    </div>
                    <div className={`faqListsAnswer ${idx === click ? 'faqListsAnswerActive' : ''}`}>
                        <div className="faqEach">
                            <span><img src="/bandifesta/assets/answer.png" alt='answer'/></span>
                            <div><p className='fontMain'>{data.txt}</p></div>
                        </div>
                    </div>
                </li>
            )})}
            {config.user == null ? null : 
                <div className='btnWrap'>
                    <GenericButton onClick={()=>setPages('write')}>글쓰기</GenericButton>
                    <GenericButton onClick={()=>setBtn(!btn)}>{btn ? '저장' : '수정'}</GenericButton>
                </div>
            }
        </ul>
    </>
}