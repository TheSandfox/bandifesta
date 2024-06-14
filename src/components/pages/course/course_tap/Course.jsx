import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Course.css";
import "../../../generic/lefttab.css";
import GenericButton from "../../../generic/GenericButton";

const points_1440 = {
  min40: [
    { id: "01", x: 210, y: 35 },
    { id: "02", x: 340, y: 35 },
    { id: "03", x: 470, y: 35 },
    { id: "04", x: 600, y: 35 },
    { id: "09", x: 730, y: 35 },
    { id: "08", x: 860, y: 35 },
    { id: "end", x: 990, y: 35 },
  ],
  min60: [
    { id: "01", x: 210, y: 185 },
    { id: "03", x: 340, y: 185 },
    { id: "06", x: 470, y: 185 },
    { id: "05", x: 600, y: 185 },
    { id: "02", x: 730, y: 185 },
    { id: "04", x: 860, y: 185 },
    { id: "09", x: 990, y: 185 },
    { id: "11", x: 990, y: 35 },
    { id: "13", x: 860, y: 35 },
    { id: "end", x: 730, y: 35 },
  ],
  min90: [
    { id: "01", x: 210, y: 185 },
    { id: "03", x: 340, y: 185 },
    { id: "04", x: 470, y: 185 },
    { id: "02", x: 600, y: 185 },
    { id: "07", x: 730, y: 185 },
    { id: "05", x: 860, y: 185 },
    { id: "06", x: 990, y: 185 },
    { id: "10", x: 990, y: 35 },
    { id: "12", x: 860, y: 35 },
    { id: "14", x: 730, y: 35 },
    { id: "end", x: 600, y: 35 },
  ],
};
const points_1439 = {
  min40: [
    { id: "01", x: 98, y: 63 },
    { id: "02", x: 188, y: 63 },
    { id: "03", x: 278, y: 63 },
    { id: "04", x: 368, y: 63 },
    { id: "09", x: 458, y: 63 },
    { id: "08", x: 548, y: 63 },
    { id: "end", x: 638, y: 63 },
  ],
  min60: [
    { id: "01", x: 98, y: 215 },
    { id: "03", x: 188, y: 215 },
    { id: "06", x: 278, y: 215 },
    { id: "05", x: 368, y: 215 },
    { id: "02", x: 458, y: 215 },
    { id: "04", x: 548, y: 215 },
    { id: "09", x: 638, y: 215 },
    { id: "11", x: 638, y: 63 },
    { id: "13", x: 548, y: 63},
    { id: "end", x: 458, y: 63 },
  ],
  min90: [
    { id: "01", x: 210, y: 185 },
    { id: "03", x: 340, y: 185 },
    { id: "04", x: 470, y: 185 },
    { id: "02", x: 600, y: 185 },
    { id: "07", x: 730, y: 185 },
    { id: "05", x: 860, y: 185 },
    { id: "06", x: 990, y: 185 },
    { id: "10", x: 990, y: 35 },
    { id: "12", x: 860, y: 35 },
    { id: "14", x: 730, y: 35 },
    { id: "end", x: 600, y: 35 },
  ],
};
const points_1023 = {
  min40: [
    { id: "01", x: 210, y: 35 },
    { id: "02", x: 340, y: 35 },
    { id: "03", x: 470, y: 35 },
    { id: "04", x: 600, y: 35 },
    { id: "09", x: 730, y: 35 },
    { id: "08", x: 860, y: 35 },
    { id: "end", x: 990, y: 35 },
  ],
  min60: [
    { id: "01", x: 210, y: 185 },
    { id: "03", x: 340, y: 185 },
    { id: "06", x: 470, y: 185 },
    { id: "05", x: 600, y: 185 },
    { id: "02", x: 730, y: 185 },
    { id: "04", x: 860, y: 185 },
    { id: "09", x: 990, y: 185 },
    { id: "11", x: 990, y: 35 },
    { id: "13", x: 860, y: 35 },
    { id: "end", x: 730, y: 35 },
  ],
  min90: [
    { id: "01", x: 210, y: 185 },
    { id: "03", x: 340, y: 185 },
    { id: "04", x: 470, y: 185 },
    { id: "02", x: 600, y: 185 },
    { id: "07", x: 730, y: 185 },
    { id: "05", x: 860, y: 185 },
    { id: "06", x: 990, y: 185 },
    { id: "10", x: 990, y: 35 },
    { id: "12", x: 860, y: 35 },
    { id: "14", x: 730, y: 35 },
    { id: "end", x: 600, y: 35 },
  ],
};

