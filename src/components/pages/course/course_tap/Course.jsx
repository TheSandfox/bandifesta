import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Course.css";
import "../../../generic/lefttab.css";


const points_1440 = {
  min40: [
    { id: "01", x: '210px', y: '35px' },
    { id: "02", x: '340px', y: '35px' },
    { id: "03", x: '470px', y: '35px' },
    { id: "04", x: '600px', y: '35px' },
    { id: "09", x: '730px', y: '35px' },
    { id: "08", x: '860px', y: '35px' },
    { id: "end", x: '990px', y: '35px' },
  ],
  min60: [
    { id: "01", x: '210px', y: '185px' },
    { id: "03", x: '340px', y: '185px' },
    { id: "06", x: '470px', y: '185px' },
    { id: "05", x: '600px', y: '185px' },
    { id: "02", x: '730px', y: '185px' },
    { id: "04", x: '860px', y: '185px' },
    { id: "09", x: '990px', y: '185px' },
    { id: "11", x: '990px', y: '35px' },
    { id: "13", x: '860px', y: '35px' },
    { id: "end", x: '730px', y: '35px' },
  ],
  min90: [
    { id: "01", x: '210px', y: '185px' },
    { id: "03", x: '340px', y: '185px' },
    { id: "04", x: '470px', y: '185px' },
    { id: "02", x: '600px', y: '185px' },
    { id: "07", x: '730px', y: '185px' },
    { id: "05", x: '860px', y: '185px' },
    { id: "06", x: '990px', y: '185px' },
    { id: "10", x: '990px', y: '35px' },
    { id: "12", x: '860px', y: '35px' },
    { id: "14", x: '730px', y: '35px' },
    { id: "end", x: '600px', y: '35px' },
  ],
};
const points_1439 = {
  min40: [
    { id: "01", x: '98px', y: '63px' },
    { id: "02", x: '188px', y: '63px' },
    { id: "03", x: '278px', y: '63px' },
    { id: "04", x: '368px', y: '63px' },
    { id: "09", x: '458px', y: '63px' },
    { id: "08", x: '548px', y: '63px' },
    { id: "end", x: '638px', y: '63px' },
  ],
  min60: [
    { id: "01", x: '98px', y: '213px' },
    { id: "03", x: '188px', y: '213px' },
    { id: "06", x: '278px', y: '213px' },
    { id: "05", x: '368px', y: '213px' },
    { id: "02", x: '458px', y: '213px' },
    { id: "04", x: '548px', y: '213px' },
    { id: "09", x: '638px', y: '213px' },
    { id: "11", x: '638px', y: '63px' },
    { id: "13", x: '548px', y: '63px' },
    { id: "end", x: '458px', y: '63px' },
  ],
  min90: [
    { id: "01", x: '98px', y: '213px' },
    { id: "03", x: '188px', y: '213px' },
    { id: "04", x: '278px', y: '213px' },
    { id: "02", x: '368px', y: '213px' },
    { id: "07", x: '458px', y: '213px' },
    { id: "05", x: '548px', y: '213px' },
    { id: "06", x: '638px', y: '213px' },
    { id: "10", x: '638px', y: '63px' },
    { id: "12", x: '548px', y: '63px' },
    { id: "14", x: '458px', y: '63px' },
    { id: "end", x: '368px', y: '63px' },
  ],
};
const points_1023 = {
  min40: [
    { id: "01", x: ' 28', y: '5' },
    { id: "02", x: '106', y: '5' },
    { id: "03", x: '184', y: '5' },
    { id: "04", x: '262', y: '5' },
    { id: "end", x:'106', y: '120' },
    { id: "08", x: '184', y: '120' },
    { id: "09", x: '262', y: '120' },
  ],
  min60: [
    { id: "01", x: ' 28', y: '5' },
    { id: "03", x: '106', y: '5' },
    { id: "06", x: '184', y: '5' },
    { id: "05", x: '262', y: '5' },
    { id: "11", x: ' 28', y: '120' },
    { id: "09", x: '106', y: '120' },
    { id: "04", x: '184', y: '120' },
    { id: "02", x: '262', y: '120' },
    { id: "13", x: "28", y: '235' },
    { id: "end", x: '106', y: '235' },
  ],
  min90: [
    { id: "01", x: ' 28', y: '5' },
    { id: "03", x: '106', y: '5' },
    { id: "04", x: '184', y: '5' },
    { id: "02", x: '262', y: '5'},
    { id: "07", x: ' 28', y: '120' },
    { id: "05", x: '106', y: '120' },
    { id: "06", x: '184', y: '120' },
    { id: "10", x: '262', y: '120' },
    { id: "12", x: '28', y: '235' },
    { id: "14", x: '106', y: '235' },
    { id: "end", x: '184', y: '235' },
  ],
};

