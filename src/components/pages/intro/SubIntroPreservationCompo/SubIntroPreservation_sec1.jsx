import "./SubIntroPreservation_sec1.css";
import SubIntroPreservationSubTitle from "./SubIntroPreservationSubTitle"
export default function SubIntroPreservation_sec1({}) {
  return (
    <>
      <div className="SubIntroPreservation_sec1_wrap">
        <div className="SubIntroPreservation_sec1_top">
          <div>
            <h3>
              경복궁 별빛야행 하반기 예매권
              <br />
              추첨 방식을 알려드립니다.
            </h3>
          </div>
        </div>
        <div className="SubIntroPreservation_sec1_first">
          <SubIntroPreservationSubTitle SubTitle={"예매권 추첨이란?"}/>
          <div className="SubIntroPreservation_sec1_first_cont">
            <p>
              경복궁 별빛야행 참가 희망자 중 추첨을 통해 공정한 체험 기회를
              드리고자 준비한 예매 방법으로
              <br />
              <b>티켓링크 (www.ticketlink.co.kr)에서 ID당 한 번의 응모 기회</b>
              를 드리며,추첨을 통해
              <br />
              <b>예매권에 선정된 관람객은 희망 날짜와 회차를 선착순으로 예매</b>
              를 할 수 있습니다.
            </p>
          </div>
          <p>* 아래 안내사항을 꼭 확인하고 예매해주세요.</p>
        </div>
        <div className="SubIntroPreservation_sec1_second">
        <SubIntroPreservationSubTitle SubTitle={"예매권 추첨 및 예매 일정"}/>
          <div className="SubIntroPreservation_sec1_second_cont">
           <div className="grid_title">응모 기간</div>
           <div className="grid_cont">· 8/23 (수) 14:00 ~ 8/28 (월)</div>
           <div className="grid_title">당첨자 발표</div>
           <div className="grid_cont">· 8/29 (화) 14:00
                <p>
                  * 당첨자들에게 티켓링크 회원정보에 기입한 핸드폰 번호로 당첨
                  확인 문자가 발송됩니다.
                  <br />
                  * 티켓링크 마이페이지에서 연락처를 최신 정보로 수정해 주세요.
                  <br />* 당첨자는 한국문화재재단 홈페이지를 통해서도 확인
                  가능합니다.
                </p></div>
           <div className="grid_title">당첨자 예매</div>
           <div className="grid_cont">· 8/30 (수) 14:00 ~ 9/4 (월)
                <p>
                  * 최대 1인 2매 가능합니다.
                  <br />* 참가비 60,000원 / 55,000원 (시야제한석)
                </p></div>
           <div className="grid_title">일반(잔여석) 예매</div>
           <div className="grid_cont">· 9/5 (화) 11:00 ~</div>
          </div>
        </div>
      </div>
    </>
  );
}
