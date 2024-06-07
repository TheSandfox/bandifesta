import "./SubIntroPreservation_sec3.css";
import SubIntroPreservationSubTitle from "./SubIntroPreservationSubTitle"
export default function SubIntroPreservation_sec3({}) {
  return (<>
        <SubIntroPreservationSubTitle SubTitle={"전화 예매"}/>
        <div className="SubIntroPreservation_sec3">
            <div className="grid_title">예매 기간</div>
            <div className="grid_cont">8/23 (수) 14:00 ~</div>
            <div className="grid_title">예매 대상</div>
            <div className="grid_cont">만 65세 이상, 국가유공자, 장애인<br />
            <p>* 1인당 2매 가능</p></div>
            <div className="grid_title">예매 방법</div>
            <div className="grid_cont">· 티켓링크 고객센터 ☎1588-7890<br />
            · 평일 9:00 ~ 18:00 / 토·일·공휴일 휴무<br />
            · 1인 최대 2매까지 예매 가능</div>
        </div>
  </>

  )};