function Course({ currentSet }) {
  const [position, setPosition] = useState({ x: 80, y: 35 });
  const [people_height, setPeople_height] = useState({ x: 15, y: 40 });
  const [data, setData] = useState({});
  const [currentKey, setCurrentKey] = useState("01");
  const [previous, setPrevious] = useState(currentKey);
  const [blackSpot, setBlackSpot] = useState();
  const [points, setPoints] = useState(points_1440);

  useEffect(() => {
    axios.get("/bandifesta/JSON/gbg_info.json").then((response) => {
      setData(response.data);
    });
  }, []);

  useEffect(() => {
    const Resize = () => {
      if (window.innerWidth >= 1440) {
        setPoints(points_1440);
        if (currentSet !== previous) {
          if (currentSet === "min40") {
            setPosition({ x: 80, y: 35 });
            setPeople_height({ x: 15, y: 40 });
          } else {
            setPosition({ x: 80, y: 185 });
            setPeople_height({ x: 15, y: 40 });
          }
          setCurrentKey("");
          setBlackSpot("");
          setPrevious(currentSet);
        }
      } else if (window.innerWidth >= 1024) {
        setPoints(points_1439);
        if (currentSet !== previous) {
          if (currentSet === "min40") {
            setPosition({ x: 12, y: 63 });
            setPeople_height({ x: 12, y: 33 });
          } else {
            setPosition({ x: 12, y: 150 });
            setPeople_height({ x: 12, y: 62 });
          }
          setCurrentKey("");
          setBlackSpot("");
          setPrevious(currentSet);
        }
      } else {
        setPoints(points_1023);
        if (currentSet !== previous) {
          if (currentSet === "min40") {
            setPosition({ x: 12, y: 35 });
          } else {
            setPosition({ x: 12, y: 185 });
          }
          setCurrentKey("");
          setBlackSpot("");
          setPrevious(currentSet);
        }
      }
    };

    Resize();
    window.addEventListener("resize", Resize);
    return () => {
      window.removeEventListener("resize", Resize);
    };
  }, [currentSet, previous]);
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
    height:
      window.innerWidth >= 1440
        ? currentSet === "min40"
          ? "200px"
          : "350px"
        : window.innerWidth <= 1439
        ? currentSet === "min40"
          ? "200px"
          : "350px"
        : window.innerWidth <= 1023
        ? currentSet === "min40"
          ? "200px"
          : "350px"
        : "",
  };
  const tiketLink = () => {
    window.location.href = "https://www.ticketlink.co.kr/product/49248"; // 이동하려는 외부 URL
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
                  left: `calc(${position.x}px - ${people_height.x}px)`,
                  bottom: `calc(${position.y}px + ${people_height.y}px)`,
                  transitionDuration: "1s",
                  zIndex: "999",
                }}
              />
            </div>
            {points[currentSet].map((point, index) => (
              <div
                key={index}
                className={`point_spot_wrap point-${point.id}`}
                style={{ left: `${point.x}px`, bottom: `${point.y}px` }}
                onClick={() => ClickInfo(point.id, point.x, point.y)}
              >
                <div
                  className={`point_spot ${
                    blackSpot === point.id ? "clicked" : ""
                  } point-${point.id}`}
                >
                  <div></div>
                </div>
                <div
                  key={point.id}
                  className={`clickable-point ${
                    blackSpot === point.id ? "clicked" : ""
                  }`}
                >
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
