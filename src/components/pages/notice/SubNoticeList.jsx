import {useState} from 'react';
import {Routes, Route, Link} from 'react-router-dom';

<<<<<<< HEAD
function noticeList({currentItems}){
    return(
        <div>
        {currentItems && currentItems.map((data)=>{return(
            <ul key={data.id} className='noticeListM'>
                <li className='notiNumber'>{data.id}</li>
                <li className='notiTitle'>
                    <Link to={`/notice/detail/${data.id}`}>
                        <span className='notiTitTxt'>{data.title}</span>
                        <img className='notiArrow' src="/bandifesta/public/assets/arrowGrey.png" alt="" />
                    </Link>
                </li>
                <li className='notiWriter'>{data.name}</li>
                <li className='notiDate'>{data.createDate}</li>
                <li className='notiView'>400</li>
            </ul> 
        )})}
        </div>
=======
function noticeList(data){

        const [count, setCount] = useState(0);

        const onIncrease = ()=>{
            setCount(prevCount => prevCount +1);
        }

    return(
        <ul key={data.id} className='noticeListM'>
            <li className='notiNumber'>{data.id}</li>
            <li className='notiTitle'>
                <Link to={`/notice/detail/${data.id}`} onClick={onIncrease}>
                    <span className='notiTitTxt'>{data.title}</span>
                    <img className='notiArrow' src="/bandifesta/assets/arrowGrey.png" alt="" />
                </Link>
            </li>
            <li className='notiWriter'>{data.name}</li>
            <li className='notiDate'>{data.createDate}</li>
            <li className='notiView'>{count}</li>
        </ul>
>>>>>>> chaemin2
    )
}

export default noticeList;