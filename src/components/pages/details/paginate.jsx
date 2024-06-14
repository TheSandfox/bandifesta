import ReactPaginate from 'react-paginate';

export default function Paginate({pageCount, handlePageClick}){
    return <>
        <ReactPaginate
            nextLabel={<img src="/bandifesta/assets/nextPage.png"/>}
            previousLabel={<img src="/bandifesta/assets/prevPage.png"/>}
            nextLinkClassName="subNoticePageNext"
            previousLinkClassName="subNoticePagePrev"

            activeClassName="subNoticePageActive"
            pageClassName="subNoticePage fontMain"
            containerClassName="subNoticeNavi"

            pageRangeDisplayed={3}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            onClick={false}
            
            renderOnZeroPageCount={null}
        />
    </>
}