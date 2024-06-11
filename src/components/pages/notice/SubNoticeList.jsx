import {Routes, Route, Link} from 'react-router-dom';

function noticeList(data){
    return(
        <ul key={data.id} className='noticeListM'>
            <li className='notiNumber'>{data.id}</li>
            <li className='notiTitle'><Link to={`/notice/detail/${data.id}`}>{data.title}</Link></li>
            <li className='notiWriter'>{data.name}</li>
            <li className='notiDate'>{data.createDate}</li>
            <li className='notiView'>400</li>
        </ul>
    )
}

export default noticeList;