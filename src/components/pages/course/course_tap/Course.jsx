import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Course.css";
import "../../../generic/lefttab.css";
import GenericButton from "../../../generic/GenericButton";

const points = {
  min40: [
    { id: "01", x: 210, y: 100 },
    { id: "02", x: 340, y: 100 },
    { id: "03", x: 470, y: 100 },
    { id: "04", x: 600, y: 100 },
    { id: "09", x: 730, y: 100 },
    { id: "08", x: 860, y: 100 },
    { id: "end", x: 990, y: 70 },
  ],
  min60: [
    { id: "01", x: 210, y: 100 },
    { id: "03", x: 340, y: 100 },
    { id: "06", x: 470, y: 100 },
    { id: "05", x: 600, y: 100 },
    { id: "02", x: 730, y: 100 },
    { id: "04", x: 860, y: 100 },
    { id: "09", x: 990, y: 100 },
    { id: "11", x: 990, y: 250 },
    { id: "13", x: 860, y: 250 },
    { id: "end", x: 730, y: 220 },
  ],
  min90: [
    { id: "01", x: 210, y: 100 },
    { id: "03", x: 340, y: 100 },
    { id: "04", x: 470, y: 100 },
    { id: "02", x: 600, y: 100 },
    { id: "07", x: 730, y: 100 },
    { id: "05", x: 860, y: 100 },
    { id: "06", x: 990, y: 100 },
    { id: "10", x: 990, y: 250 },
    { id: "12", x: 860, y: 250 },
    { id: "14", x: 730, y: 250 },
    { id: "end", x: 600, y: 220 },
  ],
};

function Course({ currentSet }) {
  const [position, setPosition] = useState({ x: 80, y: 100 });
  const [data, setData] = useState({});
  const [currentKey, setCurrentKey] = useState("01");
  const [previous, setPrevious] = useState(currentKey);
  const [blackSpot, setBlackSpot] = useState();
  useEffect(() => {
    axios.get("/bandifesta/JSON/gbg_info.json").then((response) => {
      setData(response.data);
    });
  }, []);

  useEffect(() => {
    if (currentSet !== previous) {
      setPosition({ x: 80, y: 100 });
      setPrevious(currentSet), [previous, currentSet];
    }
  });

  const ClickInfo = (key, x, y) => {
    setPosition({ x, y });
    setCurrentKey(key);
    setBlackSpot(key);
  };
  const getCourseTitle = () => {
    switch (currentSet) {
      case "min40":
        return "아이와 함께 40분 코스";
      case "min60":
        return "가족과 함께 60분 코스";
      case "min90":
        return "연인과 함께 90분 코스";
      default:
        return "";
    }
  };

  const course_wrap_height = {
    height: currentSet === "min40" ? "200px" : "350px",
  };
  const tiketLink = () => {
    window.location.href = 'https://www.ticketlink.co.kr/product/49248'; // 이동하려는 외부 URL
  };
  return (
    <>
      <div className="course">
        <div className="course_top flex">
          <h2>{getCourseTitle()}</h2>
          <GenericButton onClick={tiketLink}>온라인 예약하기</GenericButton>
        </div>
        <div className="course_wrap" style={course_wrap_height}>
          <div className="course_gbg_spot">
            <div className="course_line_top"></div>
            <div className={`course_line_bottom ${currentSet}`}></div>
            <div>
              <img
                src="/bandifesta/assets/people.png"
                alt="people"
                className="people-image"
                style={{
                  left: `calc(${position.x}px - 15px)`,
                  top: `calc(${position.y}px - 50px)`,
                  transitionDuration: "1s",
                  zIndex: "999",
                }}
              />
            </div>
            {points[currentSet].map((point) => (
              <div
                className={`point_spot_wrap point-${point.id}`}
                style={{ left: `${point.x}px`, top: `${point.y}px` }}
                onClick={() => ClickInfo(point.id, point.x, point.y)}
              >
                <div
                  className={`point_spot ${
                    blackSpot === point.id ? "clicked" : ""
                  } point-${point.id}`}
                >
                  <div></div>
                </div>
                <div key={point.id} className={`clickable-point ${
                    blackSpot === point.id ? "clicked" : ""
                  }`} >
                  {data[point.id]?.name}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="course_info">
          <h3>{data[currentKey]?.name}</h3>
          {data[currentKey]?.image && (
            <img src={data[currentKey]?.image} alt={currentKey} />
          )}
          <p>{data[currentKey]?.text}</p>
        </div>
        <div className="course_gbg_map">
          <img src="/bandifesta/assets/gbg_map02.jpg" alt="" />
        </div>
      </div>
    </>
  );
}

export default Course;
