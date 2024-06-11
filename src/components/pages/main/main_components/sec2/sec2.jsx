import "./sec2.css";
import React from 'react';
import { useNavigate } from 'react-router-dom';
function MainSec2() {

    const Navigate = useNavigate()

  const sec2ButtonClick = () => {
    Navigate("/intro/main"); 
  };

  return (
    <>
      <section className="sec2 flex">
        <div className="sec2_wrap">
        <div className="sec2_top">
          <h3>
            더 쉽고, 더 빠르게
            <br />
            경복궁 별빛 야행에 대해 알아보세요.
          </h3>
        </div>
        <div className="sec2_button" onClick={sec2ButtonClick}>
          보러가기
        </div>
        </div>
        <div className="sec2_img">
          <img src="/bandifesta/assets/mainImg.png" alt="" />
        </div>
      </section>
    </>
  );
}
export default MainSec2;
