import { Loader } from '@googlemaps/js-api-loader';
import { useEffect, useRef, useState } from 'react'

const containerStyle = {
	width:'100%',
	aspectRatio:'16 / 9'
};

export default function GoogleMapComponent({mapX,mapY,title}) {
	const containerRef = useRef(null);
	const [map,setMap] = useState(null);
	//맵 로드
	useEffect(()=>{
		let loader = new Loader({
			apiKey: import.meta.env.VITE_GOOGLE_MAP_KEY
		})

		loader.load().then(() => {
			const newMap = new google.maps.Map(containerRef.current,{
				center: { lng: parseFloat(mapX), lat: parseFloat(mapY) },
				zoom: 12
			});
			setMap(newMap);
		}).catch(()=>{});

		return ()=>{
			setMap(null);
		}
	},[])
	//맵에 마커박기
	useEffect(()=>{
		if (!map) {return;}
		let marker = new google.maps.Marker({
			map: map,
			position: { lng: parseFloat(mapX), lat: parseFloat(mapY) },
			title: title
		});

		return ()=>{
			if (marker) {
				marker.setMap(null); // 맵에서 마커 제거
			}
		}
	},[map])
	return <div ref={containerRef} className='googleMapComponent' style={containerStyle}>

	</div>	
}