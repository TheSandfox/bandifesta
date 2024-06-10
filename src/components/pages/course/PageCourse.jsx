import { useState } from "react";
import Course from "./course_tap/Course";
import { LeftTab, LeftTabContainer, LeftTabTitle } from "../../generic/LeftTab";
export default function PageCourse({}) {
  const [currentSet, setCurrentSet] = useState("min40");

  const handleTabState = (set) => {
    setCurrentSet(set);
  };

  return (
    <>
      <div className="innerbox">
        <div className="mainContent">
          <div className="tabContentDivision">
            <LeftTabContainer>
              <LeftTabTitle>경복궁나들이</LeftTabTitle>
              <LeftTab active={currentSet === 'min40'} onClick={() => handleTabState("min40")}>
                아이와 함께(40분 코스)
              </LeftTab>
              <LeftTab active={currentSet === 'min60'} onClick={() => handleTabState("min60")}>
                가족과 함께(60분 코스)
              </LeftTab>
              <LeftTab active={currentSet === 'min90'} onClick={() => handleTabState("min90")}>
                연인과 함께(90분 코스)
              </LeftTab>
            </LeftTabContainer>
            <Course currentSet={currentSet} />
          </div>
        </div>
      </div>
    </>
  );
}
