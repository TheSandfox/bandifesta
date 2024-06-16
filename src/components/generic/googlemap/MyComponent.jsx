import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
    width:'100%',
    height: '480px',
    marginTop: '70px',
    boxShadow: '2px 2px 2px 0 rgba(0,0,0,.25)'
  };
  
  const center = {
    lat: 37.5796722,
    lng: 126.9793945
  };
  function MyComponent() {
    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_KEY
    })
  
    const [map, setMap] = React.useState(null)
  
    const onLoad = React.useCallback(function callback(map) {
      // This is just an example of getting and using the map instance!!! don't just blindly copy!
      map.setCenter(center);
      map.setZoom(16); // 수동으로 줌 레벨 설정
      setMap(map);
    }, [])
  
    const onUnmount = React.useCallback(function callback(map) {
      setMap(null)
    }, [])
  
    return isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={16}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <Marker 
                position={center} 
                icon={{
                    url: '/bandifesta/assets/night_star_marker.png',  // 커스텀 아이콘 URL
                    scaledSize: new window.google.maps.Size(100, 110),  // 아이콘 크기 조정
                }} 
            />
          { /* Child components, such as markers, info windows, etc. */ }
          <></>
        </GoogleMap>
    ) : <></>
  }
  
  export default React.memo(MyComponent)