import "./SubIntroLocation_sec1.css";
import SubIntroPreservationSubTitle from "../SubIntroPreservationCompo/SubIntroPreservationSubTitle"
export default function SubIntroLocation_sec1({}) {
  return (
    <>
      <div className="SubIntroLocation_sec1">
      <SubIntroPreservationSubTitle SubTitle={"오시는 길"} />
        <div className="SubIntroLocation_sec1_first">
          <div>지하철</div>
          <div className="SubIntroLocation_sec1_first_cont">
          · 3호선 (안국역) 1번 출구 도보 13분<br></br>· 5호선 (광화문역) 2번 출구
            도보 약 14분<br></br>· 3호선 (경복궁역) 4번 출구 도보 16분
          </div>
          <div>버스</div>
          <div className="SubIntroLocation_sec1_first_cont">
          · 종로 11번 버스 (법련사) 정류장
          </div>
          <div>주차</div>
          <div className="SubIntroLocation_sec1_first_cont">
          · 경복궁 동편 유료주차장 (주차비 본인부담) 이용가능
          </div>
        </div>
        <SubIntroPreservationSubTitle SubTitle={"문의"} />  
        <div className="SubIntroLocation_sec1_second">
          <div>티켓문의</div>
          <div>· 티켓링크 고객센터<p>1588-7890</p></div>
          <div>행사문의</div>
          <div>· 콜센터<p>1522-2295</p></div>
        </div>
      </div>
    </>
  );
}
