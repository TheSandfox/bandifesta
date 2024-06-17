import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from 'react-router-dom';
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import "./sec3_top.css";
import "swiper/css";
function Sec3_top() {
const Navigate = useNavigate()
const sec3_button_festival = ()=>{
  Navigate("/course/min40");
}
  return (
    <>
      <div className="Sec3_top ">
        <h4>관람안내</h4>
        <button onClick={sec3_button_festival}>더보기 +</button>
        <Swiper
          loop={true}
          slidesPerView={4}
          spaceBetween={30}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src="/bandifesta/assets/gbg_01.jpg" alt="경복궁이미지" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/bandifesta/assets/gbg_02.jpg" alt="경복궁이미지" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/bandifesta/assets/gbg_03.jpg" alt="경복궁이미지" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/bandifesta/assets/gbg_04.jpg" alt="경복궁이미지" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/bandifesta/assets/gbg_05.jpg" alt="경복궁이미지" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/bandifesta/assets/gbg_06.jpg" alt="경복궁이미지" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/bandifesta/assets/gbg_07.jpg" alt="경복궁이미지" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/bandifesta/assets/gbg_08.jpg" alt="경복궁이미지" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/bandifesta/assets/gbg_09.jpg" alt="경복궁이미지" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/bandifesta/assets/gbg_10.jpg" alt="경복궁이미지" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/bandifesta/assets/gbg_11.jpg" alt="경복궁이미지" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/bandifesta/assets/gbg_12.jpg" alt="경복궁이미지" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/bandifesta/assets/gbg_13.jpg" alt="경복궁이미지" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/bandifesta/assets/gbg_14.jpg" alt="경복궁이미지" />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
export default Sec3_top;
