import {useState} from 'react'

export default function FAQPageList({ currentItems }){
    // 아코디언 기능
    const [click, setClick] = useState(null);
    function scrollEvent(idx){
        setClick((click)=>click === idx ? null : idx)
    }

    // const datas = useContext(dicContext);
    // const [optList, setOptlist] = useState('ALL');
    // const getSortList = ()=>{
    //     const sortItem = (item)=>{
    //         switch(optList){
    //             case 'ALL': return item.group
    //             case 'html': return item.group === 'html'
    //             case 'css': return item.group === 'css'
    //             case 'javascript': return item.group === 'javaScript'
    //             case 'node': return item.group === 'node'
    //             case 'react': return item.group === 'react'
    //             default:
    //                 return null
    //         }
    //     }
    //     const copyList = JSON.parse(JSON.stringify(datas))
    //     const sortingList = optList === 'All' ? copyList : copyList.filter((item)=>sortItem(item))
    //     return sortingList
    // }

    return(
        <ul className="faqLists">
            {currentItems &&
        currentItems.map((data, idx)=>{return(
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
    )
}