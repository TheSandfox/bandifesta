import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Course_40min.css';

const point = [
    { id: "01", x: 455, y: 100 },
    { id: "02", x: 575, y: 100 },
    { id: "03", x: 705, y: 100 },
    { id: "04", x: 835, y: 100 }
];

function Course_40min() {
    const [position, setPosition] = useState({ x: 55, y: 100 });
    const [walking, setWalking] = useState(false);
    const [data, setData] = useState({});
    const [currentKey, setCurrentKey] = useState('01');


    useEffect(() => {
        axios.get('/bandifesta/JSON/gbg_info.json').then(response => {
            setData(response.data)
        })
    }, []);

    const ClickInfo = (key, x, y) => {
        setPosition({ x, y });
        setCurrentKey(key);
        setWalking(true);
        setTimeout(() => setWalking(false), 1000)
    };

    return (
        <div className="container">
            <div className="info">
                <p>{data[currentKey]?.text}</p>
                <img src={data[currentKey]?.image} alt={currentKey} />
            </div>
            <img src='/bandifesta/assets/people.png' alt="people" className="path-image" />
            {points.map(point => (
                <div
                    key={point.id}
                    className="clickable-point"
                    style={{ left: point.x, top: point.y }}
                    onClick={() => ClickInfo(point.id, point.x, point.y)}
                >
                    {point.id}
                </div>
            ))}
            <div className="character" style={{ left: position.x, top: position.y }}>
                <img src={walking ? '/path_to/walking.gif' : '/path_to/standing.png'} alt="Character" />
            </div>
        </div>
    );
}

export default Course_40min;