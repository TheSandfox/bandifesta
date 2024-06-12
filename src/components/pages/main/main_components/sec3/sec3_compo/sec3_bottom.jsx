import "./sec3_bottom.css";
import { useNavigate } from "react-router-dom";
import React, { useContext, useMemo } from "react";
import { dataContext } from "../../../../../../App";
function Sec3_bottom() {
  const Navigate = useNavigate();
  const data = useContext(dataContext);
  const latestData = useMemo(() => {
    return [...data]
      .sort((a, b) => new Date(b.createDate) - new Date(a.createDate))
      .slice(0, 4);
  }, [data]);
  const sec3_button_notice = () => {
    Navigate("/notice/main");
  };
  return (
    <>
      <div className="Sec3_bottom">
        <h4>공지사항</h4>
        <button onClick={sec3_button_notice}>더보기 +</button>
        <div>
          <ul className="sec3_bottom_title flex">
            <li className="sec3_bottom_title_title">제목</li>
            <li className="sec3_bottom_title_li">작성자</li>
            <li className="sec3_bottom_title_li">작성일</li>
          </ul>
          {latestData.map((item) => (
            <ul key={item.id} className="sec3_bottom_list flex">
              <li className="sec3_bottom_list_title">{item.title}</li>
              <li className="sec3_bottom_list_li">{item.name}</li>
              <li className="sec3_bottom_list_li">{item.createDate}</li>
            </ul>
          ))}
        </div>
      </div>
    </>
  );
}
export default Sec3_bottom;
