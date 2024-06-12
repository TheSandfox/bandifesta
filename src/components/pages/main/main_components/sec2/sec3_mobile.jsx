import "./sec3_mobile.css";
import { useNavigate } from "react-router-dom";
function MainSec3_mobile() {

    const sec3_button_notice = () => {
        Navigate("/notice/main");
      };
    const Navigate = useNavigate()
    const sec3_button_course = ()=>{
    Navigate("/course");
}
  return (
    <>
      <section className="MainSec3_mobile flex">
        <p>
          자세한 관람안내와 공지사항을<br /> 확인하시려면
          
          해당 버튼을 눌러 주세요.
        </p>
        <button onClick={sec3_button_course} className="flex MainSec3_mobile_button_top">
          <div>
            <h5>관람안내</h5>
            <p>체험 코스를 확인해보세요</p>
          </div>
          <div>
            <img src="/bandifesta/assets/btn4001.png" alt="체험코스" />
          </div>
        </button>
        <button onClick={sec3_button_notice} className="flex MainSec3_mobile_button_bottom">
          <div>
            <h5>공지사항</h5>
            <p>공지 사항을 확인해보세요</p>
          </div>
          <div>
            <img src="/bandifesta/assets/btn4002.png" alt="공지사항" />
          </div>
        </button>
      </section>
    </>
  );
}
export default MainSec3_mobile;
