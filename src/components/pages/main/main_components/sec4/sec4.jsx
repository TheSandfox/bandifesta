import { useContext, useEffect, useState, useRef } from "react";
import { getFestivals } from "/src/api_utils/festivalUtil";
import { configContext } from "/src/App";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FestivalCard } from "/src/components/generic/festival/FestivalCard";
import "swiper/css";
import "swiper/css/pagination";
import "./sec4.css";
import { Autoplay } from "swiper/modules";

function MainSec4() {
  const config = useContext(configContext);
  const [festivals, setFestivals] = useState([]);
  const [active, setActive] = useState(false);
  const [fontSize, setFontSize] = useState(18)
  const textRef = useRef()
  
  useEffect(() => {
    const changeFontSize = () => {
      if (textRef.current) {
        const { clientWidth } = textRef.current;
        const maxWidth = clientWidth;
        const baseFontSize = 16;
        let newFontSize = baseFontSize;

        while (textRef.current.scrollWidth > maxWidth && newFontSize > 12) {
          newFontSize -= 1;
          textRef.current.style.fontSize = `${newFontSize}px`;
        }

        setFontSize(newFontSize);
      }
    };

    changeFontSize();
    window.addEventListener('resize', changeFontSize);

    return () => {
      window.removeEventListener('resize', changeFontSize);
    };
  }, []);




  useEffect(() => {
    getFestivals(
      {
        itemsPerPage: 10,
        pageNum: 1,
        language: config.language,
        periodType: 1,
        sortMethod: 0,
      },
      (response) => {
        setFestivals(response.data);
      },
      (error) => {
        console.log(error);
      }
    );

    const handleScrollDown = () => {
      const scrollPosition = window.scrollY;
      const triggerPosition = document.documentElement.scrollHeight - window.innerHeight - 500; // 원하는 픽셀 위치 설정
      if (scrollPosition > triggerPosition) {
        setActive(true);
      }else {
        setActive(false);
      }
    };

    window.addEventListener('scroll', handleScrollDown);
    return () => {
      window.removeEventListener('scroll', handleScrollDown);
    };
  }, [config.language]);


  return (
    <>
      <div className="Main_sec4">
        <div>
          <h5>인기있는 행사</h5>
          <p>다양한 축제를 통해 각 지역의 독특한 문화와 전통을 만나보세요!</p>
          <Swiper
            loop={true}
            slidesPerView={6.8}
            spaceBetween={15}
            centeredSlides={true}
            autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="mySwiper sec4Swiper"
          >
            {festivals.map((festival) => (
              <SwiperSlide key={festival.festival_id}>
                <FestivalCard
                  festival={festival}
                  disableTag={true}
                  fontSize={fontSize}
                ></FestivalCard>
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            loop={true}
            slidesPerView={2}
            spaceBetween={10}
            centeredSlides={true}
            autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="mySwiper sec4SwiperMobile"
          >
            {festivals.map((festival) => (
              <SwiperSlide key={festival.festival_id}>
                <FestivalCard
                  festival={festival}
                  disableTag={true}
                  fontSize={fontSize}
                ></FestivalCard>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="Main_sec4_bottom">
          <div className={`Main_sec4_bottom_logoMoon ${active ? "active" : ""}`}>
            <img src="/bandifesta/assets/logo2.png" alt="달님" />
          </div>
        </div>
        
      </div>
    </>
  );
}

export default MainSec4;