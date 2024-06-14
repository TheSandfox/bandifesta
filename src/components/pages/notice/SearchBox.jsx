import { useState, useContext } from "react";
import { editContext } from "../../../App";

export default function SubNoticeSearch(){
    
    const {searchNotice} = useContext(editContext);
    const [search, setSearch] = useState("");

    function searchChange(e){
        setSearch(e.target.value)
    }
    function searchBtn(){
        searchNotice(search)
    }

    return <>
        <div className="noticeSearch">
            <h1 className="fontSubTitle">원하시는 내용을 검색해 보세요.</h1>
            <div className="noticeSearchBar">
                <div className="SearchBox">
                    <input type="text" placeholder="검색어를 입력해 주세요." className="fontMain" value={search} onChange={searchChange}/>
                    <button onClick={searchBtn}><img src="/bandifesta/assets/glass_search.png"/></button>
                </div>
            </div>
        </div>
    </>
}