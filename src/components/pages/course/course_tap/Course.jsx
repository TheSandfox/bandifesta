import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Course.css";
import "../../../generic/lefttab.css";

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

function Course({ currentSet }) {
  const [position, setPosition] = useState({ x: 55, y: 100 });
  const [walking, setWalking] = useState(false);
  const [data, setData] = useState({});
  const [currentKey, setCurrentKey] = useState("01");
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
        return "아이와 함께 40분 코스";
      case "min60":
        return "가족과 함께 60분 코스";
      case "min90":
        return "연인과 함께 90분 코스";
      default:
        return "";
    }
  };

  return (
    <>
      <div className="course">
        <div>
          <h2>{getCourseTitle()}</h2>
          <GenericButton
        </div>
        <div className="course_gbg_map">
          <img src="/bandifesta/assets/gbg_map02.jpg" alt="" />
        </div>
        <div>
          <img
            src="/bandifesta/assets/people.png"
            alt="people"
            className="path-image"
          />
        </div>
        {points[currentSet].map((point) => (
          <div
            key={point.id}
            className="clickable-point"
            style={{ left: point.x, top: point.y }}
            onClick={() => ClickInfo(point.id, point.x, point.y)}
          >
            {point.id}
          </div>
        ))}
        <div className="info">
          <h3>{data[currentKey]?.name}</h3>
          {data[currentKey]?.image && (
            <img src={data[currentKey]?.image} alt={currentKey} />
          )}
          <p>{data[currentKey]?.text}</p>
        </div>
      </div>
    </>
  );
}

export default Course;
