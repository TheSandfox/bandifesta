import { useState, useContext } from 'react';
import { faqContext } from './SubNoticeFAQ' ;
import { editContext } from './SubNoticeFAQ' ;
import { configContext } from "../../../App";
import GenericButton from '../../generic/GenericButton';

export default function FAQPageList({ setPage, currentItems, setIdxs, leng, answer, click, setAnswer}){
    // const config = useContext(configContext);
    const datas = useContext(faqContext);
    // const {removeWord} = useContext(editContext);

    // 아코디언 기능
    const [ans, setAns] = useState(null);
    function scrollEvent(idx){
        setAns((ans)=>ans === idx ? null : idx)
    }
    
    // const [btn, setBtn] = useState(false);

    const detailOne = (idx) => {
        setIdxs(idx);
    };

    // function removeBtn(){
    //     if(window.confirm(`문의 내용을 정말 삭제하시겠습니까?`)){
    //         removeWord(click.idx)
	// 		// setBtn(true)
    //     }
    // }
    
    return<>
        <p className='faqTotal' key={datas.length}>총 <span>{datas.length}</span>개의 게시글이 있습니다.</p>
        <ul className="faqListsWrap">
            {currentItems && currentItems.map((item, idx)=>{return(
                <li className="faqLists" key={item.idx} onClick={()=>detailOne(item.idx)}>
                    <div className='faqListsQuestion' onClick={()=>scrollEvent(idx)}>
                        <div className="faqEach">
                            <span><img src="/bandifesta/assets/question.png" alt='question'/></span>
                            <div><p className='fontMain'>{item.tit}</p></div>
                            {/* {btn ? 
                                <div className='btnWrap'>
                                    <GenericButton onClick={()=>setPage('edit')}>수정</GenericButton>
                                    <GenericButton  onClick={removeBtn}>삭제</GenericButton>
                                </div>
                                : */}
                                <span><img src="/bandifesta/assets/nextPage.png" className={idx === ans ? 'AnswerRotate': ''}/></span>
                            {/* } */}
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
        {/* {config.user == null ? null : 
            <div className='btnWrap'>
                {btn ? 
                    <GenericButton onClick={()=>setBtn(!btn)}>저장</GenericButton>
                :
                    <>
                        <GenericButton onClick={()=>setPage('write')}>글쓰기</GenericButton>
                        <GenericButton onClick={()=>setBtn(!btn)}>수정</GenericButton>
                    </>
                }
            </div>
        } */}
    </>
}