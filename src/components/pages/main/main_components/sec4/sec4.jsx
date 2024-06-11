import { useContext, useEffect, useState } from "react";
import { getFestivals } from "/src/api_utils/festivalUtil";
import { configContext } from "/src/App";
import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import {FestivalCard} from '/src/components/generic/festival/FestivalCard'
import 'swiper/css';
import 'swiper/css/pagination';
import "./sec4.css";
import { Autoplay} from 'swiper/modules';
function MainSec4() {
  const config = useContext(configContext);
  const [festivals, setFestivals] = useState([]);
  useEffect(() => {
    getFestivals(
      {
        itemsPerPage: 10,
        pageNum: 1,
        language: config.language,
        periodType: 1,
        sortMethod: 1,
      },
      (response) => {
        console.log(response);
        setFestivals(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);
  console.log(festivals);

  return (
    <>
     <Swiper
        loop={true}
        slidesPerView={3}
        spaceBetween={30}
        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        className="mySwiper"
      >
        {festivals.map((festival)=>(
        <SwiperSlide key={festival.festival_id}> 
        <FestivalCard festival={festival}></FestivalCard></SwiperSlide>
      ))}
      </Swiper>
    </>
  );
}
export default MainSec4;