function Course({ currentSet }) {
  const [position, setPosition] = useState({});
  const [people_height, setPeople_height] = useState({});
  const [data, setData] = useState({});
  const [currentKey, setCurrentKey] = useState("01");
  const [previous, setPrevious] = useState(currentKey);
  const [blackSpot, setBlackSpot] = useState();
  const [points, setPoints] = useState(points_1440);
  const [course_wrap_height, setCourse_wrap_height] = useState()
  useEffect(() => {
    axios.get("/bandifesta/JSON/gbg_info.json").then((response) => {
      setData(response.data);
    });
  }, []);

  useEffect(() => {
    const Resize = () => {
      if (window.innerWidth >= 1440) {
        setPoints(points_1440)
        if (currentSet === "min40") {
          setPosition({ x: '80px', y: '35px' });
          setPeople_height({ x: '15px', y: '40px' });
          setCourse_wrap_height("200px")
          setCurrentKey("");
          setBlackSpot("");
        } else {
          setPosition({ x: '80px', y: '185px' });
          setPeople_height({ x: '15px', y: '40px' });
          setCourse_wrap_height("350px")
          setCurrentKey("");
          setBlackSpot("");
        }
      } else if (window.innerWidth >= 1024) {
        setPoints(points_1439)
        if (currentSet === "min40") {
          setPosition({ x: '8px', y: '63px' });
          setPeople_height({ x: '12px', y: '33px' });
          setCourse_wrap_height("200px")
          setCurrentKey("");
          setBlackSpot("");
        } else {
          setPosition({ x: '8px', y: '215px' });
          setPeople_height({ x: '12px', y: '33px' });
          setCourse_wrap_height("350px")
          setCurrentKey("");
          setBlackSpot("");
        }
      } else {
        setPoints(points_1023)
          setPosition({ x: -30, y: 5 });
          setCourse_wrap_height("auto")
          setCurrentKey("");
          setBlackSpot("");
      }
    };

    Resize();
    window.addEventListener("resize", Resize);
    return () => {
      window.removeEventListener("resize", Resize);
    };
  }, [currentSet]);

  useEffect(() => {

    if (currentSet !== previous) {
      if (window.innerWidth >= 1440) {
        if (currentSet === "min40") {
          setPosition({ x: '80px', y: '35px' });
          setPeople_height({ x: '15px', y: '40px' });
          setCourse_wrap_height("200px");
          setCurrentKey("");
          setBlackSpot("");
        } else {
          setPosition({ x: '80px', y: '185px' });
          setPeople_height({ x: '15px', y: '40px' });
          setCourse_wrap_height("350px");
          setCurrentKey("");
          setBlackSpot("");
        }
        setPrevious(currentSet);
      } else if (window.innerWidth >= 1024) {
        if (currentSet === "min40") {
          setPosition({ x: '8px', y: '63px' });
          setPeople_height({ x: '12px', y: '33px' });
          setCourse_wrap_height("200px");
          setCurrentKey("");
          setBlackSpot("");
        } else {
          setPosition({ x: '8px', y: '215px' });
          setPeople_height({ x: '12px', y: '33px' });
          setCourse_wrap_height("350px");
          setCurrentKey("");
          setBlackSpot("");
        }
        setPrevious(currentSet);
      } else {
          setPosition({ x: -30, y: 5 });
          setCourse_wrap_height("auto")
          setCurrentKey("");
          setBlackSpot("");
      }
        setPrevious(currentSet);
      }
    }
  

    , [currentSet, previous]);

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
  return (
    <>
      <div className="course">
        <div className="course_top flex">
          <h2 className="fontTitle">{getCourseTitle()}</h2>
        </div>
        <div className="course_wrap" style={{ height: `${course_wrap_height}`}}>
          <div className="course_gbg_spot"
          style={(window.innerWidth < 1024) ?
           ( (currentSet === "min40")?
            {justifyContent : 'end'} : 
            {justifyContent : 'start'})
          :{justifyContent : ""}}
          >
            <div className="course_line_top"></div>
            <div className={`course_line_bottom ${currentSet}`}></div>
            <div>
              <img
                src="/bandifesta/assets/people.png"
                alt="people"
                className="people-image"
                style={(window.innerWidth >= 1024) ?
                  { left: `calc(${position.x} - ${people_height.x})`,
                  bottom: `calc(${position.y} + ${people_height.y})`,
                  transitionDuration: "1s",
                  zIndex: "999" } : 
                  { left: `calc(100vw * (${position.x} / 400)`,
                  top : `calc(100vw * (${position.y} / 400)`,
                  transitionDuration: "1s",
                  zIndex: "999" }}
                
              />
            </div>
            {points[currentSet].map((point, index) => (
              <div
                key={index}
                className={`point_spot_wrap ${currentSet} point-${point.id}`}
                style={(window.innerWidth >= 1024) ?
                  { left: `${point.x}`, bottom: `${point.y}` } : { left: `auto`, bottom: `auto` }}
                onClick={() => ClickInfo(point.id, point.x, point.y)}
              >
              <div
                  className={`point_spot ${blackSpot === point.id ? "clicked" : ""
                    } point-${point.id}`}
                >
                  <div></div>
                </div>
                <div
                  key={point.id}
                  className={`clickable-point ${blackSpot === point.id ? "clicked" : ""
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
