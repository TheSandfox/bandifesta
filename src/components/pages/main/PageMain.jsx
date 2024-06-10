import Scene from "./main_components/sec1/Scene";
import './main_components/sec1/scene.css';
import MainSec2 from "./main_components/sec2/sec2"
import MainSec3 from "./main_components/sec3/sec3"
import MainSec4 from "./main_components/sec4/sec4"
import Main_data from './main_components/sec3/Main_data'
export default function PageMain({ }) {
	return <>
		{/* <Scene/> */}
		<MainSec2 />
		<MainSec3 />
		<MainSec4 />
		<Main_data/>
	</>
}