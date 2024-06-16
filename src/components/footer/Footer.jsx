import { useEffect, useState } from "react";
import "./footer.css";

export default function Footer({}) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const handleScrollDown = () => {
      const scrollPosition = window.scrollY;
      const triggerPosition = document.documentElement.scrollHeight - window.innerHeight - 600; 
      if (scrollPosition > triggerPosition) {
        setActive(true);
      } else {
        setActive(false);
      }
    };
    window.addEventListener("scroll", handleScrollDown);
    return () => {
      window.removeEventListener("scroll", handleScrollDown);
    };
  }, []);

  return (
    <>
      <div className="footer">
        <div className="footer_top">
          <img className={`footer_top_image ${active ? "active" : ""}`} src="/bandifesta/assets/fot_bg.png" alt="푸터사람들" />
          <img className={`footer_top_image_mobile ${active ? "active" : ""}`} src="/bandifesta/assets/fot_bg1.png" alt="푸터사람들" />
        </div>
        <div className="footer_bottom">
          <div className="flex footer_wrap">
            <div className="footer_logo">
              <img src="/bandifesta/assets/logoGrey.png" alt="회색로고" />
            </div>
            <div className="footer_info_wrap">
              <ul className="footer_info_01">
                <li>개인정보 처리방침</li>
                <li>이용약관</li>
                <li>저작권정책</li>
                <li>이용약관</li>
              </ul>
              <ul className="footer_info_02">
                <li>(01693) 서울 노원구 상계로3길 21 3층, 6층</li>
                <li>Tel. 02-6953-2002</li>
                <li>Fax. 02-6953-2002</li>
              </ul>
              <ul className="footer_info_03">
                <li>(주)TOTb</li>
                <li>대표이사: 우대희</li>
                <li>사업자등록번호 : 105-85-29522</li>
                <li>통신판매신고 : 제 2019-서울노원-1028호</li>
              </ul>
              <ul className="footer_APILOGO">
                <li>
                  <img src="/bandifesta/assets/fotLogo3.png" alt="" />
                </li>
                <li>
                  <img src="/bandifesta/assets/fotLogo2.png" alt="" />
                </li>
                <li>
                  <img src="/bandifesta/assets/fotLogo1.png" alt="" />
                </li>
                <li>
                  <img src="/bandifesta/assets/fotLogo4.png" alt="" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
