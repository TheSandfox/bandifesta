import "./SubIntroPreservationSubTitle.css";
export default function SubIntroPreservation_sec1({SubTitle}) {
  return (
    <>
      <div className="flex SubIntroPreservationSubTitle">
        <div className="flex">
          <img src="/bandifesta/assets/highlight1.png" alt="별모양" />
        </div>
        <h5>{SubTitle}</h5>
      </div>
    </>
  );
}
