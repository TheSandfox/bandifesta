import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { LeftTab, LeftTabContainer, LeftTabTitle } from "../../../generic/LeftTab";
import "./Course.css";
import "../../../generic/lefttab.css";
import CourseInfo from "./CourseInfo";

const points = {
  min40: [
    { id: "01", x: 185, y: 100 },
    { id: "02", x: 315, y: 100 },
    { id: "03", x: 445, y: 100 },
    { id: "04", x: 575, y: 100 },
    { id: "09", x: 705, y: 100 },
    { id: "08", x: 835, y: 100 },
  ],
  min60: [
    { id: "01", x: 185, y: 100 },
    { id: "03", x: 315, y: 100 },
    { id: "06", x: 445, y: 100 },
    { id: "05", x: 575, y: 100 },
    { id: "02", x: 705, y: 100 },
    { id: "04", x: 835, y: 100 },
    { id: "09", x: 835, y: 200 },
    { id: "11", x: 705, y: 200 },
    { id: "13", x: 575, y: 200 },
  ],
  min90: [
    { id: "01", x: 185, y: 100 },
    { id: "03", x: 315, y: 100 },
    { id: "04", x: 445, y: 100 },
    { id: "02", x: 575, y: 100 },
    { id: "07", x: 705, y: 100 },
    { id: "05", x: 835, y: 100 },
    { id: "06", x: 835, y: 200 },
    { id: "10", x: 705, y: 200 },
    { id: "12", x: 575, y: 200 },
    { id: "14", x: 835, y: 200 },
  ],
};

function Course() {
  const { tabName } = useParams();
  const [tabState, setTabState] = useState(0);
  const [position, setPosition] = useState({ x: 55, y: 100 });
  const [walking, setWalking] = useState(false);
  const [data, setData] = useState({});
  const [currentKey, setCurrentKey] = useState("01");
  const [currentSet, setCurrentSet] = useState("min40");

  useEffect(() => {
    axios.get("/bandifesta/JSON/gbg_info.json").then((response) => {
      setData(response.data);
    });
  }, []);

  const ClickInfo = (key, x, y) => {
    setPosition({ x, y });
    setCurrentKey(key);
    setWalking(true);
    setTimeout(() => setWalking(false), 1000);
  };

  const getCourseTitle = () => {
    switch (currentSet) {
      case "min40":
        return "40분 코스";
      case "min60":
        return "60분 코스";
      case "min90":
        return "90분 코스";
      default:
        return "";
    }
  };

  const handleTabState = (index) => {
    setTabState(index);
  };

  return (
    <>
      <div className="tabContentDivision">
        <LeftTabContainer>
          <LeftTabTitle>경복궁나들이</LeftTabTitle>
          <LeftTab to={"/intro/main"} active={tabState === 0} onClick={() => handleTabState(0)}>
            행사 소개
          </LeftTab>
          <LeftTab to={"/intro/preservation"} active={tabState === 1} onClick={() => handleTabState(1)}>
            예매 안내
          </LeftTab>
          <LeftTab to={"/intro/location"} active={tabState === 2} onClick={() => handleTabState(2)}>
            오시는 길
          </LeftTab>
        </LeftTabContainer>
        <CourseInfo
          getCourseTitle={getCourseTitle}
          points={points}
          currentSet={currentSet}
          ClickInfo={ClickInfo}
          data={data}
          currentKey={currentKey}
        />
      </div>
    </>
  );
}

export default Course;