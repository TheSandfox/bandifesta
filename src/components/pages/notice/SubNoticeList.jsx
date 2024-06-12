import {Routes, Route, Link} from 'react-router-dom';

function noticeList(data){
    return(
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
    )
}

export default noticeList;