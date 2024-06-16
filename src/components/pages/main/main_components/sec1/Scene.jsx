import { useGLTF, Environment, useAnimations } from '@react-three/drei';
import { Canvas, useFrame, useThree, useLoader, extend } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Water } from 'three-stdlib'
import * as THREE from 'three';
import waterNormalsFile from '/src/assets/waternormals.jpeg';
import Loading from '/src/components/generic/Loading';

extend({ Water })

function SceneObject() {
	const three = useThree()
	const gltf = useGLTF('bandifesta_scene.glb');
	const waterNormals = useLoader(THREE.TextureLoader, waterNormalsFile)
	const [scene,camera] = useMemo(() => [gltf.scene.clone(),gltf.cameras[0].clone()], [gltf.scene]);
	const animations = useAnimations(gltf.animations,scene)
	const waterRef = useRef();
	const waterPlane = useMemo(()=>{
		return new THREE.PlaneGeometry(10000, 10000);
	},[])
	const waterConfig = useMemo(()=>{
		return {
			textureWidth: 512,
			textureHeight: 512,
			waterNormals,
			sunDirection: new THREE.Vector3(),
			sunColor: 0x000033,
			waterColor: 0x000033,
			distortionScale: 1.5,
			fog: false,
			format: three.encoding
		}
	},[waterNormals]);

	useEffect(()=>{
		// console.log(three);
		// console.log(gltf);
		// scene.add(camera);
		// console.log(camera);
		// three.camera = camera.clone();
		three.camera.position.copy(camera.position);
		three.camera.rotation.copy(camera.rotation);
		three.camera.fov = camera.fov;
		// three.camera.aspect = camera.aspect;
		// three.camera.aspect = camera.aspect;
		// three.camera.position.copy(camera.position);
		// three.camera.rotation.copy(camera.rotation);
		// camera.updateProjectionMatrix();
		three.camera.updateProjectionMatrix();
		scene.fog = new THREE.Fog('black', 5, 50);
		//애니메이션 초기화
		// console.log(animations.actions);
		animations.actions['boat_float'].play();
		animations.actions['boat_shake'].play();
		animations.actions['kumo_flow1'].play();
		animations.actions['kumo_flow2'].play();
		// dispatchEvent({},'resize');
		return ()=>{

		}
	},[scene,camera])

	useFrame((state,delta)=>{
		waterRef.current.material.uniforms.time.value += delta*0.25;
		// three.camera.updateProjectionMatrix();
	})

	return (
		<>
			<fog/>
			{/* <Environment 
				files={'bandifesta_environment.hdr'} 
				background blur={0.25}
				environmentIntensity={0.33}
				backgroundIntensityIntensity={0.15}
				backgroundRotationotation={[ 0.5, 0, 0, 0.8660254 ]}
			/> */}
			<ambientLight intensity={0.45}/>
			<water ref={waterRef} args={[waterPlane, waterConfig]} rotation-x={-Math.PI / 2} />
			<primitive 
				object={scene} 
			/>
		</>
	);
}

export default function Scene() {
	const canvasRef = useRef();
	const [loading,setLoading] = useState(true);
	useEffect(()=>{
		const timeoutCallback = ()=>{
			// console.log(canvasRef.current);
			canvasRef.current.parentElement.parentElement.classList.add('active');
		}
		const loadingTimeout = ()=>{
			setLoading(false);
		}
		const timer = setTimeout(timeoutCallback,1000);
		const loadingTimer = setTimeout(loadingTimeout,2500);

		return ()=>{
			clearTimeout(timer);
			clearTimeout(loadingTimer);
		}
	},[])
	return <div className='scene'>
		<div className={`loadingBackdrop${!loading?' hidden':''}`}>
		</div>
		<Canvas 
			className='canvas'
			ref={canvasRef}
		>
			<SceneObject />
		</Canvas>
		{
			loading
			?<>
				<Loading/>
			</>
			:<></>
		}
	</div>
}