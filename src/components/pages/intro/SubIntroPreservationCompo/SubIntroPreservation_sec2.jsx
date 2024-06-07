import "./SubIntroPreservation_sec2.css";
import SubIntroPreservationSubTitle from "./SubIntroPreservationSubTitle";
export default function SubIntroPreservation_sec2({}) {
  return (
    <>
      <div className="SubIntroPreservation_sec2_wrap">
        <SubIntroPreservationSubTitle SubTitle={"유의사항 (응모 방법)"} />
        <div className="SubIntroPreservation_sec2_first_wrap">
          <div className="flex SubIntroPreservation_sec2_first">
            <ul>
              <li>
                <img src="/bandifesta/assets/info1.png" alt="응모접수" />
              </li>
              <li>
                응모 페이지
                <br />
                접속
              </li>
            </ul>
            <div>
              <img src="/bandifesta/assets/info_arrow.png" alt="인포화살표" />
            </div>
            <ul>
              <li>
                <img src="/bandifesta/assets/info_people.png" alt="응모선택" />
              </li>
              <li>
                응모 선택
                <br />
                (ID당 1회 응모)
              </li>
            </ul>
            <div>
              <img src="/bandifesta/assets/info_arrow.png" alt="인포화살표" />
            </div>
            <ul>
              <li>
                <img src="/bandifesta/assets/info2.png" alt="결제진행" />
              </li>
              <li>
                결제 진행
                <br />
                (0원)
              </li>
            </ul>
            <div>
              <img src="/bandifesta/assets/info_arrow.png" alt="인포화살표" />
            </div>
            <ul>
              <li>
                <img src="/bandifesta/assets/info3.png" alt="응모완료" />
              </li>
              <li>
                응모(예매)
                <br />
                완료
              </li>
            </ul>
          </div>
        </div>
        <p>
          * 0원 결제는 예매 확정이 아닌 예매권 추첨 응모를 의미합니다.
          <br />
          * ID당 1회 응모가 가능하며, 당첨자는 1인 2매까지 예매 가능합니다.
          <br />
          * 응모 진행과정에서 예매 완료는 예매권 추첨 응모 완료를 의미합니다.
          <br />
          * 당첨 발표 후 기한 내 티켓 결제를 완료해야 예약이 확정됩니다.
          <br />* 응모 단계에서는 비용이 발생하지 않습니다.
        </p>
      </div>
    </>
  );
}
