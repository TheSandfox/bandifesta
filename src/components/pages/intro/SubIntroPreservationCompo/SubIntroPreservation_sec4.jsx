import "./SubIntroPreservation_sec4.css";
import SubIntroPreservationSubTitle from "./SubIntroPreservationSubTitle";
export default function SubIntroPreservation_sec4({}) {
  return (
    <>
      <SubIntroPreservationSubTitle SubTitle={"할인정보"} />
      <div className="SubIntroPreservation_sec4">
        <div>
          · 국가유공자 본인 한정 50% 할인
          <br />
          · 장애인 50% 할인
          <br />
          &nbsp;&nbsp;(1~3급은 본인 포함 2인, 4급 이하는 본인 한정)
        </div>
      </div>
      <p className="SubIntroPreservation_sec4_bottom_cont">
        * 전화 예매와 할인으로 티켓을 구매하신 체험객은 꼭 해당자가 참여하여야
        합니다. <br />* 참여하지 않으면 현장에서 취소될 수 있습니다.
      </p>
    </>
  );
}
